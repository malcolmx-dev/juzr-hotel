import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../../components/Header";
import { Link } from "react-router-dom";


export default function EmailVer() {
    
    return(
        <div>
            <Header/>
            
            
            <div className='d-flex flex-column align-items-center justify-content-center mt-7 '>
                <p className='fw-bold fs-3 text-center'>Un e-mail vous a été envoyé, veuillez confirmer votre adresse mail afin de vous connecter ! <br /> Connectez-vous <Link to={'/login'}>ici</Link> </p>
            </div>
            
        </div>
        )
}