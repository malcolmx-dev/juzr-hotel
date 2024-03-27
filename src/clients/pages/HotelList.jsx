import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Col, Container, Row } from 'react-bootstrap';
import Sort from '../../components/Sort';
import Unknown from '../data/unknown.png'
import Search from '../../components/Search';
import  useFetch  from '../features/get';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';





function HotelList(){

    const hotelParams= useParams()
    const island= hotelParams.island
    const {data, loading, error}=useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels?island=${island}`)

   

    
    return(
        <div>
            <Header/>
            <div className='bg-secondary pt-7'>
                <Container >
                <Row>
                    <Col  sm={{ span: 4, offset: 5}} >
                        <Sort />
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
                {data.map((profile, index) => (
                        
                        
                        
                            
                            
                                <Card as={Link} to={`/hotel/${island}/${profile._id}`} className='mb-5 shadow w button text-decoration-none' key={index}>
                                    <Card.Img variant="top" src={profile.photos[0]} />
                                    <Card.Body>
                                        <Card.Title>{profile.name}</Card.Title>
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