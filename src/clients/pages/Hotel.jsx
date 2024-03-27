import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"


import { Badge, Button, Card, Carousel, Col, Container, Dropdown, Image, Nav, Row } from "react-bootstrap"
import { AiFillStar, AiOutlineRight } from "react-icons/ai";
import { GrSwim } from "react-icons/gr";
import { PiFlowerTulipFill } from "react-icons/pi";
import { BiRestaurant, BiWifi } from "react-icons/bi";
import { FaCalendarAlt, FaParking } from "react-icons/fa";
import { BsArrowLeftCircle, BsSnow } from "react-icons/bs";
import Header from "../../components/Header"
import useFetch from "../features/get"
import { SearchContest } from "../utils/SearchContext";
import { AuthContest } from "../utils/AuthContext";
import Reserve from "../../components/Reserve";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

function Hotel() {
    const hotelParams= useParams()
    const hotelId= hotelParams.hotelId
    const island= hotelParams.island

    const [date, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    var {dates, options}= useContext(SearchContest)
    const {user}= useContext(AuthContest)
    
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    function dayDifference(date1, date2){
        const timeDiff= Math.abs(date2.getTime()-date1.getTime())
        const diffDays= Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return diffDays
    }
    const days =dates ? dayDifference(dates[0]?.endDate, dates[0]?.startDate): undefined
    const [openModal, setOpenModal]= useState(false)
    


    const navigate= useNavigate()
    const {dispatch} = useContext(SearchContest)

    const handleClick= () => {
        if(!dates){
            dates= date
        
        
            dispatch({type: "NEW_SEARCH", payload: {dates}})
            console.log(dates)
            }
        
        if(user){
            setOpenModal(true)
            console.log(openModal)

        }else{
            navigate("/login")
        }
    }
    
    var color="rgba(0, 0, 0, 0.5)"

    const [active, setActive] = useState('#');

    

    const {data, loading, error}= useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels/find/${hotelId}`)
    
    



    return(
        <div>
            <Header/>
{loading ?<p></p> :   
            <div className="bg-secondary ">
                <Container className="py-5">

                    <section >

                        <Row className=" mb-1">
                            <Col sm={{offset:2, span:8}} className="rounded shadow-sm  bg-white p-3">
                                {island === 'undefined' ?(
                                <Link to={`/hotels`}  ><BsArrowLeftCircle className="me-2"/>Revenir au choix des hotels</Link>) : (

                                <Link to={`/hotel/${island}`}  ><BsArrowLeftCircle className="me-2"/>Revenir au choix des hotels</Link>) }
                            </Col>
                            
                        </Row>

                        

                        <Row className="d-flex justify-content-center bg-white rounded ">

                            <Col sm={2} className="bg-secondary d-none d-lg-block">
                            
                            </Col>

                            <Col as={Link} to={`/hotel/${island}/${hotelId}/images`} lg= {4} className="p-0 d-none d-lg-block">

                                <img src={data?.photos[3]} alt="" className="object-fit-cover  h-100 pt-1 pe-1 "height="175px" width="100%" />

                            </Col>

                            <Col as={Link} to={`/hotel/${island}/${hotelId}/images`} lg={2} className="d-flex flex-column p-0 d-none d-lg-block">
                            
                            <img src={data?.photos[1]} alt="" className="object-fit-cover my-1  " height="175px" width="100%"/>
                            <img src={data?.photos[0]} alt="" className="object-fit-cover  " height="175px" width="100%"/>

                            </Col>
                            
                            <Col as={Link} to={`/hotel/${island}/${hotelId}/images`} sm={6} lg={2} className="d-flex flex-column p-0   " >

                            
                            <Carousel className=' d-lg-none'>
                                    {data?.photos.map((hotel, index) =>( 
                                        <Carousel.Item key={index}>
                                            <Image src={hotel} text="First slide" className='object-fit-cover' height='150px' width="100%"  />
                                        </Carousel.Item>
                                    ))}
                                    

                                </Carousel>
                            <img src={data?.photos[4]} alt="" className="object-fit-cover ms-1 my-1 h-100 d-none d-lg-block " height="175px" width="100%"/>
                            
                            <Card  className="bg-dark text-white rounded-0 d-none d-lg-block" >
                                <Card.Img src={data?.photos[2]} className="object-fit-cover ms-1 rounded-0 " height="175px" width="100%" />
                                <Card.ImgOverlay className="d-flex align-items-center w-100 h-100 rounded-0 ms-1" style={{backgroundColor: `${color}`}}>
                                <Card.Title className='text-center'>Afficher toutes les photos</Card.Title>
                                </Card.ImgOverlay>
                            </Card>

                            </Col>

                            <Col sm= {2} className="bg-secondary d-none d-lg-block">
                            </Col>

                        </Row>

                        <Row>
                            <Col sm={{offset:2, span:8}} className="shadow-sm  bg-white  ">
                                <Nav variant="underline" activeKey={active} onSelect={(selected)=> setActive(selected)} className="ms-1" >
                                    <Nav.Item >
                                        <Nav.Link eventKey="#" className={`${active==="#" ? "text-primary" : "text-black"}`}>Présentation</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#reservation" className={`${active==="#reservation" ? "text-primary" : "text-black"}`}>Réservation</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#equipement" className={`${active==="#equipement" ? "text-primary" : "text-black"}`}>Equipements</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                        </Row>

                    </section>
                    <section>

                        <Row className="bg-white">

                            <Col sm={2} className="bg-secondary"></Col>
                            

                            <Col sm={{span:4}} className="mt-1  d-flex justify-content-between">
                                
                                <div className="d-flex flex-column ms-2 ">
                                    <p className="fw-light m-0 mt-2 ">Hôtel professionnel</p>
                                    <h1 className="fs-3 m-0 ">Hôtel {data?.name}</h1>
                                    <div className="d-flex"><AiFillStar /></div>
                                    <div className="d-flex align-items-center mt-3"><Badge className=" border m-0">{data?.note}</Badge><p className="mb-0 ms-2 fw-bold fs-5">{data?.note > 8 ? "Merveilleux" : null} </p> </div>
                                    <Link>Afficher l'integralité des avis <AiOutlineRight className="h-50"/></Link>
                                    <p className="mt-4 fw-bold fs-5" > Equipement populaires </p>
                                    <ul className="list-unstyled d-flex">
                                        

                                            
                                    </ul>
                                </div>
                                
                                
                            </Col>
                            <Col sm={4} className="d-flex flex-column">
                                
                                    
                                    <Link><img  src={data?.photos[5]} alt="" className="ratio ratio-16x9 ms-sm-2 rounded mt-2 "/></Link>
                                    <p className="ms-2 m-0 mb-4 fw-light text-black">{data.adress}, {data.city}</p>
                                    <Link className="ms-2">Afficher la carte <AiOutlineRight className="h-50"/></Link>

                               

                            </Col>

                            <Col sm={{span:2}} className="bg-secondary"></Col>    
                        
                        </Row>

                    </section>
                    <section id="reservation">
                        <Row className="bg-white rounded mt-1">
                            <Col sm={2} className="bg-secondary d-none d-lg-block ">
                            
                            </Col>
                            <Col className="mt-4 mb-4">
                                
                                    <h2 className="text-center ">Réservation</h2>
                                
                            </Col>
                            <Col sm={2} className="bg-secondary d-none d-lg-block">
                                
                            
                            </Col>
                        </Row>
                        <Row className="bg-white">
                        <Col sm={2} className="bg-secondary d-none d-lg-block">
                            
                            </Col>

                            <Col as={Link} to={`/hotel/${island}/${hotelId}/images`} lg= {4} className="ps-3 pb-3 ">

                                
                                <Carousel className='d-none d-lg-block'>
                                    {data?.photos.map((img, index) =>( 
                                        <Carousel.Item key={index}>
                                            <Image src={img} text="First slide" className='rounded pt-1 pe-1' height='335px' width="100%"  />
                                        </Carousel.Item>
                                    ))}
                                    

                                </Carousel>

                            </Col>
                            
                            <Col>
                            {dates ?
                            
                                <div className="rounded d-flex flex-column justify-content-between bg-primary bg-opacity-25 w-75  ms-5  p-3">
                                    <Dropdown >
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex justify-content-center bg-white border border-warning border-3 w-100 py-2 px-2'>
                                            <p className='m-0 ' ><FaCalendarAlt className='me-1 mb-1  '  /> {`${format(date[0].startDate, "dd/MM/yyyy")} à ${format(date[0].endDate, "dd/MM/yyyy")}`}</p>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                            
                                                <DateRange
                                                    editableDateInputs={true}
                                                    onChange={item => setDates([item.selection])}
                                                    moveRangeOnFirstSelection={true}
                                                    ranges={date}
                                                    
                                                    
                                                />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <h4 className='p-3'>Parfait pour un séjour de {days} nuits</h4>
                                    <p className="fs-6 mb-2 px-3 m-0">Localisée près de la foret de Wala, où on retrouve les plus belles plages de la région</p>
                                    <p className="fs-4 px-3 "> <span className="fw-bold ">{days*data.cheapestPrice }€</span>({days} nuits)</p>
                                    <Button className=' bg-primary text-center text-white w-75 ms-5 m-2 ' onClick={()=>handleClick()}>Réservez maintenant!</Button>
                                </div>:
                                <div className="rounded p-3 d-flex flex-column justify-content-between bg-primary bg-opacity-25 w-75  ms-5 mt-1">
                                    <Dropdown >
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex justify-content-center bg-white border border-warning border-3 w-100 py-2 px-2'>
                                            <p className='m-0 ' ><FaCalendarAlt className='me-1 mb-1  '  /> {`${format(date[0].startDate, "dd/MM/yyyy")} à ${format(date[0].endDate, "dd/MM/yyyy")}`}</p>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                            
                                                <DateRange
                                                    editableDateInputs={true}
                                                    onChange={item => setDates([item.selection])}
                                                    moveRangeOnFirstSelection={true}
                                                    ranges={date}
                                                    
                                                    
                                                />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <h4 className="p-3 fs-5 ">Parfait pour un séjour de qualité  <span className="fw-bold fs-5 mt-1">· Saisissez vos dates</span></h4>
                                    <p className="fs-6 mb-2 px-3 m-0">Localisée près de la foret de Wala, où on retrouve les plus belles plages de la région</p>
                                    <Button className=' bg-primary text-center text-white w-75 ms-5 m-2 ' onClick={()=>handleClick()} >Réservez maintenant!</Button>
                                </div>}

                            </Col>
                            <Col sm={2} className="bg-secondary d-none d-lg-block">
                            
                            </Col>
                        </Row>
                    </section>

                </Container>
                
            </div>}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={hotelId} days={days}/>}
        </div>                                               
    )
    
}
export default Hotel