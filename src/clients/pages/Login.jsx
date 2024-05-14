import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UserComponent from "../../components/User";
import Header from "../../components/Header";

import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContest } from "../utils/AuthContext";
import axios from "axios";






export default function Login() {
    const [validated, setValidated] = useState(false);
    const [cookie, setCookie]= useCookies()
    const navigate= useNavigate()
    const [credidentials, setCredidentials] = useState({
      password: undefined
    })

    const {loading, error, dispatch}= useContext(AuthContest)

    const handleChange = (e) => {
      setCredidentials((prev) =>({ ...prev, [e.target.id]: e.target.value }) )
      console.log(credidentials)
    }
    

    const handleSubmit = async (event) => {
      console.log(credidentials)
       
    
        event.preventDefault();
        dispatch({type: "LOGIN_START"})
        try{
          const res= await axios({
            method: 'post',
            url: 'https://juzr-hotel-backend.onrender.com/api/auth/login',
            headers:{'Content-Type': 'application/json'}, 
            data: {
              email: credidentials.email,
              password: credidentials.password
            }
          })
            let expires = new Date()
            expires.setTime(expires.getTime() + (3600*1000))
            setCookie('access_token', res?.data.access_token, { path: '/',  expires})
        

          dispatch({type: "LOGIN_SUCCES", payload: res.data})
          navigate("/")
        }catch(err){
          dispatch({type: "LOGIN_ERROR", payload: err.response.data})
          console.log(err)
        }
        

            };
    return(
        <div className="bg-secondary w-100 h-100 ">
            <Header/>
            
            <Row className="pt-7 h-100 w-100">
                <Col sm={{}} className="mt-5 w-100 d-flex flex-column align-items-center justify-content-center ">
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-2'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white d-none d-lg-block p-2 rounded-4 mt-5 w-25 border">
                            <p className="fs-4 fw-bold text-center">Connectez-vous pour vous enregistrer sur notre site et réserver !</p>
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
                                      type="password"
                                      onChange={handleChange}
                                      placeholder="Mot de passe"
                                      
                                  />
                                </Form.Group>
                                
                                
                                <div className="d-flex flex-column">
                                    {error && <span className="text-danger text-center">{error.message}</span>}
                                    <Button type="submit" disabled={loading} className="mt-3 text-white">Confirmer</Button>
                                </div>
                            
                            </Form>
                        </div>
                        <div className="bg-white d-lg-none rounded-4 mt-5 border">
                        <p className="fs-4 fw-bold text-center">Connectez-vous pour vous enregistrer sur notre site et réserver !</p>
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
                                      type="password"
                                      onChange={handleChange}
                                      placeholder="Mot de passe"
                                      
                                  />
                                </Form.Group>
                                
                                
                                <div className="d-flex flex-column">
                                    {error && <span className="text-danger text-center">{error.message}</span>}
                                    <Button type="submit" disabled={loading} className="mt-3 text-white">Confirmer</Button>
                                </div>
                            
                            </Form>
                        </div>
        

                    
                </Col>
            </Row>
            
        </div>
        )
}