import './App.css';

// Tables and infoforms
import Content from './components/Content';
import Pendingorders from './components/Pendingorders';
import Inprogressorders from './components/Inprogressorders';
import Undermakingorders from './components/Undermakingorders';
import Enrouteorders from './components/Enrouteorders';
import Completedorders from './components/Completedorders';
import Deletedorders from './components/Deletedorders';
import Paidorders from './components/Paidorders';
import Unpaidorders from './components/Unpaidorders';
import Infoform from './components/Infoform';
import InfoItem from './components/InfoItem'
import Additemform from './components/Additemform';
import Getitem from './components/Getitem'
import Scamorders from './components/Scamorders';
import ReturnOrders from './components/ReturnOrders';
import AddNews from './components/AddNews';
import UpdateNews from './components/UpdateNews';

//Structure
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
//Authentication
import Login from './components/Login';
import Recoverpassword from './components/Recoverpassword';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';
import Error from './components/Error'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'AsyncStorage';

import ReactModal from 'react-modal';


ReactModal.setAppElement('#root')
function App() {
  const [login, SetLogin] = useState(true);

  const SetLocalLogin = async () => {
    try {
      let userLogin = await AsyncStorage.getItem('logIN');
      let parsed = JSON.parse(userLogin);
      if (parsed !== null) {
        SetLogin(parsed);
      }
    } 
    catch {
      return null;
    }
  }

  useEffect(() => {
    SetLocalLogin()
  }, [])


  return (
    <div className='wrapper'>
      {
        login === false ?

          <Router>
            <Routes>
              < Route path='/' exact element={<Login />} />
              < Route path='/Recoverpassword' element={<Recoverpassword />} />
              < Route path='/Register' element={<Register />} />
              < Route path='/Forgotpassword' element={<Forgotpassword />} />

            </Routes>
          </Router>

          :

          <Router>
            <Navbar />
            <Sidebar />
            <Routes>
              < Route path='/' element={<Content />} />
              < Route path='/Pendingorders' element={<Pendingorders />} />
              < Route path='/Inprogressorders' element={<Inprogressorders />} />
              < Route path='/Undermakingorders' element={<Undermakingorders />} />
              < Route path='/Enrouteorders' element={<Enrouteorders />} />
              < Route path='/Completedorders' element={<Completedorders />} />
              < Route path='/Deletedorders' element={<Deletedorders />} />
              < Route path='Paidorders' element={<Paidorders />} />
              < Route path='/Unpaidorders' element={<Unpaidorders />} />
              < Route path='/Additemform' element={<Additemform />} />
              < Route path='/Infoform' element={<Infoform />} />
              < Route path='/Getitem' element={<Getitem />} />
              < Route path='/Scamorders' element={<Scamorders />} />
              < Route path='/ReturnOrders' element={<ReturnOrders />} />
              < Route path='InfoItem' element={<InfoItem />} />
              < Route path='AddNews' element={<AddNews />} />
              < Route path='UpdateNews' element={<UpdateNews />} />

              < Route path='*' element={<Error />} />
            </Routes>
            <Footer />

          </Router>

      }
    </div>
  );
}

export default App;
