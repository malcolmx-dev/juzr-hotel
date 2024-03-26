import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { DateRange } from 'react-date-range';
import { FaCalendarAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContest } from '../clients/utils/SearchContext';



export default function Search() {
    const [destination, setDestination]= useState("")
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [options, setOptions] = useState({
        adult:2,
        children:2,
        room:1
      })
      const handleChange = e => {
        const { name, value } = e.target;
        setOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const {dispatch} = useContext(SearchContest)

    const navigate = useNavigate()
    const handleSearch = () => {
        dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
        navigate( `/hotels/${destination}`, { state: {destination, dates, options} } )
    }
    
    

    return(
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
                        <p className='m-0 f-6 text-secondary'>Prix min par nuit</p>
                        <input type="number" className='rounded w-25' />
                   </div>
                   <div className='d-flex justify-content-between mb-3'>
                        <p className='m-0 f-6 text-secondary'>Prix max par nuit</p>
                        <input type="number" className='rounded w-25' />
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
        
    )
}