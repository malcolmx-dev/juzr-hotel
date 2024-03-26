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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter basename={process.env.PUBLIC_URL}>
  
  <Router>
    <AuthContextProvider>
      <SearchContextProvider>
      
        <Routes>

          <Route exact path='/' element={<App/>} />
          <Route exact path='/hotels/:destination' element={<SearchList/>} />
          <Route exact path='/hotel/:island' element={<HotelList/>} />
          <Route exact path='/hotel/:island/:hotelId' element={<Hotel/>} />
          <Route exact path='/hotel/:island/:hotelId/images' element={<Images/>} />
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/logout' element={<LogOut/>}/>
          <Route exact path='/admin/:userId' element={<CreateHotel/>}/>
          <Route exact path='/admin/:userId/:hotelId' element={<Admin/>}/>

        </Routes>
        
      </SearchContextProvider>
    </AuthContextProvider>
  </Router>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
