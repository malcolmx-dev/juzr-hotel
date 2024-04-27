import { Button, Card, Carousel, Col, Container, Form, Image, Row } from "react-bootstrap";
import useFetch from "../../clients/features/get";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaArrowTurnUp } from "react-icons/fa6"
import axios from "axios";




export default function Dashboard(){
    const hotelParams= useParams()
    const [openChangedefaultValue, setOpenChangedefaultValue] = useState(false)
    const [openCreatePhoto, setOpenCreatePhoto] = useState(false)
    const [openCreateEquipments, setOpenCreateEquipments] = useState(false)
    const [changePhoto, setChangePhoto] = useState(false)
    const [changeEquipments, setChangeEquipments] = useState(false)

    const hotelId= hotelParams.hotelId
    const navigate= useNavigate()

    const {data, loading, error, refreshData}= useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels/find/${hotelId}`)
    
    var newPhotosListPhotos = loading? null: data?.photos?.map(element => element)

    const [listPhotos, updateListPhotos]=  useState([])
    const [equipments, setEquipment]=  useState([{
        bathroom:[],
        vue:[],
        outside:[],
        bedroom:[],
        activities:[],
        reception:[],
        restaurant:[],
        security:[],
        general:[],
        health:[],
        internet:false,
        parking:false
    }])
    console.log(data)


    useEffect(() => {
        updateListPhotos(newPhotosListPhotos);
     }, [loading]);

    useEffect(() => {
        !loading && setEquipment(data?.equipments[0]);
        console.log(equipments)
     }, [loading]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(listPhotos)
          changePhoto&& handlePhoto()
          // Send Axios request here
        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [changePhoto])

      useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(equipments)
          changeEquipments&& handleEquipments()
          // Send Axios request here
        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [changeEquipments])
     
    
    var newArrayPhotos
    const stringToSplit= (string, separator) => {
        newArrayPhotos=  string.split(separator)
        
    }
    const equipmentToSplit= (string, separator, id) => {
        const newArray=  string.split(separator)
        setEquipment(prevState => ({...prevState, [id]: newArray}))
        
    }
    const setCheckedEquipment= (e, id)=> {
        const checked= e.target.checked
        setEquipment(checked?prevState => ({...prevState, [id]: true}): prevState => ({...prevState, [id]: false}) )
    }

    
    

    const handleChangeColor= (i) => {
        updateListPhotos(listPhotos.filter((value, index) => index!==i))
        

    }
    const handleSearch= async() => {
        const island = document.getElementById("island").value
        
        const city = document.getElementById("city").value
        const type = document.getElementById("type").value
        const adress = document.getElementById("adress").value
        const desc = document.getElementById("desc").value
       
        
        

        const res= await fetch(`http://localhost:10000/api/hotels/${hotelId}`,{
                    method:'PUT',
                    credentials:'include',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        island: island,
                        city: city, 
                        type: type, 
                        adress:adress,
                        desc: desc,
                        photos: listPhotos,
                        equipments: equipments
                        })
                      }).then(response => {
                            if(response.status===401){
                                alert("Vous n'êtes pas autorisé! Reconnectez-vous")
                                navigate("/admin")
                            }else{
                                refreshData()
                                setOpenChangedefaultValue(false)
                            }
                        })
        
        
      
    }
    const handlePhoto= async() => {
        const res= await fetch(`http://localhost:10000/api/hotels/${hotelId}`,{
                    method:'PUT',
                    credentials:'include',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        
                        photos: listPhotos
                        })
                      }).then(response => {
                        if(response.status===401){
                            alert("Vous n'êtes pas autorisé! Reconnectez-vous")
                            navigate("/admin")
                        }else{
                            refreshData()
                            setOpenChangedefaultValue(false)
                            setOpenCreatePhoto(false)
                            setChangePhoto(false)
                        }
                    })     
    }
    const handleEquipments= async() => {
        console.log(equipments)
        const res= await fetch(`http://localhost:10000/api/hotels/${hotelId}`,{
                    method:'PUT',
                    credentials:'include',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        
                        equipments: equipments
                        })
                      }).then(response => {
                        if(response.status===401){
                            alert("Vous n'êtes pas autorisé! Reconnectez-vous")
                            navigate("/admin")
                        }else{
                            refreshData()
                            setOpenChangedefaultValue(false)
                            setOpenCreateEquipments(false)
                            setChangeEquipments(false)
                        }
                    })     
    }

    return(
        loading ? <div class="spinner-border bg-secondary align-middle text-primary" role="status"> </div> :
            openChangedefaultValue ?
                <Card className="bg-secondary shadow-sm w-75 mt-5 p-2 rounded-3 d-flex flex-column">
                    <Card.Title className="fs-2 fw-bold text-primary text-decoration-underline text-center">{data.name}</Card.Title>

                    <Carousel>
                    {data?.photos.map((images)=>
                    <Carousel.Item>
                        <Image src={images} text="First slide" className='ms-7 ps-7 rounded mt-1'  width="70%" height="400px" />
                    </Carousel.Item>)}
                    </Carousel>
                
                    

                    <Card.Body>
                        <Card.Text>
                        <p className="fw-bold text-primary text-decoration-underline fs-4">Informations</p>

                                <div className="d-flex">
                                    <div className="m-0 me-3 fs-5 rounded bg-white p-2 border shadow-sm">
                                        <span className="fw-bold" >Ile</span>: <input className="border-0 w-75" id="island"  defaultValue={data?.island}/>
                                    </div>
                                    <div className="m-0 me-3 fs-5 rounded bg-white p-2 border shadow-sm">
                                        <span className="fw-bold" >Ville</span>: <input className="border-0 w-50" id="city" type="text" defaultValue={data?.city}/>
                                    </div>
                                    <div className="m-0 me-3 fs-5 rounded bg-white p-2 border shadow-sm">
                                        <span className="fw-bold" >Adresse</span>: <input className="border-0 w-50" id="adress" type="text" defaultValue={data?.adress}/>
                                    </div> 
                                    <div className="m-0 me-3 fs-5 rounded bg-white p-2 border shadow-sm">
                                        <span className="fw-bold">Type</span>: <input className="border-0 w-50" id="type" type="text" defaultValue={data?.type}/>
                                    </div>
            
                                </div>
                                <div className="m-0 mt-2 fs-6 rounded bg-white p-2 border shadow-sm">
                                    <span className="fw-bold fs-5" >Description</span>: <br /><textarea className="border-0 w-100 " id="desc" type="text" defaultValue={data.desc} /> 
                                </div>
                                <div className="d-flex">
                                    <p className="fw-bold text-primary text-decoration-underline pt-2 fs-4">Images</p>
                                    <p className="m-0 mt-3 ms-2 text-primary p-1 bg-white shadow-sm h-75 rounded-pill" onClick={()=> setOpenCreatePhoto(true)}  style={{fontSize:"14px", cursor:"pointer"}}>+ Ajouter des photos</p>
                                </div>
                                {openCreatePhoto&&
                                    <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
                                    <Container  className="bg-white d-none d-md-block w-50 h-75 p-2 rounded overflow-auto ">
                                        <button className="position-fixed start-75 btn-close" type="button" onClick={()=> {setOpenCreatePhoto(false)} }  aria-label="Close"></button>
                                        <span className="fs-5 fw-bold text-primary m-2">Ajouter une photo</span>
                                        <div className="d-flex flex-column mx-3 mt-3">
                                            
                                                <div className="d-flex flex-column mx-5  pb-6 border-bottom">
                                                    
                                                    <div className="d-flex justify-content-between">
                                                        <div>
                                                            <Row className="d-flex">
                                                            <Col>
                                                                <Form.Group controlId="images" className="mb-3 d-flex flex-column justify-content-between h-100 " onChange={e => stringToSplit(e.target.value, ",") }>
                                                                    <Form.Label className="text-center mt-3">Choisissez des images représentant votre hotel <br /> <span className="fw-bold">(Sous forme de lien, chaque lien doit être séparée d'une virgule <span className="text-danger text-uppercase">uniquement</span>)</span> </Form.Label>
                                                                    <Form.Control type="text"  />
                                                                </Form.Group>
                                                            </Col>
                                                            </Row>
                                                        </div>
                                                        
                                                    </div>

                                                    
                                                

                                                        
                                                        
                                                    </div>
                                            
                                        </div>
                                        <div className="d-flex justify-content-between w-100">
                                            <Button className="bg-danger text-white fw-bold me-1 w-50 mt-5" onClick={() =>setOpenCreatePhoto(false)}>Annuler</Button>
                                            <Button className="bg-primary text-white fw-bold w-50 ms-1 mt-5" onClick={() => {newArrayPhotos.forEach((element) => updateListPhotos(oldArray => [...oldArray, element])); changePhoto===true ?setChangePhoto(false):setChangePhoto(true)}} >Valider</Button>
                                        </div>
                        
                                    </Container>
                                    </div> }
                                    
                                <div className="d-flex flex-column align-items-center" id="photosListPhotos">
                                    
                                
                                    {listPhotos?.map((images, index)=>
                                        
                                        <div className="order-2 m-0 w-100 fw-bold rounded-4 my-2 bg-white p-2 border shadow-sm" id={index}>
                                            <Button 
                                                className="btn-close border bg-danger border-black rounded-circle z-2"
                                                id={index+100}
                                                style={{position: 'relative', left:"880px", bottom:"10px"}} variant='outline-white'
                                                onClick={()=>handleChangeColor(index)}
                                                ></Button>
                                            <p id={index+25}>{images}</p>
                                            
                                        </div>
                                    )}
                                    
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="d-flex">
                                        <p className="fw-bold text-primary text-decoration-underline pt-2 fs-4">Equipements</p>
                                        {!data?.equipments[0]&& <p className="m-0 mt-3 ms-2 text-primary p-1 bg-white shadow-sm h-75 rounded-pill" onClick={()=> setOpenCreateEquipments(true)}  style={{fontSize:"14px", cursor:"pointer"}}>+ Ajouter des équipements</p>}
                                    </div>
                                    {data?.equipments[0] && <Row>
                                                            <Col className="d-flex flex-column">
                                                                <p className="fw-bold fs-5">Salle de bains</p>
                                                                <input type="text" defaultValue={data?.equipments[0].bathroom.map((element => element))}  onChange={e => equipmentToSplit(e.target.value, ",", 'bathroom')} />
                                                                
                                                                <p className="fw-bold fs-5">Vue</p>
                                                                <input type="text" defaultValue={data?.equipments[0].vue.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "vue")} />

                                                                <p className="fw-bold fs-5">En extérieur</p>
                                                                <input type="text" defaultValue={data?.equipments[0].outside.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",","outside")} />
                                                                
                                                                <p className="fw-bold fs-5">Équipements en chambre</p>
                                                                <input type="text" defaultValue={data?.equipments[0].bedroom.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "bedroom")} />
                                                                
                                                                
                                                                
                                                            </Col>
                                                            <Col className="d-flex flex-column">
                                                                <p className="fw-bold fs-5">Activités</p>
                                                                <input type="text" defaultValue={data?.equipments[0].activities.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "activities")} />
                                                                
                                                                <p className="fw-bold fs-5">Réception</p>
                                                                <input type="text" defaultValue={data?.equipments[0].reception.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "reception")} />
                                                                
                                                                <p className="fw-bold fs-5">Restauration</p>
                                                                <input type="text" defaultValue={ data?.equipments[0].restaurant.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "restaurant")} />

                                                                <p className="fw-bold fs-5">Internet</p>
                                                                <div className="d-flex">
                                                                    <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate" onChange={e => setCheckedEquipment(e, "internet")} />
                                                                    <label className="form-check-label" for="flexCheckIndeterminate">
                                                                    Internet
                                                                    </label>
                                                                </div>
                                                                
                                                                
                                                            </Col>
                                                            <Col className="d-flex flex-column">
                                                                <p className="fw-bold fs-5">Sécurité</p>
                                                                <input type="text" defaultValue={data?.equipments[0].security.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "security")} />
                                                                <p className="fw-bold fs-5">Général</p>
                                                                <input type="text" defaultValue={data?.equipments[0].general.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "general")} />
                                                                <p className="fw-bold fs-5">Bien-être</p>
                                                                <input type="text" defaultValue={data?.equipments[0].health.map((element => element))} onChange={e => equipmentToSplit(e.target.value, ",", "health")} />
                                                                <p className="fw-bold fs-5">Parking</p>
                                                                <div className="d-flex">
                                                                    <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate" onChange={e => setCheckedEquipment(e, "parking")} />
                                                                    <label className="form-check-label" for="flexCheckIndeterminate">
                                                                    Parking
                                                                    </label>
                                                                </div>
                                                                
                                                                
                                                            </Col>
                                                        </Row> }
                                </div>
                                {openCreateEquipments&&
                                    <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-2" style={{"backgroundColor":"rgba(0, 0, 0, 0.418)"}}>
                                    <Container  className="bg-white d-none d-md-block w-50 h-75 p-2 rounded overflow-auto ">
                                        <button className="position-fixed start-75 btn-close" type="button" onClick={()=> {setOpenCreateEquipments(false)} }  aria-label="Close"></button>
                                        <span className="fs-5 fw-bold text-primary m-2">Ajouter des équipments</span>
                                        <div className="d-flex flex-column mx-3 mt-3">
                                            
                                                <div className="d-flex flex-column mx-5  pb-6 border-bottom">
                                                    
                                                    <div className="d-flex justify-content-between">
                                                        
                                                        <Row>
                                                            <Col className="d-flex flex-column">
                                                                <p className="fw-bold fs-5">Salle de bains</p>
                                                                <input type="text"  onChange={e => equipmentToSplit(e.target.value, ",", 'bathroom')} />
                                                                
                                                                <p className="fw-bold fs-5">Vue</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "vue")} />

                                                                <p className="fw-bold fs-5">En extérieur</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",","outside")} />
                                                                
                                                                <p className="fw-bold fs-5">Équipements en chambre</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "bedroom")} />
                                                                
                                                                
                                                                
                                                            </Col>
                                                            <Col className="d-flex flex-column">
                                                                <p className="fw-bold fs-5">Activités</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "activities")} />
                                                                
                                                                <p className="fw-bold fs-5">Réception</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "reception")} />
                                                                
                                                                <p className="fw-bold fs-5">Restauration</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "restaurant")} />

                                                                <p className="fw-bold fs-5">Internet</p>
                                                                <div className="d-flex">
                                                                    <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate" onChange={e => setCheckedEquipment(e, "internet")} />
                                                                    <label className="form-check-label" for="flexCheckIndeterminate">
                                                                    Internet
                                                                    </label>
                                                                </div>
                                                                
                                                                
                                                            </Col>
                                                            <Col className="d-flex flex-column">
                                                                <p className="fw-bold fs-5">Sécurité</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "security")} />
                                                                <p className="fw-bold fs-5">Général</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "general")} />
                                                                <p className="fw-bold fs-5">Bien-être</p>
                                                                <input type="text" onChange={e => equipmentToSplit(e.target.value, ",", "health")} />
                                                                <p className="fw-bold fs-5">Parking</p>
                                                                <div className="d-flex">
                                                                    <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate" onChange={e => setCheckedEquipment(e, "parking")} />
                                                                    <label className="form-check-label" for="flexCheckIndeterminate">
                                                                    Parking
                                                                    </label>
                                                                </div>
                                                                
                                                                
                                                            </Col>
                                                        </Row>
                                                        
                                                        
                                                    </div>       
                                                </div>
                                            
                                        </div>
                                        <div className="d-flex justify-content-between w-100">
                                            <Button className="bg-danger text-white fw-bold me-1 w-50 mt-5" onClick={() =>setOpenCreateEquipments(false)}>Annuler</Button>
                                            <Button className="bg-primary text-white fw-bold w-50 ms-1 mt-5" onClick={() => {changeEquipments===true ?setChangeEquipments(false):setChangeEquipments(true)}} >Valider</Button>
                                        </div>
                        
                                    </Container>
                                    </div> }
                                <div className="d-flex justify-content-between w-100">
                                        <Button className="bg-danger text-white fw-bold me-1 w-50 mt-5" onClick={() =>{setOpenChangedefaultValue(false); updateListPhotos(newPhotosListPhotos)}}>Annuler</Button>
                                        <Button className="bg-primary text-white fw-bold w-50 ms-1 mt-5" onClick={() => handleSearch()}>Valider</Button>
                                </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
                
                    :
            
                <Card className="bg-secondary shadow-sm w-75 mt-5 p-2 rounded-3 d-flex flex-column" style={{cursor:"pointer"}}  onClick={()=> setOpenChangedefaultValue(true)}>
                    <Card.Title className="fs-2 fw-bold text-primary text-decoration-underline text-center">{data.name}</Card.Title>

                    <Carousel>
                    {data?.photos.map((images)=>
                    <Carousel.Item>
                        <Image src={images} text="First slide" className='ms-7 ps-7 rounded mt-1'  width="70%" height="400px" />
                    </Carousel.Item>)}
                    </Carousel>
                   
                    

                    <Card.Body>
                        <Card.Text>
                        <p className="fw-bold text-primary text-decoration-underline fs-4">Informations</p>
                                <div className="d-flex">
                                    <p className="m-0 me-3 fs-5 rounded bg-white p-2 border shadow-sm w-100" ><span className="fw-bold" >Ile</span>: {data.island}</p>
                                    <p className="m-0 me-3 fs-5 rounded bg-white p-2 border shadow-sm w-100" ><span className="fw-bold" >Ville</span>: {data.city}</p>
                                    <p className="m-0 me-3 fs-5 rounded bg-white p-2 border shadow-sm w-100" ><span className="fw-bold" >Adresse</span>: {data.adress}</p>
                                    <p className="m-0 fs-5 rounded bg-white p-2 border shadow-sm w-100"><span className="fw-bold" >Type</span>: {data.type}</p>
                                </div>
                                <p className="m-0 mt-2 fs-6 rounded bg-white p-2 border shadow-sm"><span className="fw-bold fs-5">Description</span>: <br /> {data.desc}</p>
                                <p className="fw-bold text-primary text-decoration-underline pt-2 fs-4">Image</p>
                                <div className="d-flex flex-column">
                                    {data?.photos.map((images)=>
                                        <p className="m-0 fw-bold rounded-5 my-2 bg-white p-2 border shadow-sm">{images}</p>
                                    )}
                                </div>
                                
                                <p className="fw-bold text-primary text-decoration-underline pt-2 fs-4">Equipements</p>
                                {data?.equipments[0] ? 
                                <div className="d-flex flex-column">
                                    <Row>
                                        <Col className="d-flex flex-column">
                                            <p className="fw-bold fs-5">Salle de bains</p>
                                            {data?.equipments[0].bathroom.map((element => <p className=""><FaCheck />{element}</p>))}
                                                                
                                            <p className="fw-bold fs-5">Vue</p>
                                            {data?.equipments[0].vue.map((element => <p className=""><FaCheck />{element}</p>))}

                                            <p className="fw-bold fs-5">En extérieur</p>
                                            {data?.equipments[0].outside.map((element => <p className=""><FaCheck />{element}</p>))}
                                                                
                                            <p className="fw-bold fs-5">Équipements en chambre</p>
                                            {data?.equipments[0].bedroom.map((element => <p className=""><FaCheck />{element}</p>))}            
                                                                
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <p className="fw-bold fs-5">Activités</p>
                                            {data?.equipments[0].activities.map((element => <p className=""><FaCheck />{element}</p>))}
                                                                
                                            <p className="fw-bold fs-5">Réception</p>
                                            {data?.equipments[0].reception.map((element => <p className=""><FaCheck />{element}</p>))}
                                                                
                                            <p className="fw-bold fs-5">Restauration</p>
                                            {data?.equipments[0].restaurant.map((element =><p className=""><FaCheck /> {element}</p>))}

                                            <p className="fw-bold fs-5">Internet</p>
                                                <div className="d-flex">
                                                    <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate" onChange={e => setCheckedEquipment(e, "internet")} />
                                                    <label className="form-check-label" for="flexCheckIndeterminate">
                                                        Internet
                                                    </label>
                                                </div>
                                                                
                                                                
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <p className="fw-bold fs-5">Sécurité</p>
                                            {data?.equipments[0].security.map((element => <p className=""><FaCheck />{element}</p>))}
                                            <p className="fw-bold fs-5">Général</p>
                                            {data?.equipments[0].general.map((element => <p className=""><FaCheck />{element}</p>))}
                                            <p className="fw-bold fs-5">Bien-être</p>
                                            {data?.equipments[0].health.map((element => <p className=""><FaCheck />{element}</p>))}
                                            <p className="fw-bold fs-5">Parking</p>
                                            <div className="d-flex">
                                                <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate" onChange={e => setCheckedEquipment(e, "parking")} />
                                                <label className="form-check-label" for="flexCheckIndeterminate">
                                                    Parking
                                                </label>
                                            </div>    
                                        </Col>
                                    </Row>


                                    
                                </div> : <p className="m-0 fw-bold rounded-5 my-2 bg-white p-2 text-center border shadow-sm">Aucun equipements</p>}
                        </Card.Text>
                    </Card.Body>
                </Card>
                

    )
}