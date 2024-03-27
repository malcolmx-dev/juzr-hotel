import {  Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function HotelForm(){
    const navigate= useNavigate()
    const userParams= useParams()
    const userId= userParams.userId

    const stringToSplit= (string, separator) => {
        const newArray=  string.split(separator)
        console.log(newArray)
    }
    
    const handleSubmit = async (event) => {
     
  
        event.preventDefault();
        event.stopPropagation();

          
        const name= document.getElementById('name').value
        const type= document.getElementById('type').value
        const adress= document.getElementById('adress').value
        const city= document.getElementById('city').value
        const desc= document.getElementById('desc').value
        const island=document.getElementById('island').value
        const cheapestPrice= document.getElementById('cheapestPrice').value
        var input = document.getElementById('images')

        
  
        const result= await fetch(`https://juzr-hotel-backend.onrender.com/api/hotels/${userId}`, {
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
                cheapestPrice
            }),
        }).then((res)=>res.json()) 
        console.log(result)
              
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
                            <Form.Control type="text" placeholder="(Hotel, Appartemments, ...)"/>
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
                            <Form.Control type="text"/>
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
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Papier toilette
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Serviettes
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Baignoire ou douche
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Salle de bains privative
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Toilettes
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Douche
                            </label>
                        </div>

                        <p className="fw-bold fs-5">Vue</p>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Vue sur la mer
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Vue
                            </label>
                        </div>

                        <p className="fw-bold fs-5">En extérieur</p>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Cheminée extérieure
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Aire de pique-nique
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Mobilier extérieur
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Front de mer
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Terrasse bien exposée
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Plage privée
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Balcon
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Terrasse
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Jardin
                            </label>
                        </div>

                        <p className="fw-bold fs-5">Équipements en chambre</p>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Prise près du lit
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Étendoir
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Portant
                            </label>
                        </div>

                        <p className="fw-bold fs-5">En extérieur</p>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Cheminée extérieure
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Aire de pique-nique
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Mobilier extérieur
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Front de mer
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Terrasse bien exposée
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Plage privée
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Balcon
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Terrasse
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Jardin
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Plage privée
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Balcon
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Terrasse
                            </label>
                        </div>
                        <div className="d-flex">
                            <input className="form-check-input me-3" type="checkbox" value="" id="flexCheckIndeterminate"/>
                            <label className="form-check-label" for="flexCheckIndeterminate">
                            Jardin
                            </label>
                        </div>
                        
                    </Col>
                    <Col className="d-flex flex-column">

                    </Col>
                    <Col className="d-flex flex-column">
                    </Col>
                </Row>

                
            </Form>
    )
}