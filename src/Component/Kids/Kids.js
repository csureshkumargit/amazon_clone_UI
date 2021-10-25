import react from "react";
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import '../../Styles/Kids/Kids.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

class Kids extends react.Component {

    constructor() {
        super();
        this.state = {
            kids_collection: []
        }
    }
    navigateToKidsCollectionsByItem = (kidsId) => {

        this.props.history.push(`kids/filter?fashion_id_kids=${kidsId}`)
    }
    componentDidMount() {

        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionkids/",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ kids_collection: res.data.fashion_kids_items })).catch(err => console.log(err))

    }

    render() {
        const { kids_collection } = this.state;
        return (
            <div>
                <div className="kids-heading">Our Collections for Kids</div>
                <Carousel breakPoints={breakPoints} >

                    {

                        kids_collection && kids_collection.length > 0 && kids_collection.map((kids_item) =>
                            <div >
                                <img className="kids-brands-icon" src={`./Assets/Images/${kids_item.image}`} key={kids_item.fashion_id_kids} onClick={() => this.navigateToKidsCollectionsByItem(kids_item.fashion_id_kids)} />
                                <p className="legend">{kids_item.fashionKids}</p>
                            </div>
                        )

                    }

                </Carousel>
                {/* <Footer /> */}

            </div>
        )
    }

}

export default Kids;