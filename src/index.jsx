import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './clients/pages/App'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './clients/sass/index.scss'
import HotelList from './clients/pages/HotelList';
import Hotel from './clients/pages/Hotel';
import Images from './clients/pages/Images';
import Login from './clients/pages/Login';
import Admin from './admin/pages/Admin';
import CreateHotel from './admin/pages/Hotel';
import SearchList from './clients/pages/SearchList';
import { SearchContextProvider} from './clients/utils/SearchContext';
import { AuthContextProvider } from './clients/utils/AuthContext';
import LogOut from './clients/pages/LogOut';
import Signup from './clients/pages/Signup';
import Hot_App from './components/Hot&App';
import HotelListType from './clients/pages/HotelListType';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter basename={process.env.REACT_APP_URI}>
  
  
    <AuthContextProvider>
      <SearchContextProvider>
      
        <Routes>

          <Route exact path='/' element={<App/>} />
          <Route exact path='/hotels/:destination' element={<SearchList/>} />
          <Route exact path='/island/:island' element={<HotelList/>} /> 
          <Route exact path='/hotel/:hotelId' element={<Hotel/>} />
          <Route exact path='/hotel/:hotelId/images' element={<Images/>} />
          <Route exact path='/type/:type' element={<HotelListType/>} />
          <Route exact path='/type/Appartement&Maison/warning' element={<Hot_App/>} />
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/logout' element={<LogOut/>}/>
          <Route exact path='/admin/:userId' element={<CreateHotel/>}/>
          <Route exact path='/admin/:userId/:hotelId' element={<Admin/>}/>

        </Routes>
        
      </SearchContextProvider>
    </AuthContextProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
