import { Col, Row } from "react-bootstrap";
import UserComponent from "../../components/User";
import Header from "../../components/Header";


export default function Login() {
    return(
        <div>
            <Header/>
            <Row className="pt-7 bg-secondary mh-100 w-100" style={{height: '700px'}}>
                <Col sm={{ span: 4, offset: 4}} className="mt-5 ">
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-2'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white rounded-4 mt-5 border"><UserComponent/></div>
                    
                </Col>
            </Row>
        </div>
        )
}