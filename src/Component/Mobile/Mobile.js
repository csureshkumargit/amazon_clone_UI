import react from "react";
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import '../../Styles/Mobile/Mobile.css';
import WithRouter from "../WithRouter";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

class Mobile extends react.Component {

    constructor() {
        super();
        this.state = {
            mobile_brand: []
        }
    }
    navigateToMobileByBrands = (mobileId) => {

        this.props.router.navigate(`/mobile/filter?mobile_id=${mobileId}`)
    }
    componentDidMount() {

        axios({
            url: "https://amazon-clone-db.herokuapp.com/mobile/",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ mobile_brand: res.data.mobile_home_data })).catch(err => console.log(err))

    }

    render() {
        const { mobile_brand } = this.state;
        return (
            <div>
                <div className="mobile-heading">Our Top Brands in Mobile</div>
                <Carousel breakPoints={breakPoints} >

                    {

                        mobile_brand && mobile_brand.length > 0 && mobile_brand.map((mobile_item) =>
                            <div >
                                <img className="mobile-brands-icon" src={`./Assets/Images/${mobile_item.image}`} key={mobile_item.mobile_id} onClick={() => this.navigateToMobileByBrands(mobile_item.mobile_id)} />
                            </div>
                        )

                    }

                </Carousel>
                {/* <Footer /> */}

            </div>
        )
    }

}

export default WithRouter(Mobile);