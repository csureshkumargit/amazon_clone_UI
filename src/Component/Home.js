import react from "react";
import Carousel from 'react-elastic-carousel';
import axios from "axios";
import '../Styles/Home.css';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];
class Home extends react.Component {
    constructor() {
        super();
        this.state = {
            mobile_deals: [],
            electronics_deals: [],
            appliances_deals: [],
            men_deals: [],
            women_deals: [],
            kids_deals: []
        }
    }
    checkforProductDetail = (product, productcode, id) => {
        this.props.history.push(`${product}/filter?${productcode}=${id}`);
    }
    componentDidMount() {

        axios({
            url: "https://amazon-clone-db.herokuapp.com/mobile/deals",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ mobile_deals: res.data.mobile_deals })).catch(err => console.log(err))

        axios({
            url: "https://amazon-clone-db.herokuapp.com/electronics/deals",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ electronics_deals: res.data.electronic_deals })).catch(err => console.log(err))

        axios({
            url: "https://amazon-clone-db.herokuapp.com/appliances/deals",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ appliances_deals: res.data.appliances_deals })).catch(err => console.log(err))
        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionmen/deals",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ men_deals: res.data.men_deals })).catch(err => console.log(err))
        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionwomen/deals",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ women_deals: res.data.women_deals })).catch(err => console.log(err))
        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionkids/deals",
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ kids_deals: res.data.kids_deals })).catch(err => console.log(err))
    }
    render() {
        const { mobile_deals, electronics_deals, appliances_deals, men_deals, women_deals, kids_deals } = this.state;
        return (
            <div>
                <div>
                    <img className='banner-img' src={`./Assets/Images/Logo/Home_banner.jpg`} />
                </div>
                <div>
                    <div className="product-heading">Our Top Deals in Mobile</div>
                    <Carousel breakPoints={breakPoints} >

                        {

                            mobile_deals && mobile_deals.length > 0 && mobile_deals.map((mobile_deal) =>
                                <div >
                                    <img className="product-brands-icon" src={mobile_deal.image} key={mobile_deal.mobile_id} onClick={() => this.checkforProductDetail('mobile', 'mobile_id', mobile_deal.mobile_id)} />
                                </div>
                            )

                        }

                    </Carousel>

                </div>
                <div>
                    <div className="product-heading">Our Top Collections in Electronics</div>
                    <Carousel breakPoints={breakPoints} >

                        {

                            electronics_deals && electronics_deals.length > 0 && electronics_deals.map((electronics_deal) =>
                                <div >
                                    <img className="product-brands-icon" src={electronics_deal.image} key={electronics_deal.electronics_id} onClick={() => this.checkforProductDetail('electronics', 'electronics_id', electronics_deal.electronics_id)} />
                                </div>
                            )

                        }

                    </Carousel>

                </div>
                <div>
                    <div className="product-heading">Our New Collections for your Home</div>
                    <Carousel breakPoints={breakPoints} >

                        {

                            appliances_deals && appliances_deals.length > 0 && appliances_deals.map((appliances_deals) =>
                                <div >
                                    <img className="product-brands-icon" src={appliances_deals.image} key={appliances_deals.home_appl_id} onClick={() => this.checkforProductDetail('home-appliances', 'home_appl_id', appliances_deals.home_appl_id)} />
                                </div>
                            )

                        }

                    </Carousel>

                </div>
                <div>
                    <div className="product-heading">Latest Brand for Handsome Men</div>
                    <Carousel breakPoints={breakPoints} >

                        {

                            men_deals && men_deals.length > 0 && men_deals.map((men_deals) =>
                                <div >
                                    <img className="product-brands-icon" src={men_deals.image} key={men_deals.fashion_id_men} onClick={() => this.checkforProductDetail('men', 'fashion_id_men', men_deals.fashion_id_men)} />
                                </div>
                            )

                        }

                    </Carousel>

                </div>
                <div>
                    <div className="product-heading">Latest Collections for Beautiful Women</div>
                    <Carousel breakPoints={breakPoints} >

                        {

                            women_deals && women_deals.length > 0 && women_deals.map((women_deals) =>
                                <div >
                                    <img className="product-brands-icon" src={women_deals.image} key={women_deals.fashion_id_women} onClick={() => this.checkforProductDetail('women', 'fashion_id_women', women_deals.fashion_id_women)} />
                                </div>
                            )

                        }

                    </Carousel>

                </div>
                <div>
                    <div className="product-heading">Our New Collections for Crazy Kids</div>
                    <Carousel breakPoints={breakPoints} >

                        {

                            kids_deals && kids_deals.length > 0 && kids_deals.map((kids_deals) =>
                                <div >
                                    <img className="product-brands-icon" src={kids_deals.image} key={kids_deals.fashion_id_kids} onClick={() => this.checkforProductDetail('kids', 'fashion_id_kids', kids_deals.fashion_id_kids)} />
                                </div>
                            )

                        }

                    </Carousel>

                </div>
            </div>

        )
    }
}

export default Home;