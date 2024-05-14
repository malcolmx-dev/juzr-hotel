import { Button, Container } from "react-bootstrap"
import useFetch from "../clients/features/get"
import { useContext, useEffect, useState } from "react"
import { SearchContest } from "../clients/utils/SearchContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContest } from "../clients/utils/AuthContext"

export default function Reserve({setOpen, hotelId, days, cancelRoom, handleCancel, hotel}){

    const {data, loading, error}= useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels/rooms/${hotelId}`)
    const [selectedRoom, setSelectedRoom] = useState([])
    const {dates}= useContext(SearchContest)
    const [fillRoom, setFillRoom]= useState()

    const {user}= useContext(AuthContest)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(fillRoom);
        

        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [fillRoom])

    const handleSelect= (e) => {
        const checked= e.target.checked
        const value= e.target.value
        setSelectedRoom(checked ? [...selectedRoom, value] : selectedRoom.filter(data => data !== value))
    }

    const getDateInRange = (start, end) => {
        const date= new Date(start.getTime())
        const list=[]

        while(date <= end){
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }

        return list
    }
    const allDates= dates ? getDateInRange(dates[0].startDate, dates[0].endDate) : []
    const navigate = useNavigate()


    const isAvailable= (roomNumber) => {
        const isFound=roomNumber.unavailableDates.some((element, index)=>
        
        element[0].some((date) => 
            allDates.includes(new Date(date).getTime())  
            
        )
    )
        return !isFound
    }
    const handleError = (roomNumber) => {
        if(!isAvailable(roomNumber)){
            alert ("Cette chambre n'est plus disponible")
            
        }
    }
    const handleReserve = async( price) => {
        setFillRoom([allDates, user.name+" "+user.surname])
        if(fillRoom){
            try{
                await Promise.all(
                    selectedRoom.map((roomId) => {
                        const res= axios({
                            method: 'put',
                            url: `https://juzr-hotel-backend.onrender.com/api/rooms/availability/${roomId}`,
                            data:{
                                dates:fillRoom
                            }
                        })
                        return res.data
                    }),
                    axios({
                        method:'put',
                        url: `https://juzr-hotel-backend.onrender.com/api/earn/increase`,
                        withCredentials:true,
                        data:{
                            name: hotel,
                            price:price,
                            date: allDates,
                            user: user.name+" "+user.surname,
                            month: new Date().getMonth()
                        }

                    })
                    
                )
                setOpen(false)
                navigate("/")

            }catch(err){
                console.log(error)
            }}
    }

    return(
        cancelRoom ?
        <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
            <Container  className="bg-white d-none d-md-block w-50 h-50 p-2 rounded overflow-auto ">
                <button className="position-fixed start-75 btn-close" type="button" onClick={() => setOpen(false)}  aria-label="Close"></button>
                <div className="d-flex flex-column mx-3 mt-3">
                    
                        <div className="d-flex justify-content-between mx-5 mt-2 pb-7 border-bottom">
                            <div className="d-flex flex-column">
                                <p className="m-0 fw-bold">{cancelRoom.title}</p>
                                <p className="m-0 fw-light">{cancelRoom.desc}</p>
                                <p className="m-0 fw-bold" style={{"fontSize": "14px"}}>Personnes max: {cancelRoom.maxPeople}</p>
                                <p className="m-0"> <span className="fw-bold">{cancelRoom.price * days}€</span> pour {days} jours </p>
                                
                            </div>
                            
                            
                        </div>
                    
                </div>
                <Button onClick={() => handleCancel()} className="bg-danger text-white ms-7 fw-bold text-center w-75 mt-5 py-2">Annuler la réservation!</Button>

            </Container>
            <Container  className="bg-white d-md-none w-75 h-50  rounded overflow-auto ">
                <button className="position-fixed start-75 btn-close" type="button" onClick={() => setOpen(false)}  aria-label="Close"></button>
                
                <div className="d-flex flex-column mx-3 mt-3">
                    
                        <div className="d-flex justify-content-between mt-2 pb-5 border-bottom">
                            <div className="d-flex flex-column">
                                <p className="m-0 fw-bold">{cancelRoom.title}</p>
                                <p className="m-0 fw-light">{cancelRoom.desc}</p>
                                <p className="m-0 fw-bold" style={{"fontSize": "14px"}}>Personnes max: {cancelRoom.maxPeople}</p>
                                <p className="m-0"> <span className="fw-bold">{cancelRoom.price * days}€</span> pour {days} jours </p>
                            </div>
                            
                            
                        </div>
                   
                </div>
                <Button onClick={() => handleCancel()} className="bg-danger ms-4 text-white fw-bold text-center mt-2 w-75 py-2">Annuler la réservation !</Button>

            </Container>
        </div> :
        <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
            <Container  className="bg-white d-none d-md-block w-50 h-75 p-2 rounded overflow-auto ">
                <button className="position-fixed start-75 btn-close" type="button" onClick={() => setOpen(false)}  aria-label="Close"></button>
                <span className="fs-5 m-2">Choisi ta chambre :</span>
                <div className="d-flex flex-column mx-3 mt-3">
                    {data?.map((item) =>
                        <div>
                            <div className="d-flex justify-content-between mx-5 mt-2 pb-7 border-bottom">
                                <div className="d-flex flex-column">
                                    <p className="m-0 fw-bold">{item.title}</p>
                                    <p className="m-0 fw-light">{item.desc}</p>
                                    <p className="m-0 fw-bold" style={{"fontSize": "14px"}}>Personnes max: {item.maxPeople}</p>
                                    <p className="m-0"> <span className="fw-bold">{item.price * days}€</span> pour {days} jours </p>
                                    
                                </div>
                                <div className="d-flex">
                                    {item.roomNumbers.map((roomNumber) => 
                                        <div className="mx-2 d-flex flex-column">
                                            <label className="text-light">{roomNumber.number}</label>
                                            <div className="w-50 h-25" style={{cursor: "pointer"}} onClick={() => handleError(roomNumber)}><input type="checkbox" value={roomNumber._id} disabled={!isAvailable(roomNumber)}   onChange={handleSelect} /></div>
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                            <Button onClick={() => handleReserve(item.price * days)} className="bg-primary text-white ms-7 fw-bold text-center w-75 mt-5 py-2">Réservez maintenant !</Button>
                        </div>
                    )}
                </div>

            </Container>
            <Container  className="bg-white d-md-none w-75 h-75  rounded overflow-auto ">
                <button className="position-fixed start-75 btn-close" type="button" onClick={() => setOpen(false)}  aria-label="Close"></button>
                <span className="fs-5 m-2">Choisi ta chambre :</span>
                <div className="d-flex flex-column mx-3 mt-3">
                    {data?.map((item) =>
                        <div>
                            <div className="d-flex justify-content-between mt-2 pb-5 border-bottom">
                                <div className="d-flex flex-column">
                                    <p className="m-0 fw-bold">{item.title}</p>
                                    <p className="m-0 fw-light">{item.desc}</p>
                                    <p className="m-0 fw-bold" style={{"fontSize": "14px"}}>Personnes max: {item.maxPeople}</p>
                                    <p className="m-0"> <span className="fw-bold">{item.price * days}€</span> pour {days} jours </p>
                                </div>
                                <div className="d-flex">
                                    {item.roomNumbers.map((roomNumber) => 
                                        <div className="mx-2 w-50 d-flex flex-column">
                                            <label className="text-light">{roomNumber.number}</label>
                                            <div className="w-50 h-25" style={{cursor: "pointer"}} onClick={() => handleError(roomNumber)}><input type="checkbox" value={roomNumber._id} disabled={!isAvailable(roomNumber)}   onChange={handleSelect} /></div>
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                            <Button onClick={() => handleReserve(item.price * days)} className="bg-primary text-white ms-4 fw-bold text-center w-75 mt-2 py-2">Réservez maintenant !</Button>
                        </div>
                    )}
                </div>

            </Container>
        </div>
    )
}