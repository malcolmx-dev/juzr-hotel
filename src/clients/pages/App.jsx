import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import CarouselSlide1 from '../data/carousel/1.jpg'
import CarouselSlide2 from '../data/carousel/2.jpg'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Islands from '../../components/Islands';
import PropertyList from '../../components/PropertyList';
import Footer from '../../components/Footer';




function App() {
  
  
  return (
    
    
    <div>
      <Header/>
      <Carousel className='mt-7 pb-4 px-4'>
        <Carousel.Item>
        <Image src={CarouselSlide1} text="First slide" className=' w-100 d-inline-block object-fit-cover'  width="100%" />
          <Carousel.Caption className='d-none d-md-block'>
          <h3>Réservez dès maintenant</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className=''>
          <Image src={CarouselSlide2} text="First slide" className=' w-100  d-inline-block object-fit-cover'  width="100%" />

        </Carousel.Item>
      </Carousel>

      <Islands/>
      <PropertyList/>
      <Footer/>

      
      </div>
   
  );
}

export default App;
