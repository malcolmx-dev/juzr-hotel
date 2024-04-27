import { Button, Col, Container, Form, Row } from "react-bootstrap";
import UserComponent from "../../components/User";
import Header from "../../components/Header";


import Cookies from 'universal-cookie';

import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContest } from "../../clients/utils/AuthContext";






export default function LoginAdmin() {
    const [validated, setValidated] = useState(false);
    const [cookie, setCookie]= useCookies()
    const navigate= useNavigate()
    const cookies = new Cookies();
    const [credidentials, setCredidentials] = useState({
      username: undefined,
      password: undefined
    })


    const handleChange = (e) => {
      setCredidentials((prev) =>({ ...prev, [e.target.id]: e.target.value }) )
    }
    const {loading, error, dispatch}= useContext(AuthContest)


    const handleSubmit = async (event) => {
      console.log(credidentials)
       
    
        event.preventDefault();
        dispatch({type: "LOGIN_START"})
        
        try{
          const res= await axios({
            method: 'post',
            url: 'https://juzr-hotel-backend.onrender.com/api/authAdmin/login',
            headers:{'Content-Type': 'application/json'}, 
            data: {
              username: credidentials.username,
              password: credidentials.password,

            }
          })
            let expires = new Date()
            expires.setTime(expires.getTime() + (3600*1000))
            cookies.set('access_token', res?.data.access_token, { path: '/',  expires});

        
            dispatch({type: "LOGIN_SUCCES", payload: res.data})
        if(res.data.hotelId !== null){
            navigate(`/admin/${res.data._id}/${res.data.hotelId}`)
            
        }
        if(res.data.isBoss){
          navigate(`/devAdmin/${res.data._id}`)
        }else{
          navigate(`/admin/${res.data._id}`)}
        
        }catch(err){
          dispatch({type: "LOGIN_ERROR", payload: err.response.data})

        }
        

            };
    return(
        <div className="bg-secondary w-100 h-100 ">
            <Header/>
            
            <Row className="pt-7 h-100 w-100">
                <Col sm={{}} className="mt-5 w-100 d-flex flex-column align-items-center justify-content-center ">
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-2'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white d-none d-lg-block p-2 rounded-4 mt-5 w-25 border">
                            
                            <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3">
        
                                <Form.Group md="4" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Username"
                                    
                                />
                                
                                </Form.Group>
                                <Form.Group md="4" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    
                                />
                                
                                </Form.Group>
                                
                                
                                <div className="d-flex flex-column">
                                    {error && <span className="text-danger text-center">{error.message}</span>}
                                    <Button type="submit"  className="mt-3 text-white">Confirmer</Button>
                                </div>
                            
                            </Form>
                        </div>
                        
                        
        

                    
                </Col>
            </Row>
            
        </div>
        )
}