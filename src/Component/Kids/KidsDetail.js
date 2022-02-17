import react from "react";
import { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import '../../Styles/Kids/KidsDetail.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';
import WithRouter from "../WithRouter";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '25em',
        height: '9em',
        marginRight: '-50%',
        backgroundColor: '#99dcf0',
        transform: 'translate(-50%, -50%)',
    },
};
class KidsDetails extends react.Component {
    constructor() {
        super();
        this.state = {
            Itemdetail: {},
            ItembasicDetail: {},
            Itemdescription: [],
            modalIsOpenforAddCart: false

        }
    }

    handlecart = (state, value) => {
        const { ItembasicDetail } = this.state;
        let user_cart_item = [];
        let ItemupdatebasicDetail = {};
        let isNewItemAddedToCart = false;
        if (!sessionStorage.getItem('user_cart')) {
            ItemupdatebasicDetail = { ...ItembasicDetail, qty: 1 }
            user_cart_item.push(ItemupdatebasicDetail);
            sessionStorage.setItem('user_cart', JSON.stringify(user_cart_item));
        }
        else if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('user_cart').length > 0) {
            user_cart_item = JSON.parse(sessionStorage.getItem('user_cart'));
            isNewItemAddedToCart = user_cart_item.every((userItem) => {
                if (userItem.productID != ItembasicDetail.productID)
                    return true;
            })

            if (isNewItemAddedToCart) {
                ItemupdatebasicDetail = { ...ItembasicDetail, qty: 1 }
                user_cart_item.push(ItemupdatebasicDetail);
            }
            else {
                user_cart_item.map((userItem) => {
                    if (userItem.productID === ItembasicDetail.productID) {
                        userItem.qty = userItem.qty + 1;
                    }
                })

            }

        }
        sessionStorage.setItem('user_cart', JSON.stringify(user_cart_item));
        if (value === 'buy') {
            this.props.router.navigate('/cart');
        }
        else {
            this.setState({ [state]: value });
        }


    }
    handlemodal = (state, value) => {
        this.setState({ [state]: value });
    }
    navigateToCart = () => {
        this.props.router.navigate('/cart');
    }
    componentDidMount() {
        const { productId } = queryString.parse(this.props.router.location.search)
        axios({
            url: `https://amazon-clone-db.herokuapp.com/fashionkids/details/${productId}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({
            Itemdetail: res.data.fashion_kids_det_prodID,
            Itemdescription: res.data.fashion_kids_det_prodID.small_description.split('\n'),
        })).catch(err => console.log(err))
        axios({
            url: `https://amazon-clone-db.herokuapp.com/fashionkids/basic/${productId}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({
            ItembasicDetail: res.data.fashion_kids_basic_detail_prodID
        })).catch(err => console.log(err))


    }
    render() {
        const { Itemdetail, ItembasicDetail, Itemdescription, modalIsOpenforAddCart } = this.state;
        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="kids-item-img col-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <Carousel showIndicators={false} className="item-detail-carousel" dynamicHeight="70%" useKeyboardArrows={true}>
                            {Itemdetail && Itemdetail.images && Itemdetail.images.map((item) => {
                                return (
                                    <div className="item-detail-gallery-image">
                                        <img src={item} alt="Kids" />
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className="kids-item-detail col-7 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div className="kids-item-name">
                            {Itemdetail.name}
                        </div>
                        <div className="kids-item-brand-url">
                            <a href={Itemdetail.brand_url}>{Itemdetail.brand}</a>
                        </div>
                        <div className="kids-item-rating">
                            {Itemdetail.average_rating} rating | {Itemdetail.total_reviews} reviews | {Itemdetail.total_answered_questions} + answered questions
                        </div>
                        {ItembasicDetail.is_amazon_choice === true ? <img className="kids-item-amazon-choice" src="https://storage.googleapis.com/mw-imagelibrary/amazon-choice.png"></img> : null}
                        {ItembasicDetail.is_limited_deal === true ? <img className="kids-item-amazon-limited-deal" src="https://www.pngall.com/wp-content/uploads/2016/06/Limited-offer-Free-Download-PNG.png"></img> : null}
                        <hr className="item-detail-split" />
                        <div className="kids-item-price-deliver">
                            <div className="kids-item-price">
                                Price: {ItembasicDetail.price_string}
                            </div>
                            <div className="kids-item-has-prime">
                                {ItembasicDetail.has_prime == true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                        "/> : <p className="prime-desc">Not Eligible for Prime</p>}
                            </div>
                            <div className="kids-item-deliver">
                                <div className="order-placed-verbiage">If you placed the order now</div>
                                <span className="order-delivery-verbiage" style={{ fontFamily: "serif", fontSize: "0.9em" }}>Delivered On</span> : {ItembasicDetail.has_prime == true ? <span className="item-delivery-date" style={{ fontFamily: "serif", fontSize: "1em", fontWeight: "bolder" }}>
                                    {new Date(new Date().setDate(new Date().getDate() + 2)).toString().substring(0, 24)}
                                </span> : <span className="item-delivery-date" style={{ fontFamily: "serif", fontSize: "1em", fontWeight: "bolder" }}>
                                    {new Date(new Date().setDate(new Date().getDate() + 10)).toString().substring(0, 24)}
                                </span>}
                            </div>
                            <hr className="item-detail-split" />
                        </div>
                        <div className="seller-availability-details">

                            Seller: {Itemdetail.seller_name} | Availability: {Itemdetail.availability_status}| Amazon Fullfilled: {Itemdetail.fulfilled_by_amazon == true ? "Yes" : "No"}
                            <div>
                                <span>Available Sizes</span>
                            </div>
                            {Itemdetail && Itemdetail.customization_options && Itemdetail.customization_options.Size_name && Itemdetail.customization_options.Size_name.map((size) => {
                                return (

                                    <button className="btn btn-large btn-large-danger availabile-size"> {size.value}</button>

                                )
                            })}
                            <hr></hr>
                        </div>
                        <div className="about-item">
                            {this.state.Itemdescription.map((item, index) => Itemdescription.length - 1 != index ? <p>{item}</p> : null)}
                        </div>
                    </div>
                    <div className="kids-cart-buy col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <div className="cart-buy">
                            {ItembasicDetail && <div><button className="btn-cart" onClick={() => this.handlecart('modalIsOpenforAddCart', true)}>Add To Cart</button><br />
                                <button className="btn-buy" onClick={() => this.handlecart('buy-item', 'buy')}>Buy Now</button></div>}
                        </div>
                    </div>
                </div>
                <div>
                    <Modal isOpen={modalIsOpenforAddCart} style={customStyles} >
                        <div>
                            <span className="cart-pop-header">Item has been added to cart</span>
                            <span className="add-to-cart-modal-close" onClick={() => this.handlemodal('modalIsOpenforAddCart', false)}><strong class="fas fa-times"></strong></span>
                            <button className="btn-view-cart-item" onClick={() => this.handlemodal('modalIsOpenforAddCart', false), this.navigateToCart}>View Cart </button>
                        </div>
                    </Modal>
                </div>
            </div>

        )
    }
}

export default WithRouter(KidsDetails);