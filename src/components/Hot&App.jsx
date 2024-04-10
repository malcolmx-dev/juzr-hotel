import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Header from "./Header";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";







export default function Hot_App() {

    return(
        <div>
            <Header/>
            
         
                <div className="mt-5 w-100 d-flex flex-column p-1 align-items-center justify-content-center w-100 h-100 " height='1000px' >
                    
                        <h1 className=' text-uppercase text-dark fw-bold text-center mt-6'><span className=" bg-primary p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</h1>
                        <div className="bg-white shadow-sm p-2 d-none d-lg-block rounded-4 mt-5 w-25 p-3 border">
                            <p className="m-0 text-light fs-5"> <CgDanger /> Ces maisons/appartements ne sont uniquement disponibles pour une courte durée <br />
                                                          Une fois le séjour fini le lieu devra être en bonne état</p>
                            <Link to={"/type/AppartementMaison"} className=" fs-5  text-decoration-none text-end">Continuer <AiOutlineRight className="me-4" /> </Link>
                        </div>
                        <div className="bg-white shadow-sm p-2 d-lg-none rounded-4 mt-5  p-3 border">
                            <p className="m-0 text-light fs-5"> <CgDanger /> Ces maisons/appartements ne sont uniquement disponibles pour une courte durée <br />
                                                          Une fois le séjour fini le lieu devra être en bonne état</p>
                            <Link to={"/type/AppartementMaison"} className=" fs-5  text-decoration-none text-end">Continuer <AiOutlineRight className="me-4" /> </Link>
                        </div>
        

                    
                </div>

            
        </div>
        )
}