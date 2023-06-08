import "./App.css";

// Tables and infoforms
import Content from "./components/Orders/Content";
import Pendingorders from "./components/Orders/Pendingorders";
import Inprogressorders from "./components/Orders/Inprogressorders";
import Undermakingorders from "./components/Orders/Undermakingorders";
import Enrouteorders from "./components/Orders/Enrouteorders";
import Completedorders from "./components/Orders/Completedorders";
import Deletedorders from "./components/Orders/Deletedorders";
import Paidorders from "./components/Orders/Paidorders";
import Unpaidorders from "./components/Orders/Unpaidorders";
import Infoform from "./components/Modals/Infoform";
import InfoItem from "./components/Modals/InfoCategory";
import Additemform from "./components/Items/Additemform";
import Getitem from "./components/Items/GetCategory";
import Scamorders from "./components/Orders/Scamorders";
import ReturnOrders from "./components/Orders/ReturnOrders";
import UpdateNews from "./components/News/UpdateNews";
import AddNews from "./components/News/AddNews";
import GetAllItems from "./components/Items/GetAllItems";
//Structure
import Navbar from "./components/Body/Navbar";
import Sidebar from "./components/Body/Sidebar";
import Footer from "./components/Body/Footer";
//Authentication
import Login from "./components/Auth/Login";
import Recoverpassword from "./components/Auth/Recoverpassword";
import Register from "./components/Auth/Register";
import Forgotpassword from "./components/Auth/Forgotpassword";
import Error from "./components/Body/Error";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import AddCategory from "./components/Items/AddCategory";
import GenerateOrder from "./components/Orders/GenerateOrder";
import SearchOrders from "./components/Orders/SearchOrders";

ReactModal.setAppElement("#root");

function App() {
  const [login, setLogin] = useState(true);

  const SetLocalLogin = async () => {
    try {
      let userLogin = await localStorage.getItem("logIN");
      let parsed = JSON.parse(userLogin);
      if (parsed !== null) {
        setLogin(parsed);
      }
    } catch {
      return null;
    }
  };

  useEffect(() => {
    SetLocalLogin();
  }, []);

  return (
    <div className="wrapper">
      {login === false ? (
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/Recoverpassword" element={<Recoverpassword />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Forgotpassword" element={<Forgotpassword />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/SearchOrders" element={<SearchOrders />} />
            <Route path="/Pendingorders" element={<Pendingorders />} />
            <Route path="/Inprogressorders" element={<Inprogressorders />} />
            <Route path="/Undermakingorders" element={<Undermakingorders />} />
            <Route path="/Enrouteorders" element={<Enrouteorders />} />
            <Route path="/Completedorders" element={<Completedorders />} />
            <Route path="/Deletedorders" element={<Deletedorders />} />
            <Route path="Paidorders" element={<Paidorders />} />
            <Route path="/Unpaidorders" element={<Unpaidorders />} />
            <Route path="/Additemform" element={<Additemform />} />
            <Route path="/Infoform" element={<Infoform />} />
            <Route path="/Getitem" element={<Getitem />} />
            <Route path="/Scamorders" element={<Scamorders />} />
            <Route path="/ReturnOrders" element={<ReturnOrders />} />
            <Route path="/InfoItem" element={<InfoItem />} />
            <Route path="/AddNews" element={<AddNews />} />
            <Route path="/UpdateNews" element={<UpdateNews />} />
            <Route path="/AddCategory" element={<AddCategory />} />
            <Route path="/GenerateOrder" element={<GenerateOrder />} />
            <Route path="/GetAllItems" element={<GetAllItems />} />

            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
