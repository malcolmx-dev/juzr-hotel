import { Col, Container, Row } from "react-bootstrap";
import UserComponent from "../../components/User";
import Header from "../../components/Header";


export default function Login() {
    return(
        <div className="bg-secondary w-100 h-100 ">
            <Header/>
            
            <Row className="pt-7 h-100 w-100">
                <Col sm={{}} className="mt-5 w-100 d-flex flex-column align-items-center justify-content-center ">
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-2'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white d-none d-lg-block rounded-4 mt-5 w-25 border"><UserComponent/></div>
                        <div className="bg-white d-lg-none rounded-4 mt-5 border"><UserComponent/></div>

                    
                </Col>
            </Row>
            
        </div>
        )
}