import { useParams } from "react-router-dom"
import useFetch from "../../clients/features/get"
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap"
import { MdBedroomParent } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";




export default function Rooms(){
    const hotelParams= useParams()
    const hotelId= hotelParams.hotelId
    const [openChangeValue, setOpenChangevalue] = useState(false)
    const [openCreateRoom, setOpenCreateRoom] = useState(false)
    const [dupliacte, setDuplicate] = useState(false)
    const [dupliacte2, setDuplicate2] = useState(false)
    const [searchTerm, setSearchTerm] = useState([])
       
        const updateSearch = (e, index) => {
            let newState = [...searchTerm];
            newState[index] = {number: e.target.value};
            setSearchTerm(newState)
        }
    

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm)
      // Send Axios request here
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

    const [index, setIndex] = useState("")
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
    
    const handleClick = async(roomId) => {
        try{
            const res= await axios.put(`https://juzr-hotel-backend.onrender.com/api/rooms/availability/${roomId}`,{

                    dates:allDates
                        
                    })
            return res.data
        }catch(err){
            console.log(error)
        }
    }

    const isAvailable= (roomNumber) => {
        
        const isFound = roomNumber.unavailableDates.some((date) => 
            allDates.includes(new Date(date).getTime()),  
        )
        
        return !isFound
    }

    const {data, loading, error, refreshData}= useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels/rooms/${hotelId}`)

    const handleSubmit = async (event) => {

        const title = document.getElementById("newName").value
        const desc = document.getElementById("newDesc").value
        const maxPeople = document.getElementById("newMaxPeople").value
        const price = document.getElementById("newPrice").value

            console.log(searchTerm)

        try{
  
        const res= await fetch(`https://juzr-hotel-backend.onrender.com/api/rooms/${hotelId}`,{
            method:'POST',
            credentials:'include',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                    title: title,
                    desc: desc, 
                    maxPeople: maxPeople,
                    price: price,
                    roomNumbers: searchTerm
                })
              })
          refreshData()
          setOpenChangevalue(false)
              }catch(err){
                console.log(err)
              }  
  
            };

    const handleSearch= async(roomId) => {
        const title = document.getElementById("name").value
        console.log(title)
        const desc = document.getElementById("desc").value
        const maxPeople = document.getElementById("maxPeople").value
        
        

        

        const res= await axios({
            method: 'put',
            url: `https://juzr-hotel-backend.onrender.com/api/rooms/${roomId}`,
            headers:{'Content-Type': 'application/json'}, 
            data: {
                    title: title,
                    desc: desc, 
                    maxPeople: maxPeople
            }
          })
        
        refreshData()
        setOpenChangevalue(false)
        setIndex("")
        
                
    }
    const handleDelete= async(roomId) => {

        
          await fetch(`https://juzr-hotel-backend.onrender.com/api/rooms/${roomId}/${hotelId}`,{
            method:'DELETE',
            credentials:'include',
            headers:{'Content-Type':'application/json'},
            
              }).catch(error => console.log(error))
        
        refreshData()
        setOpenChangevalue(false)
        setIndex("")
        
                
    }
    

    

    
    return(
    loading ?<div class="spinner-border bg-secondary align-middle text-primary" role="status">
    
  </div> :
        <div className="bg-secondary border p-4 shadow-sm w-75  rounded-3 d-flex flex-column">
            <div className="d-flex mb-4"><h3>Chambres</h3> <p className="m-0 mt-1 ms-2 text-primary p-1 bg-white shadow-sm h-75 rounded-pill" onClick={()=> setOpenCreateRoom(true)} style={{fontSize:"14px", cursor:"pointer"}}>+ Ajouter une chambre</p></div>
            {data?.map((room, index)=>
             
                <div className="bg-white mb-6 text-wrap p-3 d-flex flex-column align-items-center shadow-sm rounded-pill" onClick={()=> {setOpenChangevalue(true); setIndex(index)} } style={{cursor:"pointer"}}>
                    <Row className="d-flex flex-column align-items-center">
                        <p className="fw-bold mt-3 fs-5 "><MdBedroomParent /> {room.title}</p>
                        <p className="text-center fs-5">{room.desc}</p>

                    </Row>
                    <Row>
                        {room.roomNumbers.map((roomNumber)=>
                    isAvailable(roomNumber) ?
                        <Col className="bg-primary me-5 d-flex flex-column mt-3 rounded-3">
                            <p className="fw-bold fs-4 text-center text-white mb-3">{roomNumber.number}</p>
                            <p className="text-white text-center">Disponible</p>
                        </Col> :
                        <Col className="bg-danger me-5 d-flex flex-column mt-3 rounded-3">
                            <p className="fw-bold fs-4 text-center text-white mb-3">{roomNumber.number}</p>
                            <p className="text-white text-center">Indisponible</p>
                        </Col>
                        )}
                        
                    </Row>

                </div>)}
            {openCreateRoom&&
                <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
                <Container  className="bg-white d-none d-md-block w-50 h-75 p-2 rounded overflow-auto ">
                    <button className="position-fixed start-75 btn-close" type="button" onClick={()=> {setOpenCreateRoom(false)} }  aria-label="Close"></button>
                    <span className="fs-5 fw-bold text-primary m-2">Ajouter une chambre</span>
                    <div className="d-flex flex-column mx-3 mt-3">
                        
                            <div className="d-flex flex-column mx-5  pb-6 border-bottom">
                                <p className="fw-bold text-decoration-underline fs-4">Informations</p>
                                <Row className="d-flex">
                                    <Col className=" ">
                                        <p className="m-0   me-2 fw-bold">Nom de la chambre:</p>
                                        <input className="m-0 fs-6   text-center rounded-3  fw-bold" id="newName" />
                                    </Col>

                                    <Col className="   ">
                                        <p className="m-0   me-2 fw-bold">Description:</p>
                                        <input className="m-0 fs-6  text-center rounded-3  " id="newDesc" />
                                    </Col>

                                    <Col className="   ">
                                        <p className="m-0   me-2 fw-bold">Personnes max:</p>
                                        <input className="m-0 fs-6 text-center rounded-3 mb-3 fw-bold" type="number" id="newMaxPeople"  />                                    
                                    </Col>
                                    <Col className="  ">
                                        <p className="m-0  fs-6 me-2 fw-bold">Prix (en €):</p>
                                        <input className="m-0 fs-6 text-center rounded-3 fw-bold" type="number" id="newPrice"  />                                    
                                    </Col>

                                </Row>
                                <p className="fw-bold text-decoration-underline fs-4">Chambres</p>
                                
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Row className="d-flex">
                                            <Col className=" ">
                                                <p className="m-0   me-2 fw-bold">Numéro de la chambre:</p>
                                                <input  className="m-0 fs-6   text-center rounded-3  fw-bold"
                                                        onChange={(e) => updateSearch(e, 0)}/>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex">
                                            <Col className=" ">
                                                <p className="m-0   me-2 fw-bold">Numéro de la chambre:</p>
                                                <input  className="m-0 fs-6   text-center rounded-3  fw-bold"
                                                        onChange={(e) => updateSearch(e, 1)}/>
                                            </Col>
                                        </Row>
                                    </div>
                                    {dupliacte&&
                                    <div>
                                        <Row className="d-flex">
                                            <Col className=" ">
                                                <p className="m-0   me-2 fw-bold">Numéro de la chambre:</p>
                                                <input  className="m-0 fs-6   text-center rounded-3  fw-bold"
                                                        onChange={(e) => updateSearch(e, 2)}/>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex">
                                            <Col className=" ">
                                                <p className="m-0   me-2 fw-bold">Numéro de la chambre:</p>
                                                <input  className="m-0 fs-6   text-center rounded-3  fw-bold"
                                                        onChange={(e) => updateSearch(e, 3)}/>
                                            </Col>
                                        </Row>
                                    </div>}
                                </div>

                                
                                <p  className="m-0 mt-2 text-primary p-1 bg-secondary text-center w-50 shadow-sm h-75 rounded-pill"
                                    onClick={()=> dupliacte? setDuplicate2(true) : setDuplicate(true) }
                                    style={{fontSize:"14px", cursor:"pointer"}}>
                                    + Ajouter des salles pour la chambre</p>

                                    
                                    
                                </div>
                        
                    </div>
                    <div className="d-flex justify-content-between w-100">
                                        <Button className="bg-danger text-white fw-bold me-1 w-50 mt-5" onClick={() =>setOpenCreateRoom(false)}>Annuler</Button>
                                        <Button className="bg-primary text-white fw-bold w-50 ms-1 mt-5" onClick={() => handleSubmit()} >Valider</Button>
                                    </div>
    
                </Container>
                </div> }
            {openChangeValue && 
                <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
                <Container  className="bg-white d-none d-md-block w-50 h-75 p-2 rounded overflow-auto ">
                    <button className="position-fixed start-75 btn-close" type="button" onClick={()=> {setOpenChangevalue(false); setIndex("")} }  aria-label="Close"></button>
                    <span className="fs-5 fw-bold text-primary m-2">Modifier la chambre</span>
                    <div className="d-flex flex-column mx-3 mt-3">
                        
                            <div className="d-flex justify-content-between mx-5 mt-2 pb-7 border-bottom">
                                <div className="w-100 d-flex flex-column align-items-center ">
                                    <div className="d-flex w-100">
                                        <p className="m-0 w-25 fs-5 me-2 fw-bold">Nom de la chambre:</p>
                                        <input className="m-0 fs-5 w-75 text-center rounded-3 mb-4 fw-bold" id="name" defaultValue={data[index].title}/>
                                    </div>

                                    <div className="d-flex w-100">
                                        <p className="m-0 w-25 fs-5 me-2 fw-bold">Description :</p>
                                        <input className="m-0 fs-5 w-75 text-center rounded-3 mb-4 " id="desc" defaultValue={data[index].desc}/>
                                    </div>

                                    <div className="d-flex w-100">
                                        <p className="m-0 w-25 fs-5 me-2 fw-bold">Personnes max:</p>
                                        <input className="m-0 fs-5 w-75 text-center rounded-3 mb-3 fw-bold" id="maxPeople" defaultValue={data[index].maxPeople} />                                    
                                    </div>
                                    <div className="d-flex mt-5">
                                    {data[index].roomNumbers.map((roomNumber)=>
                                    
                                        
                                    isAvailable(roomNumber) ?
                                    <div className="rounded p-3 d-flex flex-column justify-content-between bg-primary bg-opacity-25 w-75  ms-5 mt-1">
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
                                     
                                    <Button className=' bg-primary text-center text-white w-75 ms-4 m-2 ' onClick={()=> handleClick(roomNumber._id)}  >Réservez!</Button>
                                </div>:
                                <div className="rounded p-3 d-flex flex-column justify-content-between bg-danger bg-opacity-25 w-75  ms-5 mt-1">
                                     
                                    <p className="fw-bold fs-3 text-center text-black mt-2 mb-3 text-white">{roomNumber.number}</p>
                                    <p className=" text-center mb-2 px-3 m-0"> Réservée du <span className="fw-bold">{format(roomNumber.unavailableDates[0], 'dd/MM/yyyy')}</span> au <span className="fw-bold">{format(roomNumber.unavailableDates[roomNumber.unavailableDates.length-1], 'dd/MM/yyyy')}</span> </p>
 
                                     
                                    
                                </div>
                                            
                                            )}
                                        </div>

                                </div>
                                    
                                    
                                </div>
                        
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <Button className="bg-danger text-white fw-bold me-1 w-50 mt-5" onClick={() =>setOpenChangevalue(false)}>Annuler</Button>
                        <Button className="bg-primary text-white fw-bold w-50 ms-1 mt-5" onClick={() => handleSearch(data[index]._id)}>Valider</Button>
                    </div>
                    <div className="d-flex justify-content-center w-100 border">
                    <Button className="bg-warning text-white fw-bold w-50  mt-5" onClick={() => handleDelete(data[index]._id)}>Supprimer cette chambre</Button>
                    </div>
                </Container>
                </div> 
                }
        </div>
    )
}