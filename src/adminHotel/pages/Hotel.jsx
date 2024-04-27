import { Col, Form, InputGroup, Row } from "react-bootstrap";
import HotelForm from "../../components/Hotel";
import Header from "../../components/Header";

export default function CreateHotel(){
    return(
        <div>
            <Header/>
            <Row className="pt-7 m-0 bg-secondary mh-100 w-100" style={{height: '100%'}}>
                <Col sm={{ span: 8, offset: 2}} className="mt-5 ">
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-2'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white shadow-sm rounded-4 mt-5 border p-4"><HotelForm/></div>
                    
                </Col>
            </Row>
        </div>
    )
}