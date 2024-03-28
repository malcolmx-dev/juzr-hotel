
import { Link, useParams } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"
import Header from "../../components/Header"
import useFetch from "../features/get"

function Images(){

    const hotelParams= useParams()
    const island= hotelParams.island
    const hotelId= hotelParams.hotelId
    const {data, loading, error}= useFetch(`https://juzr-hotel-backend.onrender.com/api/hotels/find/${hotelId}`)
    

 

    

    return(
        <div>
        <Header/>

            {loading ? <div></div> :
            <div className="pt-7">
                <div className="d-flex ms-3 mb-4"><Link to={`/hotel/${hotelId}`}><button  type="button" className="btn-close me-3" aria-label="Close"></button></Link><p className="fw-bold">{data?.name}</p></div>
                <Container>
                <Row>

                    {data?.photos.map((image, index) => (
                        
                            <Col sm={6} className="mb-5">
                                <img src={image} alt="" height="400px" width="100%" className="rounded shadow-sm object-fit-cover " />
                            </Col>

                    
                    ))}
                    </Row>

                </Container>
                
            </div>}
            </div>
    )
}
export default Images
