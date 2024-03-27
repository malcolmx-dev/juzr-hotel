import { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import Sort from '../../components/Sort';
import Unknown from '../data/unknown.png'
import { SearchContest } from '../utils/SearchContext';
import  useFetch  from '../features/get';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';





function SearchList(){
    const location = useLocation()
    const [destination, setDestination] = useState(location.state?.destination)
    const [dates, setDates] = useState(location.state?.dates );
    const [options, setOptions] = useState(location.state?.options)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)



    console.log(destination)

    


      const handleChange = e => {
        const { name, value } = e.target;
        setOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const {data, loading, error, refreshData}=useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels?city=${destination}&min=${min||0}&max=${max||60000}`)
    
    const {dispatch} = useContext(SearchContest)
    

      const navigate = useNavigate()
      const handleSearch = () => {
        dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
          navigate(`/hotels/${destination}`)
          refreshData()
      }

    const hotelParams= useParams()
    const island= hotelParams.island
    

   console.log(island)

    
    return(
        <div>
            <Header refreshData={refreshData}/>
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
                <Container className='rounded bg-warning'>
            <div className='d-flex flex-column p-3'>
                <h3 className='fw-bold mb-3'>Search</h3>
                <div className="d-flex flex-column mb-1">
                   <p className='m-0 fs-6 fw-bold'>Destination</p>
                   <input type="text" placeholder={destination} className='text-center ' onChange={e=> setDestination(e.target.value)} /> 
                </div>
                <div className="d-flex flex-column mb-2">
                   <p className='m-0 fs-6 fw-bold'>Date d'arrivée</p>
                   <Dropdown className='bg-white text-center'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {`${format(dates[0].startDate, "dd/MM/yyyy")} à ${format(dates[0].endDate, "dd/MM/yyyy")}`}
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
                </div>
                <div className="d-flex flex-column mb-1">
                   <p className='m-0 mb-3 fs-6 fw-bold'>Options</p>
                   <div className='d-flex justify-content-between mb-3'>
                        <p className='m-0 f-6 text-secondary'>Prix min par nuit (en €)</p>
                        <input type="number" min={0} onChange={e=> setMin(e.target.value)} className='rounded w-25' />
                   </div>
                   <div className='d-flex justify-content-between mb-3'>
                        <p className='m-0 f-6 text-secondary'>Prix max par nuit (en €)</p>
                        <input type="number" min={0} onChange={e=> setMax(e.target.value)} className='rounded w-25' />
                   </div>
                   <div className='d-flex justify-content-between mb-3'>
                        <p className='m-0 f-6 text-secondary'>Adulte</p>
                        <input type="number" min={1} className='rounded w-25' placeholder={options.adult} name='adult' onChange={e=> handleChange(e)} />
                   </div>
                   <div className='d-flex justify-content-between mb-3'>
                        <p className='m-0 f-6 text-secondary'>Enfants</p>
                        <input type="number" min={0} className='rounded w-25' placeholder={options.children} name='children' onChange={e=> handleChange(e)} />
                   </div>
                   <div className='d-flex justify-content-between mb-3 '>
                        <p className='m-0 f-6 text-secondary'>Chambres</p>
                        <input type="number" min={1} className='rounded w-25' placeholder={options.room} name='room' onChange={e=> handleChange(e)} />
                   </div>
                   <Button className='h-100 bg-primary text-center text-white' onClick={()=>handleSearch()}>Search</Button>
                </div>

            </div>
        </Container>
                </Col>
                
                <Col sm={{span:4, offset: 2}} xs={{span:12}} >   
                {data.map((profile, index) => (
                        
                        
                        
                            
                            
                                <Card as={Link} to={`/hotel/${profile.island}/${profile._id}`} className='mb-5 shadow w button text-decoration-none' key={index}>
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

export default SearchList