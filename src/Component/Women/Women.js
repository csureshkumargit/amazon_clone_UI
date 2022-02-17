import react from "react";
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import WithRouter from "../WithRouter";
import '../../Styles/Women/Women.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

class Women extends react.Component {

    constructor() {
        super();
        this.state = {
            women_collection: []
        }
    }
    navigateToWomenCollectionsByItem = (womenId) => {

        this.props.router.navigate(`/women/filter?fashion_id_women=${womenId}`)
    }
    componentDidMount() {

        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionwomen/",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ women_collection: res.data.fashion_women_items })).catch(err => console.log(err))

    }

    render() {
        const { women_collection } = this.state;
        return (
            <div>
                <div className="women-heading">Our Collections for Women</div>
                <Carousel breakPoints={breakPoints} >

                    {

                        women_collection && women_collection.length > 0 && women_collection.map((women_item) =>
                            <div >
                                <img className="women-brands-icon" src={`./Assets/Images/${women_item.image}`} key={women_item.fashion_id_women} onClick={() => this.navigateToWomenCollectionsByItem(women_item.fashion_id_women)} />
                                <p className="legend">{women_item.fashionWomen}</p>
                            </div>
                        )

                    }

                </Carousel>
                {/* <Footer /> */}

            </div>
        )
    }

}

export default WithRouter(Women);