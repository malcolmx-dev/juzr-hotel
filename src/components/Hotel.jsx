import { useEffect, useState } from "react";
import {  Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function HotelForm(){
    const navigate= useNavigate()
    const userParams= useParams()
    const cookies = new Cookies();
    const [photos, updatePhotos]= useState([])
    const [equipments, setEquipment]= useState({
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
    })
    const [type, setType]= useState("")
    const [island, setIsland]= useState("")

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(equipments)
          // Send Axios request here
        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [equipments])
    const equipmentToSplit= (string, separator, id) => {
        const newArray=  string.split(separator)
        setEquipment(prevState => ({...prevState, [id]: newArray}))
        
    }

    const setCheckedEquipment= (e, id)=> {
        const checked= e.target.checked
        setEquipment(checked?prevState => ({...prevState, [id]: true}): prevState => ({...prevState, [id]: false}) )
    }

    const setCheckedType= (e, id)=> {
        const checked= e.target.checked
        setType(checked? id: null)
    }
    console.log(type)
    const setCheckedIsland= (e, id)=> {
        const checked= e.target.checked
        setIsland(checked? id: null)
    }
    console.log(island)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(photos)
          // Send Axios request here
        }, 3000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [photos])

    const userId= userParams.userId

    const stringToSplit= (string, separator) => {
        const newArray=  string.split(separator)
        
        updatePhotos(newArray)
        console.log(photos)
    }
    
    const handleSubmit = async (event) => {
     
  
        event.preventDefault();
        event.stopPropagation();

          
        const name= document.getElementById('name').value
        const adress= document.getElementById('adress').value
        const city= document.getElementById('city').value
        const desc= document.getElementById('desc').value
        const cheapestPrice= document.getElementById('cheapestPrice').value
        var input = document.getElementById('images')

        
  
        const result= await fetch(`http://localhost:10000/api/hotels/${userId}`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
                },
            credentials: 'include',
            body: JSON.stringify({
                name,
                type,
                island,
                adress,
                city,
                desc,
                cheapestPrice,
                photos, 
                equipments
            }),
        }).then((res)=>res.json()) 
        console.log(result)
        console.log(cookies.get('access_token')); 


        
              
        
            if(result._id){
                navigate(`/admin/${userId}/${result._id}`)
            }
        
  
        
       
                
  
            };
    return(
        <Form onSubmit={e=> handleSubmit(e)}>
            <p className="fw-bold fs-4">Informations</p>
                <Row>
                    <Col >
                        <Form.Group controlId="name">
                            <Form.Label>Nom de l'hotel</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <div className="d-flex flex-column">
                                <div className="d-flex">
                                    <input className="form-check-input " type="checkbox" value="" disabled={type=== "Appartement&Maison"|| type==="Chambre d'hôte"} id="flexCheckIndeterminate" onChange={e => setCheckedType(e, "Hotel")} />
                                    <label className="form-check-label " for="flexCheckIndeterminate">
                                    Hotel
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <input className="form-check-input " type="checkbox" value="" disabled={type=== "Appartement&Maison"|| type==="Hotel"} id="flexCheckIndeterminate" onChange={e => setCheckedType(e, "Chambre d'hôte")} />
                                    <label className="form-check-label " for="flexCheckIndeterminate">
                                    Chambre d'hôte
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <input className="form-check-input " type="checkbox" disabled={type=== "Hotel"|| type==="Chambre d'hôte"} value="" id="flexCheckIndeterminate" onChange={e => setCheckedType(e, "Appartement&Maison")} />
                                    <label className="form-check-label " for="flexCheckIndeterminate">
                                    Appartement&Maison
                                    </label>
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="adress">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="city">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="island">
                            <Form.Label>Île</Form.Label>
                            <div className="d-flex flex-column">
                                <div className="d-flex">
                                    <input className="form-check-input " type="checkbox" value="" disabled={island=== "Anjouan"|| island==="Moheli"} id="flexCheckIndeterminate" onChange={e => setCheckedIsland(e, "Ngazidja")} />
                                    <label className="form-check-label " for="flexCheckIndeterminate">
                                    Ngazidja
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <input className="form-check-input " type="checkbox" value="" disabled={island=== "Ngazidja"|| island==="Moheli"} id="flexCheckIndeterminate" onChange={e => setCheckedIsland(e, "Anjouan")} />
                                    <label className="form-check-label " for="flexCheckIndeterminate">
                                    Anjouan
                                    </label>
                                </div>
                                <div className="d-flex">
                                    <input className="form-check-input " type="checkbox" disabled={island=== "Anjouan"|| island==="Ngazidja"} value="" id="flexCheckIndeterminate" onChange={e => setCheckedIsland(e, "Moheli")} />
                                    <label className="form-check-label " for="flexCheckIndeterminate">
                                    Moheli
                                    </label>
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="images" className="mb-3 d-flex flex-column justify-content-between h-100 " onChange={e => stringToSplit(e.target.value, ",") }>
                            <Form.Label className="text-center mt-3">Choisissez des images représentant votre hotel <br /> <span className="fw-bold">(Sous forme de lien, chaque lien doit être séparée d'une virgule <span className="text-danger text-uppercase">uniquement</span>)</span> </Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group controlId="cheapestPrice" className=" d-flex flex-column justify-content-between h-100"  >
                            <Form.Label className="text-center mt-3 w-100">Prix de la chambre la moins chère <br />(en KMF)</Form.Label>
                            
                            <InputGroup >
                                
                                <Form.Control
                                aria-describedby="basic-addon2"
                                type="number"
                                />
                                <InputGroup.Text id="basic-addon2">KMF</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className="mt-3 text-white">Confirmer</Button>

                <p className="fw-bold fs-4 mt-3">Equipement</p>

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

                
            </Form>
    )
}