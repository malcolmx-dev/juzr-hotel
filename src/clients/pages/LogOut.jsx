import { Button, Col, Row } from "react-bootstrap";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContest } from "../utils/AuthContext";

export default function LogOut(){
    const navigate = useNavigate()
    const {dispatch}= useContext(AuthContest)
    const handleSubmit = () =>{
        dispatch({type: "LOG_OUT"})
        navigate("/")
        }
    return(
    <div>
        <Header/>
            <Row className="pt-7 bg-secondary mh-100 w-100" style={{height: '700px'}}>
                <Col sm={{ span: 4, offset: 4}} className="mt-5 ">
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-2'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white p-3 rounded-4 mt-5 border">
                            <p className="fs-3 fw-bold text-center">Êtes vous sûr de vouloir vous déconnectez ?</p>
                            <div className="d-flex justify-content-center mt-5">
                                <Button className="bg-primary fw-bold me-5 text-white" onClick={() => handleSubmit()}>Oui</Button>
                                <Button className="bg-primary fw-bold ms-5 text-white" onClick={() => navigate('/')}>Non</Button>
                            </div>
                        </div>
                    
                </Col>
            </Row>
        </div>    )
}