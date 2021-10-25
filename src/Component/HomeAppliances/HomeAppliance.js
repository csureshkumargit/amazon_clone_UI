import react from "react";
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import '../../Styles/HomeAppliances/HomeAppliance.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

class HomeAppliance extends react.Component {

    constructor() {
        super();
        this.state = {
            home_appliances_brands: []
        }
    }
    navigateToAppliancesByBrand = (applID) => {

        this.props.history.push(`home-appliances/filter?home_appl_id=${applID}`)
    }
    componentDidMount() {

        axios({
            url: "https://amazon-clone-db.herokuapp.com/appliances/",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ home_appliances_brands: res.data.appliances_brand })).catch(err => console.log(err))

    }

    render() {
        const { home_appliances_brands } = this.state;
        return (
            <div>
                <div className="home-appliance-heading">Our Top Brands in Home &#38;Kitchen</div>
                <Carousel breakPoints={breakPoints} >

                    {

                        home_appliances_brands && home_appliances_brands.length > 0 && home_appliances_brands.map((home_appliances_brand) =>
                            <div >
                                <img className="home-appliance-brands-icon" src={`./Assets/Images/${home_appliances_brand.image}`} key={home_appliances_brand.home_appl_id} onClick={() => this.navigateToAppliancesByBrand(home_appliances_brand.home_appl_id)} />
                            </div>
                        )

                    }

                </Carousel>
                {/* <Footer /> */}

            </div>
        )
    }

}

export default HomeAppliance;