import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"


import { Badge, Button, Card, Carousel, Col, Container, Dropdown, Image, Nav, Row } from "react-bootstrap"
import { AiFillStar, AiOutlineRight } from "react-icons/ai";
import { LuFlower2 } from "react-icons/lu";
import { FaCalendarAlt, FaParking } from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";
import Header from "../../components/Header"
import useFetch from "../features/get"
import { SearchContest } from "../utils/SearchContext";
import { AuthContest } from "../utils/AuthContext";
import Reserve from "../../components/Reserve";
import { DateRange } from "react-date-range";
import axios from "axios"
import { format } from "date-fns";
import { FaBellConcierge, FaCheck, FaDumbbell, FaUmbrellaBeach } from 'react-icons/fa6';
import { MdBathroom, MdBedroomParent, MdLocalActivity, MdOutlineLock, MdOutlineRestaurantMenu } from 'react-icons/md';
import { IoInformationCircle } from 'react-icons/io5';

function Hotel() {
    const hotelParams= useParams()
    const hotelId= hotelParams.hotelId
    const [dataRoom, setDataRoom]= useState()
    const [fillRoom, setFillRoom]= useState()
    const [selectedRoom, setSelectedRoom] = useState()
    const [roomFound, setRoomFound] = useState()



    

    const [date, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    var {dates, options}= useContext(SearchContest)
    const {user}= useContext(AuthContest)

    useEffect(() => {
        isAllow()
        setRoomFound(roomFoundList)
      }, [dataRoom])
    
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    function dayDifference(date1, date2){
        const timeDiff= Math.abs(date2.getTime()-date1.getTime())
        const diffDays= Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return diffDays
    }
    
    var days =dates ? dayDifference(dates[0]?.endDate, dates[0]?.startDate): undefined
  
    const [openModal, setOpenModal]= useState(false)
    


    const navigate= useNavigate()
    const {dispatch} = useContext(SearchContest)

    const handleClick= () => {
        if((dates)||((date[0].startDate-date[0].endDate !==0))){
            if(user){
                if(date[0].startDate-date[0].endDate !==0){
                    dates= date
                }
                dispatch({type: "NEW_SEARCH", payload: {dates}})
                console.log(dates)
                setOpenModal(true)
                console.log(openModal)
    
            }else{
                navigate("/signup")
            } 
        }else{
            alert("Saisissez vos dates !")
        }
        
        
    }
    
    var color="rgba(0, 0, 0, 0.5)"

    const [active, setActive] = useState('#');

    

    const {data, loading, error}= useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels/find/${hotelId}`)

    useEffect(() => {
        async function fetchMyAPI(){
            const res = await fetch(`https://juzr-hotel-backend.onrender.com/api/rooms`).then((res) => res.json())
            setDataRoom(res)
        }
        fetchMyAPI()
      }, [loading])

    var roomId= []
    var roomAvaibility= []
    var roomFoundList= []
    const isAllow= () => {
        var isFound
        
        dataRoom?.map((room) => 
            room.roomNumbers.map((roomNumbers) =>
                roomNumbers.unavailableDates.map((element) => {
                    if(element[1]===user.name+" "+user.surname){
                        isFound= true
                        roomAvaibility= element
                        roomId= roomNumbers._id
                        roomFoundList= room
                        days= element[0].length
                    }
                   
                    
            })))
        
        return !isFound
    }
    const cancelReservation= async() => {
        
        roomAvaibility.push(true)
        var broomAvaibility= []
        roomAvaibility.forEach((e) => e!==true && broomAvaibility.push(e))
           
            try{
                await axios({
                    method: 'put',
                    url: `https://juzr-hotel-backend.onrender.com/api/rooms/availability/cancel/${roomId}`,
                    data:{
                        dates:roomAvaibility,
                        idd: broomAvaibility
                    }
                })
            alert("Votre requête est envoyé veuillez patienter un moment")
            navigate("/")
  
          }catch(err){
              console.log(error)
          }}
        
    
    console.log(isAllow())
    
        
      
    
    



    return(
        <div>
            <Header/>
{loading || !dataRoom ?<p></p> :   
            <div className="bg-secondary ">
                <Container className="py-5">

                    <section >

                        <Row className=" mb-1">
                            <Col sm={{offset:2, span:8}} className="rounded shadow-sm  bg-white p-3">
                                
                                <Link to={`/island/${data?.island}`}  ><BsArrowLeftCircle className="me-2"/>Revenir au choix des hotels</Link>

                                
                            </Col>
                            
                        </Row>

                        

                        <Row className="d-flex justify-content-center bg-white rounded ">

                            <Col sm={2} className="bg-secondary ">
                            
                            </Col>

                            <Col as={Link} to={`/hotel/${hotelId}/images`} lg= {4} className="p-0 d-none d-lg-block">

                                <img src={data?.photos[3]} alt="" className="object-fit-cover  h-100 pt-1 pe-1 "height="175px" width="100%" />

                            </Col>

                            <Col as={Link} to={`/hotel/${hotelId}/images`} lg={2} className="d-flex flex-column p-0 d-none d-lg-block">
                            
                            <img src={data?.photos[1]} alt="" className="object-fit-cover my-1  " height="175px" width="100%"/>
                            <img src={data?.photos[0]} alt="" className="object-fit-cover  " height="175px" width="100%"/>

                            </Col>
                            
                            <Col as={Link} to={`/hotel/${hotelId}/images`} sm={8} lg={2} className="d-flex flex-column p-0   " >

                            
                            <Carousel className=' d-lg-none'>
                                    {data?.photos.map((hotel, index) =>( 
                                        <Carousel.Item key={index}>
                                            <Image src={hotel} text="First slide" className='object-fit-cover' height='200px' width="100%"  />
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

                            <Col sm= {2} className="bg-secondary ">
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
                                    <p className="mt-4" > {data?.desc} </p>
                                    <ul className="list-unstyled d-flex">
                                        

                                            
                                    </ul>
                                </div>
                                
                                
                            </Col>
                            <Col sm={4} className="d-flex flex-column">
                                
                                    
                                    <Link><img  src={data?.photos[5]} alt="" className="ratio ratio-16x9 ms-sm-2 rounded mt-2 "/></Link>
                                    <p className="ms-2 m-0 mb-4 fw-light text-black">{data.adress}, {data.city}</p>

                               

                            </Col>

                            <Col sm={{span:2}} className="bg-secondary"></Col>    
                        
                        </Row>

                    </section>
                    <section id="reservation">
                        <Row className="bg-white rounded mt-1">
                            <Col sm={2} className="bg-secondary">
                            
                            </Col>
                            <Col className="mt-4 mb-4">
                                
                                    <h2 className="text-center ">Réservation</h2>
                                
                            </Col>
                            <Col sm={2} className="bg-secondary">
                                
                            
                            </Col>
                        </Row>
                        <Row className="bg-white">
                        <Col sm={2} className="bg-secondary ">
                            
                            </Col>

                            <Col as={Link} to={`/hotel/${hotelId}/images`} lg= {4} className="ps-3 pb-3 d-none d-lg-block ">

                                
                                <Carousel >
                                    {data?.photos.map((img, index) =>( 
                                        <Carousel.Item key={index}>
                                            <Image src={img} text="First slide" className='rounded pt-1 pe-1' height='335px' width="100%"  />
                                        </Carousel.Item>
                                    ))}
                                    

                                </Carousel>

                            </Col>
                            
                            {isAllow() ?
                                <Col className='d-flex justify-content-center'>
                                {dates ?
                                
                                    <div className="rounded d-flex flex-column align-items-center justify-content-between bg-primary bg-opacity-25 w-75   p-3">
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
                                        <p className="fs-4 px-3 text-center "> <span className="fw-bold ">{days*data.cheapestPrice }€</span>({days} nuits)</p>
                                        <Button className=' bg-primary text-center text-white w-75 m-2 ' onClick={()=>handleClick()}>Réservez maintenant!</Button>
                                    </div>:
                                    <div className="rounded px-3 py-1 d-flex flex-column align-items-center justify-content-between bg-primary bg-opacity-25 w-75  ms-5 mt-1">
                                        <Dropdown >
                                            <Dropdown.Toggle variant="success" id="dropdown-basic" className='d-flex justify-content-center bg-white border border-warning border-3 '>
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
                                        <h4 className="p-3 fs-5 text-center ">Parfait pour un séjour de qualité  <span className="fw-bold fs-5 mt-1">· Saisissez vos dates</span></h4>
                                        <Button className=' bg-primary text-center text-white w-75 m-2 ' onClick={()=>handleClick()} >Réservez maintenant!</Button>
                                    </div>}

                                </Col>:
                                <Col className='d-flex justify-content-center'>
                                
                                    <div className={`rounded d-flex flex-column align-items-center justify-content-between bg-danger bg-opacity-25 p-3`}>
                                        
                                        <h4 className='p-3 text-center'>Veuillez terminer votre séjour avant d'en renouveler un nouveau</h4>
                                        <p className="fs-6 mb-2 text-center px-3 m-0">Terminez votre séjour avant d'en redémarrer un nouveau ou bien annulez votre réservation avec votre hotel ci-dessous</p>
                                        <p className="fs-6 px-3 text-center text-danger fw-bold "> Attention, vous ne pouvez annuler qu'un nombre limité de fois votre séjour au risque d'être banni de notre site</p>
                                        <Button className=' bg-danger text-center text-white w-75 m-2 ' onClick={()=> !roomAvaibility.includes(true) ? setOpenModal(true):alert('Votre demande est en cours de traitement')}>Annuler la réservation</Button>
                                    </div>
    
                                </Col>}
                            <Col sm={2} className="bg-secondary">
                            
                            </Col>
                        </Row>
                    </section>
                    {data?.equipments[0] &&
                    <section id="equipement">
                        <Row className="bg-white rounded mt-1">
                            <Col sm={2} className="bg-secondary">
                            
                            </Col>
                            <Col className="mt-4 mb-4">
                                
                                    <h2 className="text-center ">Equipements</h2>
                                
                            </Col>
                            <Col sm={2} className="bg-secondary ">
                                
                            
                            </Col>
                        </Row>
                        <Row className="bg-white">
                        <Col sm={2} className="bg-secondary ">
                            
                            </Col>

                            <Col className="d-flex flex-column">
                                           { (data?.equipments[0].bathroom[0]===""|| !data?.equipments[0].bathroom[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><MdBathroom /> Salle de bains</p>
                                                <div>{data?.equipments[0].bathroom.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                              }
                                            { (data?.equipments[0].vue[0]===""|| !data?.equipments[0].vue[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><FaUmbrellaBeach /> Vue</p>
                                                <div>{data?.equipments[0].vue.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                              }
                                            { (data?.equipments[0].outside[0]===""|| !data?.equipments[0].outside[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><LuFlower2 /> En extérieur</p>
                                                <div>{data?.equipments[0].outside.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                              }                
                                            { (data?.equipments[0].bedroom[0]===""|| !data?.equipments[0].bedroom[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><MdBedroomParent />Équipements en chambre</p>
                                                <div>{data?.equipments[0].bedroom.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                              }                      
                                              
                                                                
                                        </Col>
                                        <Col className="d-flex flex-column">
                                        { (data?.equipments[0].activities[0]===""|| !data?.equipments[0].activities[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><MdLocalActivity />Activités</p>
                                                <div>{data?.equipments[0].activities.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                        }
                                        { (data?.equipments[0].reception[0]===""|| !data?.equipments[0].reception[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><FaBellConcierge />Réception</p>
                                                <div>{data?.equipments[0].reception.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                        }
                                        { (data?.equipments[0].restaurant[0]===""|| !data?.equipments[0].restaurant[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><MdOutlineRestaurantMenu />Restauration</p>
                                                <div>{data?.equipments[0].restaurant.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                        }

                                            <p className="fw-bold text-primary fs-5">{data?.equipments[0].internet && <FaCheck /> + "Internet"}</p>
                                               
                                                                
                                                                
                                        </Col>
                                        <Col className="d-flex flex-column">
                                        { (data?.equipments[0].security[0]===""|| !data?.equipments[0].security[0]) ? null:
                                            <div>
                                                <p className="fw-bold  fs-5"><MdOutlineLock /> Sécurité</p>
                                                <div>{data?.equipments[0].security.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                        }
                                        { (data?.equipments[0].general[0]===""|| !data?.equipments[0].general[0]) ? null:
                                            <div>
                                                <p className="fw-bold  fs-5"><IoInformationCircle /> Général</p>
                                                <div>{data?.equipments[0].general.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                        }
                                        { (data?.equipments[0].health[0]===""|| !data?.equipments[0].health[0]) ? null:
                                            <div>
                                                <p className="fw-bold fs-5"><FaDumbbell /> Bien-être</p>
                                                <div>{data?.equipments[0].health.map((element => <p className=""><FaCheck />{element}</p>))}</div>
                                            </div>
                                        }

                                            <p className="fw-bold  fs-5">{data?.equipments[0].parking && <FaCheck /> + "Parking"}</p>
                                              
                                        </Col>
                            <Col sm={2} className="bg-secondary ">
                            
                            </Col>
                        </Row>
                    </section>}

                </Container>
                
            </div>}
            {isAllow() ? openModal && <Reserve setOpen={setOpenModal} hotelId={hotelId} days={days} hotel={data.name} />: openModal && <Reserve setOpen={setOpenModal} hotelId={hotelId} days={days} cancelRoom={roomFound} handleCancel={cancelReservation}  />}
        </div>                                               
    )
    
}
export default Hotel