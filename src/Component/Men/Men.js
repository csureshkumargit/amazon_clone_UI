import react from "react";
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import '../../Styles/Men/Men.css';
import WithRouter from "../WithRouter";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

class Men extends react.Component {

    constructor() {
        super();
        this.state = {
            men_collection: []
        }
    }
    navigateToMenCollectionsByItem = (menId) => {

        this.props.router.navigate(`/men/filter?fashion_id_men=${menId}`)
    }
    componentDidMount() {

        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionmen/",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ men_collection: res.data.fashion_men_items })).catch(err => console.log(err))

    }

    render() {
        const { men_collection } = this.state;
        return (
            <div>
                <div className="men-heading">Our Collections for Men</div>
                <Carousel breakPoints={breakPoints} >

                    {

                        men_collection && men_collection.length > 0 && men_collection.map((men_item) =>
                            <div >
                                <img className="men-brands-icon" src={`./Assets/Images/${men_item.image}`} key={men_item.fashion_id_men} onClick={() => this.navigateToMenCollectionsByItem(men_item.fashion_id_men)} />
                                <p className="legend">{men_item.fashionMen}</p>
                            </div>
                        )

                    }

                </Carousel>
                {/* <Footer /> */}

            </div>
        )
    }

}

export default WithRouter(Men);