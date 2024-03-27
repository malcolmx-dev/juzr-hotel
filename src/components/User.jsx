
import { useContext, useState } from "react";
import { Col, Form, InputGroup, Row, Button} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContest } from "../clients/utils/AuthContext";
import axios from "axios";



export default function UserComponent(){
    const [validated, setValidated] = useState(false);
    const [cookie, setCookie]= useCookies()
    const navigate= useNavigate()
    const [credidentials, setCredidentials] = useState({
      username: undefined,
      password: undefined
    })

    const {loading, error, dispatch}= useContext(AuthContest)

    const handleChange = (e) => {
      setCredidentials((prev) =>({ ...prev, [e.target.id]: e.target.value }) )
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
              username: credidentials.username,
              password:credidentials.password // This is the body part
            }
          })
            let expires = new Date()
            expires.setTime(expires.getTime() + (3600*1000))
            setCookie('access_token', res?.data.access_token, { path: '/',  expires})
        

        if(res.data.isAdmin){
            navigate(`/admin/${res._id}`)
        }
          dispatch({type: "LOGIN_SUCCES", payload: res.data})
          navigate("/")
        }catch(err){
          dispatch({type: "LOGIN_ERROR", payload: err.response.data})
        }
        

            };
  
    return (
      <div>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3">
          
            <Form.Group md="4" controlId="username">
              <Form.Label>Identifiant</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={handleChange}
                placeholder="Username"
                
              />
            
            </Form.Group>
            <Form.Group  md="4"  controlId="password" className="mt-2">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={handleChange}
                placeholder="Password"
                
              />
              
            </Form.Group>
            
          <div className="d-flex flex-column">
            {error && <span className="text-danger text-center">{error.message}</span>}
            <Button type="submit" disabled={loading} className="mt-3 text-white">Confirmer</Button>
          </div>
          
        </Form>
      </div>
    );
}