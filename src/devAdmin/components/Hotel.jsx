import { useState } from "react"
import { Button, Card, Carousel, Image } from "react-bootstrap"
import axios from "axios"
import useFetch from "../../clients/features/get_withcredentials"



export default function Hotel(){
    const [deleteHotel, setDeleteHotel] = useState()
    const [hotelId, setHotelId] = useState()



    const {data, loading, error, refreshData}= useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels`)




   

    const handleDelete= async(id) => {
        try{
            const res= axios({
                method:'delete',
                url: `https://juzr-hotel-backend.onrender.com/api/hotels/${id}`,
                withCredentials: true,

            })
            console.log(res.data)
            setHotelId(null)
            setDeleteHotel(null)
            refreshData()
        }catch(err){
            console.log(err)
        }
    }
    

return(
    loading  ? <div class="spinner-border bg-secondary align-middle text-primary" role="status"> </div>:
    <div className="w-100 h-100 bg-secondary">
        <h1 className="text-center pt-3">Hotels List</h1>
        <div className="d-flex flex-column align-items-center justify-content-center  w-100 mt-5">
            
            {data?.map((hotel)=>
                <Card className="my-4 w-75 ">
                    <Card.Title className="d-flex fs-4 justify-content-center p-2">{hotel.name} <p className='ms-3 mt-1 px-1 border border-black border-2 rounded fs-6 fw-bold'>{hotel.type}</p> </Card.Title>
                    <Carousel>
                        {hotel?.photos.map((images)=>
                            <Carousel.Item>
                                <Image src={images}  className='ms-7 ps-7 rounded mt-1'  width="70%" height="400px" />
                            </Carousel.Item>
                        )}
                    </Carousel>
                    <Button className="w-100 bg-danger mt-4 text-center fw-bold text-white" onClick={()=> {setDeleteHotel(hotel.name); setHotelId(hotel._id)}}>Delete</Button>
                </Card>
            )}

    
            
        </div>
        {deleteHotel&&
        <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
            <div className="bg-white p-3 h-25 rounded">
                <h3 className="text-center pt-3">Êtes-vous sûr de supprimer {deleteHotel} définitivement ?</h3>
                <div className="d-flex justify-content-between w-100">
                    <Button className="mt-2 w-25 bg-primary mt-4 text-center fw-bold text-white" onClick={()=> handleDelete(hotelId)}>Oui</Button>
                    <Button className="mt-2 w-25 bg-danger mt-4 text-center fw-bold text-white" onClick={()=> setDeleteHotel(null)}>Non</Button>
                </div>
            </div>
        </div>
        }
        
    </div>
    )
}