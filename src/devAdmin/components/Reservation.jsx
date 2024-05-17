import { useState } from "react"
import { Button} from "react-bootstrap"
import { useEffect } from "react"
import axios from "axios"
import useFetch from "../../clients/features/get"
import { format } from "date-fns"



export default function Reservation(){
    const [dataHotel, setDataHotel]= useState()

    const {data, loading, error, refreshData}= useFetch(`https://juzr-hotel-backend.onrender.com/api/rooms`)
    useEffect(() => {

        const fetchAPI = async() => {
            try{
                const res= await axios({
                    method: 'get',
                    url: `https://juzr-hotel-backend.onrender.com/api/hotels`,
                })
                setDataHotel(res.data)
                
  
          }catch(err){
              console.log(err)
          }}
          fetchAPI()
          
   
      }, [loading])

    const deleteRoomStatus= async(roomId, dates, price, user, hotel) => {
        try{
            const res= await axios({
                        method: 'delete',
                        withCredentials:true,
                        url: `https://juzr-hotel-backend.onrender.com/api/rooms/availability/delete/${roomId}`,
                        data:{
                            dates:dates
                        }
                      })
            const res2= axios({
                method:'put',
                url: `https://juzr-hotel-backend.onrender.com/api/earn/decrease`,
                withCredentials:true,
                data:{
                    name: hotel,
                    price:price,
                    date: dates[0],
                    user: user,
                    month: new Date().getMonth()
                }

            })
            refreshData()
            return res.data
        }catch(err){
            console.log(error)
        }
    }


   



return(
    !dataHotel  ? <div class="spinner-border bg-secondary align-middle text-primary" role="status"> </div>:
    <div className="w-100 h-100 bg-secondary">
        <h1 className="text-center pt-3"> Reservation cancel List</h1>
        <div className="d-flex flex-column align-items-center justify-content-center  w-100 mt-5">
            
            {data?.map((room)=>
                room.roomNumbers.map((roomNumber) =>
                    roomNumber.unavailableDates.map((element)=>
                        element[2] ? 
                        
                    
                            dataHotel.map((hotel)=>
                                
                                hotel.room.includes(room._id)&&
                                    <div className=" d-flex flex-column text-center mb-4 px-3 m-0 border shadow border-white bg-white mt-5 border-4">
                                        <h1 >{hotel.name}</h1> 
                                        <div className="d-flex flex-column mt-2 pb-3 border-bottom ">
                                            <p className="m-0 fw-bold text-center">{room.title}</p>
                                            <p className="m-0 fw-light">{room.desc}</p>
                                            <p className="m-0 fw-bold" style={{"fontSize": "14px"}}>Personnes max: {room.maxPeople}</p>
                                        </div>
                        
                                        <p className="mt-2">Réservée du <span className="fw-bold">{format(element[0][0], 'dd/MM/yyyy')}</span> au <span className="fw-bold">{format(element[0][element[0].length-1], 'dd/MM/yyyy')}</span> par <span className="fw-bold">{element[1]}</span></p>
                                        <Button className="rounded bg-danger text-white fw-bold mt-2" onClick={()=>deleteRoomStatus(roomNumber._id, element, room.price, element[1], hotel.name)} >Annuler la réservation</Button>
                                    </div>

                             ):
                             <p className="m-0 fw-bold rounded-5 my-2 bg-white p-2 text-center border shadow-sm">Aucune annualtion de réservation</p>                     
                )
            ))}
            
        </div>
    </div>
    )
}