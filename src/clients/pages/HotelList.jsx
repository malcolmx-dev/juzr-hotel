import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import Sort from '../../components/Sort';
import Unknown from '../data/unknown.png'
import Search from '../../components/Search';
import  useFetch  from '../features/get';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { TbArrowsDownUp } from 'react-icons/tb';
import axios from 'axios';





function HotelList(){

    const hotelParams= useParams()
    const island= hotelParams.island
    const [dataSort, setDataSort]= useState()
    const {data, loading, error}=useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels?island=${island}`)

    const handleSort= async(order2)=> {
        const res= await axios.get(`https://juzr-hotel-backend.onrender.com/api/hotels/sort/island/${island}/${order2}`)
        setDataSort(res.data)
    } 

   

    
    return(
        <div>
            <Header disabled={true}/>
            <div className='bg-secondary pt-7'>
                <Container >
                <Row>
                    <Col  sm={{ span: 4, offset: 5}} >
                        <Dropdown className=" text-center mb-5">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-white shadow-sm rounded border">
                            <TbArrowsDownUp/> Sort by: (Filtrez par)
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item  onClick={()=> handleSort("croissant")}>Prix ordre croissant</Dropdown.Item>
                                <Dropdown.Item  onClick={()=> handleSort("decroissant")}>Prix ordre décroissant</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                </Container>
                <Container >
                
                
                {loading ? (
                <Row>
                    <Col sm={{span:4, offset: 4}}>
                        <Card className='mb-5'>
                            <Card.Img variant="top" src={Unknown} style={{height: '200px'}} />
                            <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={{span:4, offset: 4}}>
                        <Card className='mb-5'>
                            <Card.Img variant="top" src={Unknown} style={{height: '200px'}} />
                            <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            
                            </Card.Body>
                        </Card>
                    </Col>  
                </Row>
        ):(
            
            <Row>
                
                <Col sm={3} className='d-none d-md-block'>
                    <Search />
                </Col>
                
                <Col sm={{span:4, offset: 2}} xs={{span:12}} >   
                {!dataSort ? data.map((profile, index) => (               
                            
                                <Card as={Link} to={`/hotel/${profile._id}`} className='mb-5 shadow w button text-decoration-none' key={index}>
                                    <Card.Img variant="top" src={profile.photos[0]} />
                                    <Card.Body>
                                        <div className='d-flex '>
                                            <Card.Title className='fw-bold'>{profile.name}</Card.Title>
                                            <p className='ms-3 px-1 border border-black border-2 rounded fs-6 fw-bold'>{profile.type}</p>
                                        </div>
                                        <Card.Text>{profile.desc}</Card.Text>
                                    </Card.Body>
                                </Card>
               
                    )): dataSort.map((profile, index) => (
   
                        <Card as={Link} to={`/hotel/${profile._id}`} className='mb-5 shadow w button text-decoration-none' key={index}>
                            <Card.Img variant="top" src={profile.photos[0]} />
                            <Card.Body>
                                <div className='d-flex '>
                                    <Card.Title className='fw-bold'>{profile.name}</Card.Title>
                                    <p className='ms-3 px-1 border border-black border-2 rounded fs-6 fw-bold'>{profile.type}</p>
                                </div>
                                <Card.Text>{profile.desc}</Card.Text>
                            </Card.Body>
                        </Card>

            ))}
                    </Col>
                </Row>
                
            )
    }
            </Container>
            </div>
        </div>
            
        
    )
}

export default HotelList