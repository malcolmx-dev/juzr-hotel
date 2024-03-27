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
        "https://www.nerienlouper.paris/wp-content/uploads/2018/05/photo-hotel-paris.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1",
        "https://previews.123rf.com/images/violin/violin1411/violin141100038/33232552-beach-bungalow-maldives-vacation-background.jpg",
        "https://www.abritel.fr/guides-voyage/wp-content/uploads/2mmpEhdL5C0AYwcgMQoeUw/f459a8afec33354ed0cb6a0cab8af04d/hotel-1209021.jpg"

    ]
    console.log(data)
    return(
        loading ? <Container className='my-5 bg-white'>
        
        <h3 className='text-center'>Choisissez en fonction du type</h3>
        <Row className='gy-5 mt-2'>
            {image.map((img, i)=> (
                <Col md={{ span: 3}}>
                    <Card as={Link} to={"/hotel"} className="border-none" >
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
        
        <h3 className='text-center'>Choisissez en fonction du type</h3>
        <Row className='gy-5 mt-2'>
            {data && image.map((img, i)=> (
                <Col md={{ span: 3}}>
                    <Card as={Link} to={"/hotel"} className="border-none" >
                    <Card.Img src={img} className='object-fit-cover' height="200px" width="100%"/>
                    
                    <Card.Title className='text-center'>{data[i]?.type}</Card.Title>
                    
                    </Card>
                </Col>
          ))}

          

          
          </Row>
        
      </Container>
    )
}