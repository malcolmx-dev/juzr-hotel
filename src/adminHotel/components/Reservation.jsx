import { Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import useFetch from "../../clients/features/get";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap"
import { FaCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";


import { useContext, useEffect, useState, } from "react";
import { AuthContest } from "../../clients/utils/AuthContext";

export default function Reservation(){
  const [list, updateList]= useState([])
  const hotelParams= useParams()
  const hotelId= hotelParams.hotelId
  const [openValue, setOpenValue] = useState(false)
  const [dataRoom, setDataRoom]= useState()
  const navigate= useNavigate()
  const [fillRoom, setFillRoom]= useState()

  const {user}= useContext(AuthContest)


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(dataRoom)
      // Send Axios request here
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [dataRoom])

  const {data, loading, error, refreshData}= useFetch(`http://localhost:10000/api/hotels/rooms/${hotelId}`)

  const [date, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const getDateInRange = (start, end) => {
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0)
    start.setMilliseconds(0)
    const date= new Date(start.getTime())
    const list=[]

    while(date <= end){
        list.push(new Date(date).getTime())
        date.setDate(date.getDate()+1)
    }

    return list
}

const allDates= getDateInRange(date[0].startDate, date[0].endDate)

  const isAvailable= (roomNumber) => {
        const isFound=roomNumber.unavailableDates.some((element, index)=>
        
        element[0].some((date) => 
            allDates.includes(new Date(date).getTime())  
            
        )
    )
        return !isFound
    }
  
  const array = []
  const color= ["green", "blue", "purple"]
  useEffect(() => {
        data?.map((room, i) => 
          room.roomNumbers.map((roomNumbers) =>
            roomNumbers.unavailableDates.map((date)=>{
              array.push({start: date[0][0], end:date[0][date[0].length-1], title: `Chambre ${roomNumbers.number} Occupé · ${date[1]} `, color:color[i], id: room._id, cssClass:'d-flex align-items-center justify-content-center fw-bold py-3 m-1'})            
          },
          updateList(array)
        )))
  }, [loading])

  const handleClick = async(roomId) => {
    setFillRoom([allDates, user.username])
    if(fillRoom){
        try{
            const res= await axios({
                method: 'put',
                url: `http://localhost:10000/api/rooms/availability/${roomId}`,
                data:{
                    dates:fillRoom
                }
            })
                    setOpenValue(false)
                    refreshData()
            return res.data
        }catch(err){
            console.log(error)
        }
    }

}
const deleteRoomStatus= async(roomId, dates) => {
    try{
        const res= await axios({
                    method: 'delete',
                    withCredentials:true,
                    url: `http://localhost:10000/api/rooms/availability/delete/${roomId}`,
                    data:{
                        dates:dates
                    }
                  })
        refreshData()
        return res.data
    }catch(err){
        console.log(error)
    }
    

}
const handleSearch= async(roomId) => {
  const title = document.getElementById("name").value
  console.log(title)
  const desc = document.getElementById("desc").value
  const maxPeople = document.getElementById("maxPeople").value
  
  

  

  const res= await axios({
      method: 'put',
      url: `http://localhost:10000/api/rooms/${roomId}`,
      headers:{'Content-Type': 'application/json'}, 
      data: {
              title: title,
              desc: desc, 
              maxPeople: maxPeople
      }
    })
  
  refreshData()

  
          
}
const handleDelete= async(roomId) => {

  
    await fetch(`http://localhost:10000/api/rooms/${roomId}/${hotelId}`,{
      method:'DELETE',
      credentials:'include',
      headers:{'Content-Type':'application/json'},
      
        }).then(response => {
          if(response.status===401){
              alert("Vous n'êtes pas autorisé! Reconnectez-vous")
              navigate("/admin")
          }}).catch(error => console.log(error))
          
  
  refreshData()

  
          
}

  const handleRoom = async(roomId) => {
    const res = await fetch(`http://localhost:10000/api/rooms/${roomId}`).then((res) => res.json())
    setOpenValue(true)
    setDataRoom(res)
  }
  
  

  return(
    !list[0] ? <div class="spinner-border bg-secondary align-middle text-primary" role="status"> </div> :
      <div className="border">
        <Eventcalendar 
          data={list.map((element)=> element)}
          width='1200px'
          height='1200px'
          theme="material"
          themeVariant="light"
          onEventClick={(element) => handleRoom(element.event.id)}
          
        />
        {openValue && 
        <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" onClick={() => setOpenValue(false)} style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
        <Container  className="bg-white d-none d-md-block w-50 h-75 p-2 rounded overflow-auto ">
            <button className="position-fixed start-75 btn-close" type="button" aria-label="Close"></button>
            <span className="fs-5 fw-bold text-primary m-2">Modifier la chambre</span>
            <div className="d-flex flex-column mx-3 mt-3">
                
                    <div className="d-flex justify-content-between mx-5 mt-2 pb-7 border-bottom">
                        <div className="w-100 d-flex flex-column align-items-center ">
                            <div className="d-flex w-100">
                                <p className="m-0 w-25 fs-5 me-2 fw-bold">Nom de la chambre:</p>
                                <input className="m-0 fs-5 w-75 text-center rounded-3 mb-4 fw-bold" id="name" defaultValue={dataRoom.title}/>
                            </div>

                            <div className="d-flex w-100">
                                <p className="m-0 w-25 fs-5 me-2 fw-bold">Description :</p>
                                <input className="m-0 fs-5 w-75 text-center rounded-3 mb-4 " id="desc" defaultValue={dataRoom.desc}/>
                            </div>

                            <div className="d-flex w-100">
                                <p className="m-0 w-25 fs-5 me-2 fw-bold">Personnes max:</p>
                                <input className="m-0 fs-5 w-75 text-center rounded-3 mb-3 fw-bold" id="maxPeople" defaultValue={dataRoom.maxPeople} />                                    
                            </div>
                            <div className="d-flex flex-column mt-5">
                            {dataRoom.roomNumbers.map((roomNumber)=>
                            
                                
                            isAvailable(roomNumber) ?
                            <div className="rounded p-3 px-5 mb-4 d-flex flex-column justify-content-between align-items-center bg-primary bg-opacity-25 w-75  ms-5 mt-1">
                             <Dropdown >
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex justify-content-center bg-white border border-warning border-3 w-100 py-2 px-2'>
                                    <p className='m-0 ' ><FaCalendarAlt className='me-1 mb-1  '  /> {`${format(date[0].startDate, "dd/MM/yyyy")} à ${format(date[0].endDate, "dd/MM/yyyy")}`}</p>
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    
                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDates([item.selection])}
                                            moveRangeOnFirstSelection={true}
                                            ranges={date}
                                            
                                            
                                        />
                                </Dropdown.Menu>
                            </Dropdown>
                            <p className="fw-bold fs-3 text-center text-black mt-2 mb-3 text-white">{roomNumber.number}</p> 
                             
                            <Button className=' bg-primary text-center text-white w-75  m-2 ' onClick={()=> handleClick(roomNumber._id)}  >Réservez!</Button>
                            { roomNumber.unavailableDates.map((element)=>
                            <div className=" d-flex flex-column text-center mb-4 px-3 m-0 border border-white bg-white mt-5 border-4">
                              <p>Réservée du <span className="fw-bold">{format(element[0][0], 'dd/MM/yyyy')}</span> au <span className="fw-bold">{format(element[0][element[0].length-1], 'dd/MM/yyyy')}</span> par <span className="fw-bold">{element[1]}</span></p>
                              {new Date().getTime()>element[0][element[0].length-1] && <Button className="rounded bg-danger text-white fw-bold mt-2" onClick={()=>deleteRoomStatus(roomNumber._id, element)} >Supprimer</Button>}
                            </div>
                            )}
                        </div>:
                        <div className="rounded p-3 d-flex flex-column justify-content-between align-items-center bg-danger bg-opacity-25 w-75  ms-5 mt-1">
                             
                             <Dropdown >
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex justify-content-center bg-white border border-warning border-3 w-100 py-2 px-2'>
                                    <p className='m-0 ' ><FaCalendarAlt className='me-1 mb-1  '  /> {`${format(date[0].startDate, "dd/MM/yyyy")} à ${format(date[0].endDate, "dd/MM/yyyy")}`}</p>
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    
                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDates([item.selection])}
                                            moveRangeOnFirstSelection={true}
                                            ranges={date}
                                            
                                            
                                        />
                                </Dropdown.Menu>
                            </Dropdown>
                            <p className="fw-bold fs-3 text-center text-black mt-2 mb-3 text-white">{roomNumber.number}</p> 
                             
                            <Button className=' bg-primary text-center text-white w-75 mb-5 m-2 ' onClick={()=> handleClick(roomNumber._id)}  >Réservez!</Button>
                           { roomNumber.unavailableDates.map((element)=>
                            <div className="d-flex flex-column text-center mb-4 px-3 m-0 border border-white bg-white border-4">
                              <p>Réservée du <span className="fw-bold">{format(element[0][0], 'dd/MM/yyyy')}</span> au <span className="fw-bold">{format(element[0][element[0].length-1], 'dd/MM/yyyy')} </span> par <span className="fw-bold">{element[1]}</span></p> 
                              {new Date().getTime()>element[0][element[0].length-1] && <Button className="rounded bg-danger text-white fw-bold mt-2" onClick={()=>deleteRoomStatus(roomNumber._id, element)} >Supprimer</Button>}
                            </div>
                            )}
                             
                            
                        </div>
                                    
                                    )}
                                </div>

                        </div>
                            
                            
                        </div>
                
            </div>
            <div className="d-flex justify-content-between w-100">
                <Button className="bg-danger text-white fw-bold me-1 w-50 mt-5" onClick={() => setOpenValue(false)}>Annuler</Button>
                <Button className="bg-primary text-white fw-bold w-50 ms-1 mt-5" onClick={() => handleSearch(dataRoom._id)}>Valider</Button>
            </div>
            <div className="d-flex justify-content-center w-100 border">
            <Button className="bg-warning text-white fw-bold w-50  mt-5" onClick={() => handleDelete(dataRoom._id)}>Supprimer cette chambre</Button>
            </div>
        </Container>
        </div> }

      </div>
  )
}
