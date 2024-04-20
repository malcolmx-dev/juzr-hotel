
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardMoheli from '../clients/data/card/moheli.jpg'
import CardAnjouan from '../clients/data/card/anjouan.jpg'
import CardComore from '../clients/data/card/gr_comore.jpg'
import { Link } from 'react-router-dom';
import Unknown from '../clients/data/unknown.png'
import useFetch from '../clients/features/get';
import { Placeholder } from 'react-bootstrap';

export default function Islands(){
    const photos= ["https://media-cdn.tripadvisor.com/media/photo-c/1280x250/05/51/11/b3/nioumachoua-beach.jpg","https://media-cdn.tripadvisor.com/media/photo-s/02/2a/89/a9/filename-moya-comores.jpg","https://media-cdn.tripadvisor.com/media/photo-c/1280x250/0f/63/53/ae/le-trous-du-prophete.jpg"]
    const {data, loading, error}=useFetch("https://juzr-hotel-backend.onrender.com/api/hotels/countByIsland?islands=Ngazidja,Moheli,Anjouan")
    return(
        loading? 
        <div className='py-5 bg-secondary '>
        <Container >
        
        <h3 className='text-center text-primary'>Choisissez quelle sera votre destination</h3>
        <Row className='gy-5 mt-2'>
            <Col md={{ span: 4}}>
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
            <Col md={{ span: 4}}> 
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
            <Col md={{ span: 4}}> 
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
        
        </Container>
        </div>:
        <div className='py-5 bg-secondary '>
        <Container >
        
        <h3 className='text-center text-primary fw-bold'>Choisissez quelle sera votre destination</h3>
        <Row className='gy-5 mt-2'>
          <Col md={{ span: 4}}>
            <Card as={Link} to={"/island/Moheli"} className="bg-dark text-white" >
                <Card.Img src={photos[0]} />
                <Card.ImgOverlay>
                    <div class="position-absolute bottom-0 start-0  w-100 rounded py-lg-1" >
                        <Card.Title className='m-0 p-0 ms-4 fs-2 fw-bold'>Moheli</Card.Title>
                        <Card.Text className='m-0 ms-4 mb-3 fs-4 '>{data[1]} hotels disponibles</Card.Text>
                    </div>
                </Card.ImgOverlay>
            </Card>
          </Col>

          <Col md={{ span: 4}}>
            <Card as={Link} to={"/island/Anjouan"} className="bg-dark text-white" >
                <Card.Img className='d-none d-xl-block' src={photos[1]} height='275px'  />
                <Card.Img className='d-none d-xl-none d-lg-block' src={photos[1]} height='196px'  />
                <Card.Img className='d-none d-lg-none d-md-block' src={photos[1]} height='145px'  />
                <Card.Img className='d-md-none' src={photos[1]}  />
                <Card.ImgOverlay>
                    <div class="position-absolute bottom-0 start-0  w-100 rounded py-lg-1" >
                        <Card.Title className='m-0 p-0 ms-4 fs-2 fw-bold'>Anjouan</Card.Title>
                        <Card.Text className='m-0 ms-4 mb-3 fs-4 '>{data[2]} hotels disponibles</Card.Text>
                    </div>
                </Card.ImgOverlay>
            </Card>
          </Col>
        
        
          <Col md={{ span: 4}}>
          
            <Card as={Link} to={"/island/Ngazidja"} className="bg-dark text-white">
                <Card.Img src={photos[2]}/>
                <Card.ImgOverlay>
                    <div class="position-absolute bottom-0 start-0  w-100 rounded py-lg-1" >
                        <Card.Title className='m-0 p-0 ms-4 fs-2 fw-bold'>Grande-Comore</Card.Title>
                        <Card.Text className='m-0 ms-4 mb-3 fs-4 '>{data[0]} hotels disponibles</Card.Text>
                    </div>
                </Card.ImgOverlay>
            </Card>
            
          </Col>
          </Row>
        
      </Container>
      </div>
    )
}