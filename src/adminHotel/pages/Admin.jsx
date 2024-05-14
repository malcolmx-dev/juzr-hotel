import { Nav, Navbar } from "react-bootstrap";
import { AiFillDashboard, AiOutlineLogout } from "react-icons/ai";
import { MdBedroomParent } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

import { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Rooms from "../components/Rooms";
import Reservation from "../components/Reservation";

export default function Admin(){
    const [dashboard, setDasboard] = useState(true)
    const [reservation, setReservation] = useState(false)
    const [rooms, setRooms] = useState(false)
    return(
        <div>
            
            <div className="bg-secondary d-flex h-100 border">
                <Nav defaultActiveKey="/home" className=" border flex-column ps-2 pe-2 h-100">
                    <Navbar.Brand href="#home" className='nav-link text-uppercase text-center text-black fs-3 fw-bold mt-3 border-bottom pb-4'><span className=" bg-primary bg-gradient p-1 text-center rounded-3 text-white m-1">Juzr </span> Hotel</Navbar.Brand>
                    <p className="text-light fw-bold m-0 mt-2 ms-1 mb-1">Main</p>
                    <Nav.Link onClick={()=>{setDasboard(true); setRooms(false); setReservation(false)}} className="text-light fs-5 border-bottom pb-4"><AiFillDashboard className="mb-1 " /> Dashboard</Nav.Link>
                        
                    
                    <p className="text-light fw-bold m-0 mt-2 ms-1 mb-1">List</p>
                    <Nav.Link onClick={()=>{setRooms(true); setDasboard(false); setReservation(false)}} className="text-light fs-5 "><MdBedroomParent className="mb-1 fs-6 me-1" />Rooms</Nav.Link>
                    <Nav.Link onClick={()=>{setReservation(true); setDasboard(false); setRooms(false)}} className="text-light fs-5 border-bottom pb-4"><FaRegCalendarAlt className="mb-1  fs-6 me-1" />Calendar</Nav.Link>


                    
                    <Nav.Link as={Link} to={"/"} className="text-light fs-5 pb-4"><AiOutlineLogout className="mb-1 me-1 fs-6"/>Logout</Nav.Link>


                </Nav>
                {dashboard ? (
                        <div className="bg-white d-flex border w-100 h-100 justify-content-center">
                            <Dashboard/>
                        </div>): null}
                {rooms ? (
                    <div className="bg-white d-flex border w-100 h-100 justify-content-center">
                            <Rooms/>
                    </div>):null
                }
                {reservation ? (
                    <div className="bg-white d-flex border w-100 h-100 justify-content-center">
                            <Reservation/>
                    </div>):null
                }
            </div>
        </div>
    )
}