import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UserComponent from "../../components/User";
import Header from "../../components/Header";

import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";






export default function Signup() {
    const [validated, setValidated] = useState(false);

    const navigate= useNavigate()
    const [credidentials, setCredidentials] = useState({
      username: undefined,
      password: undefined
    })



    const handleChange = (e) => {
      setCredidentials((prev) =>({ ...prev, [e.target.id]: e.target.value }) )
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault()
       

        try{
          const res= await axios({
            method: 'post',
            url: 'https://juzr-hotel-backend.onrender.com/api/auth/register',
            headers:{'Content-Type': 'application/json'}, 
            data: {
              email: credidentials.email,
              name: credidentials.name,
              surname: credidentials.surname,
              password: credidentials.password
            }
          })

          navigate("/signup/emailverification")
          console.log(res)
        }catch(err){
          console.log(err)
        }
        

            };
    return(
        <div className="bg-secondary w-100 h-100 ">
            <Header/>
            
            <Row className="pt-7 h-100 w-100">
                <Col sm={{}} className="mt-5 w-100 d-flex flex-column align-items-center justify-content-center ">
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-2'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white p-2 d-none d-lg-block rounded-4 mt-5 w-25 border">
                        <p className="fs-4 fw-bold text-center">Inscrivez-vous pour ensuite se connecter !</p>
                            <Form noValidate validated={validated} onSubmit={(e)=>handleSubmit(e)} className="p-3">
        
                                <Form.Group md="4" controlId="email">
                                    <Form.Label>Adresse e-mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="E-mail"
                                        
                                    />
                                </Form.Group>

                                
                                <Form.Group md="4" controlId="password">
                                  <Form.Label>Mot de passe</Form.Label>
                                  <Form.Control
                                      required
                                      type="password"
                                      onChange={handleChange}
                                      placeholder="Mot de passe"
                                      
                                  />
                                </Form.Group>

                                <Form.Group md="4" controlId="name">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Prénom"
                                    
                                />
                                
                                </Form.Group>
                                <Form.Group md="4" controlId="surname">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Nom"
                                    
                                />
                                
                                </Form.Group>
                                
                                
                                <div className="d-flex flex-column">
                                    
                                    <Button type="submit"  className="mt-3 text-white">Confirmer</Button>
                                </div>
                            
                            </Form>
                            <p className="fw-bold text-center">Déjà un compte ? <Link to={"/login"}>Se connecter</Link></p>
                        </div>
                        <div className="bg-white d-lg-none rounded-4 mt-5 border">
                            <p className="fs-4 p-2 fw-bold text-center">Inscrivez-vous pour ensuite se connecter !</p>
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3">
        
                                <Form.Group md="4" controlId="email">
                                    <Form.Label>Adresse e-mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="E-mail"
                                        
                                    />
                                </Form.Group>

                                <Form.Group md="4" controlId="password">
                                  <Form.Label>Mot de passe</Form.Label>
                                  <Form.Control
                                      required
                                      type="text"
                                      onChange={handleChange}
                                      placeholder="Mot de passe"
                                      
                                  />
                                </Form.Group>

                                <Form.Group md="4" controlId="name">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Prénom"
                                    
                                />
                                
                                </Form.Group>

                                <Form.Group md="4" controlId="surname">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Nom"
                                    
                                />
                                
                                </Form.Group>
                                
                                
                                <div className="d-flex flex-column">
                                    
                                    <Button type="submit" className="mt-3 text-white">Confirmer</Button>
                                </div>
                                
                            </Form>
                            <p className="fw-bold text-center">Déjà un compte ? <Link to={"/login"}>Se connecter</Link></p>
                            
                        </div>
        

                    
                </Col>
            </Row>
            
        </div>
        )
}