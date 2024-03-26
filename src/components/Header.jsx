import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { IoLocationOutline } from "react-icons/io5";
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { VscAccount, Vsc } from "react-icons/vsc";
import { FaBed, FaCalendarAlt } from "react-icons/fa";
import { MdMan } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Dropdown, Nav, Navbar, Row } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import { SearchContest } from '../clients/utils/SearchContext';
import { AuthContest } from '../clients/utils/AuthContext';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineLogout } from 'react-icons/ai';
import useFetch from '../clients/features/get';


function Header(){
    const [destination, setDestination]= useState("")
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [options, setOptions] = useState({
        adult:2,
        children:2,
        room:1
      })
    const [openDestination, setOpenDestination]= useState(false)
    const [openSearch, setOpenSearch]= useState(false)
    const [openUser, setOpenUser]= useState(false)

    const {user}= useContext(AuthContest)

    const {data, loading, error, refreshData}=useFetch(`http://localhost:3000/api/hotels/search/${destination}`)
    
     

    
    const handleOptions= (name, action) => {
        setOptions(prev => {return{
            ...prev, [name]: action === "i" ? options[name] + 1 : options[name] - 1,
        }})
    }

    const {dispatch} = useContext(SearchContest)

    const navigate = useNavigate()
    const handleSearch = () => {
        
        dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
        navigate( `/hotels/${destination}`, {state: {destination, dates, options}} )
    }

    const handleChange = (e) => {
        setDestination(e.target.value)
        refreshData()
        setOpenDestination(true)
    }
    const changeValue = (city) => {
        document.getElementById("destination").value=city
        if (document.getElementById("destination-md")) {
            document.getElementById("destination-md").value=city
        }
        setDestination(city)
        setOpenDestination(false)
        
    }


   

    return(
        <div>
            
                <Container fluid className='bg-primary border-bottom pb-5'>
                    
                    <Row>
                    <Navbar expand="md" className="navbar-light " >
                        <Col>
                            <Navbar.Brand as={Link} to={'/'} className='nav-link text-uppercase text-white fw-bold ms-2'>
                                <span className=" bg-white p-1 text-center rounded-3 text-black m-1">Juzr </span> Hotel
                            </Navbar.Brand>
                        </Col>
                        <Col xs={{ offset: 4}} md={{ offset: 8}}>
                            {user ? 
                                    <div className='d-flex'>
                                        <p className='text-white fs-4' style={{cursor:'pointer'}} onClick={()=> openUser ?setOpenUser(false):setOpenUser(true)}>{user.username}</p>
                                        {openUser ?
                                            <div  className='bg-white py-1 ms-3 mt-1 text-center rounded shadow-lg w-50 h-100'>
                                                <Link to={'/logout'} className='text-primary text-decoration-none m-0'><AiOutlineLogout className='mb-1' /> LogOut</Link>
                                            </div>: 
                                            null
                                        }
                                    </div>

                                    
                                   
                                :
                                
                            <Nav className='basic-navbar-nav'>
                                
                                <VscAccount className='d-md-none'  />
                                <Nav.Item className='active'>
                                    <Nav.Link as={Link} className='d-none d-md-block text-white'><Button variant="outline-white">Sign Up </Button></Nav.Link>
                                </Nav.Item>
                                <Nav.Item className=''>
                                    <Nav.Link as={Link} to={'/login'} className='d-none d-md-block text-white'><Button variant="outline-white">Login </Button></Nav.Link>
                                </Nav.Item>
                            </Nav>}
                        </Col>
                    </Navbar>
                    </Row>
                    <div className='d-none d-md-block'>
                        <Row className=' d-flex bg-white text-light w-75 mt-4 p-2 text-center align-items-center border border-warning border-3 z-1 position-absolute top-15 start-50 translate-middle-x'>
                            
                            <Col md={3} className='border-end border-warning border-3'>
                            <FaBed className='me-1 mb-1'/><input type="text" autocomplete="off" id='destination' placeholder='Où voyages-tu ?' onChange={e=>{ handleChange(e)}} className='text-center shadow-none w-50 border-0 outline-primary' />
                            
                            </Col>
                            <Col md={3} className='border-end border-warning border-3' >
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <FaCalendarAlt className='me-1 mb-1  '  /> {`${format(dates[0].startDate, "dd/MM/yyyy")} à ${format(dates[0].endDate, "dd/MM/yyyy")}`}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={item => setDates([item.selection])}
                                                moveRangeOnFirstSelection={true}
                                                ranges={dates}
                                                
                                            />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md={4} className='border-end border-warning border-3' >
                            <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <MdMan className='me-1 mb-1' />{`${options.adult} adultes · ${options.children} enfants · ${options.room} chambre`}
                                    </Dropdown.Toggle>
                                        <Dropdown.Menu className='w-100 p-3 mt-1 shadow-sm'>

                                            <Container className=''>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <p className=''>Adulte</p>
                                                <div className='border '>
                                                    <Button disabled={options.adult <= 1} className='border-0 me-2 mb-1 text-primary bg-white rounded-0  h-100' onClick={()=> handleOptions("adult", "d")}>-</Button>
                                                    {options.adult}
                                                    <Button className='border-0 ms-1 mb-1 text-center text-primary bg-white rounded-0  h-100'onClick={()=> handleOptions("adult", "i")}>+</Button>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <p className=''>Enfants</p>
                                                <div className='border '>
                                                    <Button disabled={options.children <= 0} className='border-0 me-2 mb-1 text-primary bg-white rounded-0 h-100' onClick={()=> handleOptions("children", "d")}>-</Button>
                                                    {options.children}
                                                    <Button className='border-0 ms-1 mb-1 text-center text-primary bg-white rounded-0  h-100' onClick={()=> handleOptions("children", "i")}>+</Button>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <p className=''>Chambres</p>
                                                <div className='border '>
                                                    <Button disabled={options.room <= 1} className='border-0 me-2 mb-1 text-primary bg-white rounded-0 h-100' onClick={()=> handleOptions("room", "d")}>-</Button>
                                                    {options.room}
                                                    <Button className='border-0 ms-1 mb-1 text-center text-primary bg-white rounded-0 h-100' onClick={()=> handleOptions("room", "i")}>+</Button>
                                                </div>
                                            </div> 
                                            <div>
                                                <Button className='w-100  mt-3' variant="outline-primary">Terminer</Button>
                                                
                                            </div>    
                                            </Container>                                       
                                        </Dropdown.Menu>
                                </Dropdown>
                            
                            </Col>
                            <Col md={{ span: 2}} >
                            <Button className='text-white h-100 w-100' onClick={()=>handleSearch()} >Search</Button>
                            
                            </Col>
                        </Row>
                    </div>
                    
                    {openSearch ?
                    <div className='d-md-none d-flex justify-content-center mb-7'>
                    <Button className="btn-close border border-black rounded-circle z-2" 
                            style={{position: 'absolute', left:"40px", top:"88px"}} variant='outline-white'
                            onClick={() => setOpenSearch(false)} ></Button>
                            
                        <Row className=' d-flex bg-white text-light mt-4 w-75 p-3 text-center align-items-center border border-warning border-3  position-absolute top-15 '>
                            <Col md={3} className='border-bottom border-warning border-3'>
                            <FaBed className='me-1 mb-1'/><input type="text" autocomplete="off" style={{"fontSize": "14px"}} id='destination-md' placeholder='Où voyages-tu ?' onChange={e=>{ handleChange(e)}}  className='text-center shadow-none w-75 border-0 pb-2 outline-primary' />
                            
                            </Col>
                            <Col md={3} className='border-bottom border-warning border-3' >
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex justify-content-center py-2 px-2'>
                                        <p className='m-0 ' style={{"fontSize": "14px"}}><FaCalendarAlt className='me-1 mb-1  '  /> {`${format(dates[0].startDate, "dd/MM/yyyy")} à ${format(dates[0].endDate, "dd/MM/yyyy")}`}</p>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={item => setDates([item.selection])}
                                                moveRangeOnFirstSelection={true}
                                                ranges={dates}
                                                
                                                
                                            />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md={4} className='border-bottom border-warning border-3' >
                            <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex px-0 py-2'>
                                        <p className='m-0' style={{"fontSize": "12px"}}><MdMan className='me-1 mb-1' />{`${options.adult} adultes · ${options.children} enfants · ${options.room} chambre`}</p>
                                    </Dropdown.Toggle>
                                        <Dropdown.Menu className='w-100 p-3 mt-1 shadow-sm'>

                                            <Container className='w-100 p-1'>
                                            <div className='d-flex justify-content-between  mb-2'>
                                                <p className='m-0'>Adulte</p>
                                                <div className='border p-0'>
                                                    <Button disabled={options.adult <= 1} className='border-0 p-1 me-2 mb-1 text-primary bg-white rounded-0  h-100' onClick={()=> handleOptions("adult", "d")}>-</Button>
                                                    {options.adult}
                                                    <Button className='border-0 ms-1 p-1 mb-1 text-center text-primary bg-white rounded-0  h-100'onClick={()=> handleOptions("adult", "i")}>+</Button>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <p className='m-0'>Enfants</p>
                                                <div className='border '>
                                                    <Button disabled={options.children <= 0} className='border-0 p-1 me-2 mb-1 text-primary bg-white rounded-0 h-100' onClick={()=> handleOptions("children", "d")}>-</Button>
                                                    {options.children}
                                                    <Button className='border-0 p-1 ms-1 mb-1 text-center text-primary bg-white rounded-0  h-100' onClick={()=> handleOptions("children", "i")}>+</Button>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <p className='m-0'>Chambres</p>
                                                <div className='border '>
                                                    <Button disabled={options.room <= 1} className='border-0 p-1 me-2 mb-1 text-primary bg-white rounded-0 h-100' onClick={()=> handleOptions("room", "d")}>-</Button>
                                                    {options.room}
                                                    <Button className='border-0 p-1 ms-1 mb-1 text-center text-primary bg-white rounded-0 h-100' onClick={()=> handleOptions("room", "i")}>+</Button>
                                                </div>
                                            </div> 
                                            <div>
                                                <Button className='w-100  mt-3' variant="outline-primary">Terminer</Button>
                                                
                                            </div>    
                                            </Container>                                       
                                        </Dropdown.Menu>
                                </Dropdown>
                            
                            </Col>
                            <Col md={{ span: 2}} >
                            <Button className='text-white h-100 w-100 mt-3' onClick={()=>handleSearch()} >Search</Button>
                            
                            </Col>
                        </Row>
                    </div>: 
                    <div className=' d-flex justify-content-center text-light ms-4 mt-4 w-75 align-items-center position-absolute '>
                        <Button className='border border-black mt-1 bg-white rounded-circle' variant='outline-black' onClick={()=> setOpenSearch(true)}> <IoIosArrowDown /> </Button>
                    </div>
}  
                        

                    
            
                </Container>
                {openDestination && data ? 
                                <div>
                                    <div className='d-none d-md-block bg-white shadow-lg py-2 w-25 border border-2 z-2' style={{position: 'absolute', left:"190px", top:"145px"}}>
                                        {data.map((item) => 
                                        <div className='d-flex mb-2' style={{cursor:'pointer'}} onClick={()=> changeValue(item.city)}>
                                            <span className='h-100 m-2 '><IoLocationOutline className='fs-2' /></span>
                                            <div className='d-flex flex-column justify-content-center'>
                                                
                                                <p className='fw-bold m-0'>{item.city}</p>
                                                <p className='fw-light m-0' style={{"fontSize": "14px"}}>{item.island}</p>
                                            </div>
                                        </div>
                                        
                                        )}
                                    </div>
                                    <div className='bg-white d-md-none shadow-lg pb-2 w-50 border border-2 z-2' style={{position: 'absolute', left:"50px", top:"145px"}}>
                                    {data.map((item) => 
                                    <div className='d-flex pt-2 border mb-2' style={{cursor:'pointer'}} onClick={()=> changeValue(item.city)}>
                                        <span className='h-100 m-2 '><IoLocationOutline className='fs-2' /></span>
                                        <div className='d-flex flex-column justify-content-center'>
                                            
                                            <p className='fw-bold m-0'>{item.city}</p>
                                            <p className='fw-light m-0' style={{"fontSize": "14px"}}>{item.island}</p>
                                        </div>
                                    </div>
                                    
                                    )}
                                </div>
                            </div>
                            : null}
            
            
        </div>
    )
}
export default Header