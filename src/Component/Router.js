import react from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "./Home";
import Searchproduct from "./Searchproduct";
import Login from "./Login";
import Signup from "./Signup";
import Mobile from "./Mobile/Mobile";
import MobileFilter from "./Mobile/MobileFilter";
import MobileDetails from "./Mobile/MobileDetails";
import Electronic from "./Electronics/Electronic";
import ElectronicsFilter from "./Electronics/ElectronicsFilter";
import ElectronicsDetails from "./Electronics/ElectronicsDetails";
import Men from "./Men/Men";
import MenFilter from "./Men/MenFilter";
import MenDetails from "./Men/MenDetail";
import Women from "./Women/Women";
import WomenFilter from "./Women/WomenFilter";
import WomenDetails from "./Women/WomenDetail";
import Kids from "./Kids/Kids";
import KidsFilter from "./Kids/KidsFilter";
import KidsDetails from "./Kids/KidsDetail";
import HomeAppliance from "./HomeAppliances/HomeAppliance";
import HomeApplianceFilter from "./HomeAppliances/HomeApplianceFilter";
import HomeApplianceDetails from "./HomeAppliances/HomeApplianceDetail";
import Cart from "./Cart";
import Payment from "./Payment";
import Orders from "./Orders";
import '../Styles/Router.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
class Router extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/searchproduct' element={<Searchproduct />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/mobile' element={<Mobile />} />
            <Route path='/mobile/filter' element={<MobileFilter />} />
            <Route path='/mobile/detail' element={<MobileDetails />} />
            <Route path='/electronics' element={<Electronic />} />
            <Route path='/electronics/filter' element={<ElectronicsFilter />} />
            <Route path='/electronics/detail' element={<ElectronicsDetails />} />
            <Route path='/men' element={<Men />} />
            <Route path='/men/filter' element={<MenFilter />} />
            <Route path='/men/detail' element={<MenDetails />} />
            <Route path='/women' element={<Women />} />
            <Route path='/women/filter' element={<WomenFilter />} />
            <Route path='/women/detail' element={<WomenDetails />} />
            <Route path='/kids' element={<Kids />} />
            <Route path='/kids/filter' element={<KidsFilter />} />
            <Route path='/kids/detail' element={<KidsDetails />} />
            <Route path='/home-appliances' element={<HomeAppliance />} />
            <Route path='/home-appliances/filter' element={<HomeApplianceFilter />} />
            <Route path='/home-appliances/detail' element={<HomeApplianceDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/order' element={<Orders />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default Router;