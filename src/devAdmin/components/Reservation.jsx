import { useState } from "react"
import { Button} from "react-bootstrap"
import { useEffect } from "react"
import axios from "axios"
import useFetch from "../../clients/features/get"
import { format } from "date-fns"



export default function Reservation(){
    const [hotel, setHotel] =useState()
    const [dataHotel, setDataHotel]= useState()

    useEffect(() => {

            const fetchAPI = async() => {
                try{
                    const res= await axios({
                        method: 'get',
                        url: `http://localhost:10000/api/hotels`,
                    })
                    setDataHotel(res.data)
                    
      
              }catch(err){
                  console.log(err)
              }}
              fetchAPI()
              
       
          }, [])

          useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
                selectedRoom()

                
            }, 3000)
        
            return () => clearTimeout(delayDebounceFn)
          }, [dataHotel])


          


    const selectedRoom = () => {
        
        

        data?.map((room)=>
            room.roomNumbers.map((roomNumber) =>
                roomNumber.unavailableDates.map((element)=>{
                    if(element){
                        dataHotel.map((hotel)=>{
                            if(hotel.room.includes(room._id)){
                                setHotel(hotel)
                            }
                        })
                    }
                }
            )
        ))
        return 
    }
 


    const {data, loading, error, refreshData}= useFetch(`http://localhost:10000/api/rooms`)

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


   



return(
    loading || !hotel  ? <div class="spinner-border bg-secondary align-middle text-primary" role="status"> </div>:
    <div className="w-100 h-100 bg-secondary">
        <h1 className="text-center pt-3"> Reservation cancel List</h1>
        <div className="d-flex flex-column align-items-center justify-content-center  w-100 mt-5">
            
            {data?.map((room)=>
                room.roomNumbers.map((roomNumber) =>
                    roomNumber.unavailableDates.map((element)=>
                        element[2] && 
                        
                    <div className=" d-flex flex-column text-center mb-4 px-3 m-0 border shadow border-white bg-white mt-5 border-4">
                        <h3 className="fw-bold">{hotel.name}</h3>

                        <div className="d-flex flex-column mt-2 pb-3 border-bottom ">
                            <p className="m-0 fw-bold text-center">{room.title}</p>
                            <p className="m-0 fw-light">{room.desc}</p>
                            <p className="m-0 fw-bold" style={{"fontSize": "14px"}}>Personnes max: {room.maxPeople}</p>
                       </div>
                        
                        <p className="mt-2">Réservée du <span className="fw-bold">{format(element[0][0], 'dd/MM/yyyy')}</span> au <span className="fw-bold">{format(element[0][element[0].length-1], 'dd/MM/yyyy')}</span> par <span className="fw-bold">{element[1]}</span></p>
                        <Button className="rounded bg-danger text-white fw-bold mt-2" onClick={()=>deleteRoomStatus(roomNumber._id, element)} >Annuler la réservation</Button>
                     </div>
                )
            ))}
            
        </div>
    </div>
    )
}