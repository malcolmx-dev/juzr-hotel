import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import useFetch from '../clients/features/get';
import { Placeholder } from 'react-bootstrap';

export default function PropertyList(){
    const {data, loading, error}=useFetch("https://juzr-hotel-backend.onrender.com/api/hotels/countByType")
    const image = [
        "https://www.momondo.fr/himg/3d/04/8d/ice-105211-67345087_3XL-067376.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/353470429.jpg?k=ca5a6d8cfb68a3caf5bd51b62fb3efc01911695653153cbee0816bd3f46b0935&o=&hp=1",
        "https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg",
        
    ]
    console.log(data)
    return(
        loading ? <Container className='my-5 bg-white'>
        
        <h3 className='text-center'>Choisissez en fonction du type</h3>
        <Row className='gy-5 mt-2'>
            {image.map((img, i)=> (
                <Col md={{ span: 3}}>
                    <Card as={Link} to={"/"} className="border-none" >
                    <Card.Img src={img} className='object-fit-cover' height="200px" width="100%"/>
                    
                    <Placeholder as={Card.Title} className='text-center' animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    
                    </Card>
                </Col>
          ))}

          

          
          </Row>
        
      </Container> :
        <Container className='my-5 bg-white'>
        
        <h3 className='text-center fw-bold text-primary'>Choisissez en fonction du type</h3>
        <Row className='gy-5 mt-2'>
            {data && image.map((img, i)=> (
                <Col md={{ span: 4}}>
                    <Card as={Link} to={data[i]?.type==="Appartement&Maison" ? `/type/Appartement&Maison/warning`:`/type/${data[i]?.type}`} className="border-none" >
                    <Card.Img src={img} className='object-fit-cover' height="200px" width="100%"/>
                    
                    <Card.Title className='text-center'>{data[i]?.type}</Card.Title>
                    
                    </Card>
                </Col>
          ))}

          

          
          </Row>
        
      </Container>
    )
}