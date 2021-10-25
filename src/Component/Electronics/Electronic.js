import react from "react";
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import '../../Styles/Electronics/Electronic.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

class Electronic extends react.Component {

    constructor() {
        super();
        this.state = {
            electronic_brand: []
        }
    }
    navigateToElectronicsByItem = (electronicId) => {

        this.props.history.push(`electronics/filter?electronics_id=${electronicId}`)
    }
    componentDidMount() {

        axios({
            url: "https://amazon-clone-db.herokuapp.com/electronics/",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ electronic_brand: res.data.electronics_items })).catch(err => console.log(err))

    }

    render() {
        const { electronic_brand } = this.state;
        return (
            <div>
                <div className="electronics-heading">Our Collections in Electronics</div>
                <Carousel breakPoints={breakPoints} >

                    {

                        electronic_brand && electronic_brand.length > 0 && electronic_brand.map((electronic_item) =>
                            <div >
                                <img className="electronic-brands-icon" src={`./Assets/Images/${electronic_item.image}`} key={electronic_item.electronics_id} onClick={() => this.navigateToElectronicsByItem(electronic_item.electronics_id)} />
                                <p className="legend">{electronic_item.electronics}</p>
                            </div>
                        )

                    }

                </Carousel>
                {/* <Footer /> */}

            </div>
        )
    }

}

export default Electronic;