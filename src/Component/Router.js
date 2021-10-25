import react from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "./Home";
import searchproduct from "./searchproduct";
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
import { BrowserRouter, Route } from "react-router-dom";
class Router extends react.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation />
          <Route exact path='/' component={Home} />
          <Route exact path='/searchproduct' component={searchproduct} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/mobile' component={Mobile} />
          <Route exact path='/mobile/filter' component={MobileFilter} />
          <Route exact path='/mobile/detail' component={MobileDetails} />
          <Route exact path='/electronics' component={Electronic} />
          <Route exact path='/electronics/filter' component={ElectronicsFilter} />
          <Route exact path='/electronics/detail' component={ElectronicsDetails} />
          <Route exact path='/men' component={Men} />
          <Route exact path='/men/filter' component={MenFilter} />
          <Route exact path='/men/detail' component={MenDetails} />
          <Route exact path='/women' component={Women} />
          <Route exact path='/women/filter' component={WomenFilter} />
          <Route exact path='/women/detail' component={WomenDetails} />
          <Route exact path='/kids' component={Kids} />
          <Route exact path='/kids/filter' component={KidsFilter} />
          <Route exact path='/kids/detail' component={KidsDetails} />
          <Route exact path='/home-appliances' component={HomeAppliance} />
          <Route exact path='/home-appliances/filter' component={HomeApplianceFilter} />
          <Route exact path='/home-appliances/detail' component={HomeApplianceDetails} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/payment' component={Payment} />
          <Route exact path='/order' component={Orders} />
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default Router;