import { TbArrowsDownUp } from "react-icons/tb";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom";

function Sort(){


     return(
    <Dropdown className=" text-center mb-5">
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-white shadow-sm rounded border">
      <TbArrowsDownUp/> Sort by: nos meilleurs prix
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Nos meilleurs prix</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Prix ordre croissant</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Prix ordre décroissant</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>)
    
}

export default Sort