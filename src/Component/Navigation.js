import react from "react";
import '../Styles/Navigation.css';
import axios from "axios";
import { withRouter } from "react-router";

import Modal from 'react-modal';


import { Component } from 'react';

const customStyles_Login = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '25em',
        height: '12em',
        marginRight: '-70em',
        backgroundColor: 'white',
        transform: 'translate(-50%, -50%)',
    }
};
const customStyles_customercare = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const customStyles_Location = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'yellow'
    },
};

class Navigation extends react.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpenforLogin: false,
            modalIsOpenforCustomerCare: false,
            customercare: {},
            location: [],
            zipcode: '',
            modalIsOpenforCustomerZipCode: false,
            searchproductword: ''

        }
    }
    navigateToHome = () => {
        this.props.history.push('/');
    }
    getCustomerDeliverLocation = () => {
        const { location, zipcode } = this.state;

        axios({
            url: `https://api.postalpincode.in/pincode/${zipcode}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({
            location: res.data.map((item) => {
                if (item.Status == "Success")
                    return item.PostOffice[0]["District"];
                return "Invalid";
            })
        })).catch(err => console.log(err))
        this.handleModal('modalIsOpenforCustomerZipCode', false);

    }
    navigateToSearchProduct = () => {
        const { searchproductword } = this.state;
        if (searchproductword && searchproductword.length > 1) {
            this.props.history.push(`/searchproduct?searchproductword=${searchproductword}`);
        }
        return;
    }
    navigateToLoginPage = () => {
        this.props.history.push('/login');
        this.handleModal('modalIsOpenforLogin', false)
    }
    navigateToSignupPage = () => {
        this.props.history.push('/signup');
        this.handleModal('modalIsOpenforLogin', false)
    }
    toggleProductsnavigation = () => {

        if (document.getElementById('mpadNavigation-items').style.display == "none") {
            document.getElementById('mpadNavigation-items').style.display = "block";
        }
        else {
            document.getElementById('mpadNavigation-items').style.display = "none";
        }
    }
    navigateToMobile = () => {
        this.props.history.push('/mobile');
    }
    navigateToElectronics = () => {
        this.props.history.push('/electronics');
    }
    navigateToMenCollections = () => {
        this.props.history.push('/men');
    }
    navigateToWomenCollections = () => {
        this.props.history.push('/women');
    }
    navigateToKidsCollections = () => {
        this.props.history.push('/kids');
    }
    navigateToHomeAppliances = () => {
        this.props.history.push('/home-appliances');
    }
    navigateToCart = () => {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('username').length > 0) {
            this.props.history.push(`/cart`);
        }
        return;
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
    getRecentOrderDetails = () => {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('username').length > 0) {
            let username = sessionStorage.getItem('username');
            this.props.history.push(`/order/?username=${username}`);
            this.handleModal('modalIsOpenforLogin', false);
        }
        return;
    }
    getCustomerCareDetail = () => {
        axios({
            url: `https://amazon-clone-db.herokuapp.com/api/customercare`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ customercare: res.data.customer_care_details })).catch(err => console.log(err))
        this.handleModal('modalIsOpenforCustomerCare', true);
    }
    userLogOut = () => {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('username').length > 0) {
            sessionStorage.setItem('user_cart', '');
            sessionStorage.setItem('jwt_token', '');
            sessionStorage.setItem('username', '');
            this.props.history.push('/');
            this.handleModal('modalIsOpenforLogin', false);
        }
        return;
    }
    render() {
        const { modalIsOpenforLogin, username, password, email, modalIsOpenforCustomerCare, customercare, location, zipcode, modalIsOpenforCustomerZipCode, searchproductword } = this.state;
        return (
            <div>
                <div className="Navigation">
                    <div className="amazon-logo" onClick={this.navigateToHome}>
                        <img className='logo' src={`./Assets/Images/Logo/Amazon-India-Logo.png`} />
                    </div>
                    <div className="customer-location" onClick={() => this.handleModal('modalIsOpenforCustomerZipCode', true)}>
                        <div className="location-cust">
                            <span><strong class="fas fa-map-marker location-map"></strong></span>
                        </div>
                        <div className="deliver-tag-cust">
                            <span className="deliver-tag">{location && location.length > 0 ? location : "Deliver"}</span>
                        </div>
                    </div>
                    <div className="search-bar-product">
                        <input className="product-search" type="text" placeholder="Search for Product" value={searchproductword}
                            onChange={(e) => this.setState({ searchproductword: e.target.value })}></input>
                        <strong class="fas fa-search search-prod" onClick={this.navigateToSearchProduct}></strong>
                    </div>
                    <div className="Language-dropdown">
                        <img className='logo-flag' src={`./Assets/Images/Logo/Indian_Flag.png`} />
                        <strong class="fas fa-caret-down lang-icon"></strong>
                    </div>
                    <div className="Customer-Login" onClick={() => this.handleModal('modalIsOpenforLogin', true)}>
                        Hello , Sign in &nbsp;
                        <strong class="fas fa-caret-down cust-login-icon"></strong>
                    </div>
                    <div className="Customer-Orders" onClick={this.getRecentOrderDetails}>
                        <span style={{ color: "white", fontSize: "0.8em" }}>Returns</span>
                        <div style={{ color: "white", fontSize: "0.85em" }}>&#38;Orders</div>
                    </div>
                    <div className="Customer-Cart" onClick={this.navigateToCart}>
                        <strong className="fas fa-shopping-cart" style={{ color: "white", fontWeight: "bolder", fontSize: "larger" }}></strong>
                        <span style={{ color: "white", fontSize: "0.85em", fontWeight: "bolder" }} >&nbsp;Cart</span>
                    </div>
                </div>
                <div className="mpadNavigation"  >
                    <div className="toggle-products" onClick={this.toggleProductsnavigation}  >
                        <strong class="fas fa-bars toggle"></strong>
                    </div>
                    <div className="amazon-logo" onClick={this.navigateToHome}>
                        <img className='logo' src={`./Assets/Images/Logo/Amazon-India-Logo.png`} />
                    </div>
                    <div className="search-bar-product">
                        <input className="product-search" type="text" placeholder="Search for Product" value={searchproductword}
                            onChange={(e) => this.setState({ searchproductword: e.target.value })}></input>
                        <strong class="fas fa-search search-prod" onClick={this.navigateToSearchProduct}></strong>
                    </div>
                    <div className="Customer-Login" onClick={() => this.handleModal('modalIsOpenforLogin', true)}>
                        Hello , Sign in &nbsp;
                        <strong class="fas fa-caret-down cust-login-icon"></strong>
                    </div>

                </div>
                <div className="Navigation-items">
                    <button className="btn-item-navigation" onClick={this.navigateToMobile}>Mobiles</button>
                    <button className="btn-item-navigation" onClick={this.navigateToElectronics}> Electronics</button>
                    <button className="btn-item-navigation" onClick={this.navigateToMenCollections}>Men </button>
                    <button className="btn-item-navigation" onClick={this.navigateToWomenCollections}>Women</button>
                    <button className="btn-item-navigation" onClick={this.navigateToKidsCollections}>Kids</button>
                    <button className="btn-item-navigation " onClick={this.navigateToHomeAppliances}>Home &#38; Kitchen </button>
                    <button className="btn-item-navigation" onClick={this.getCustomerCareDetail}>Customer Service</button>
                </div>
                <div className="mpadNavigation-items" id="mpadNavigation-items" onMouseOut={this.toggleProductsnavigation}>
                    <button className="btn-item-navigation" onClick={this.navigateToMobile}>Mobiles</button>
                    <button className="btn-item-navigation" onClick={this.navigateToElectronics}> Electronics</button>
                    <button className="btn-item-navigation" onClick={this.navigateToMenCollections}>Men </button>
                    <button className="btn-item-navigation" onClick={this.navigateToWomenCollections}>Women</button>
                    <button className="btn-item-navigation" onClick={this.navigateToKidsCollections}>Kids</button>
                    <button className="btn-item-navigation " onClick={this.navigateToHomeAppliances}>Home &#38; Kitchen </button>
                    <button className="btn-item-navigation " onClick={this.getRecentOrderDetails}>Returns &#38; Orders </button>
                    <button className="btn-item-navigation " onClick={this.navigateToCart}>Cart </button>
                    <button className="btn-item-navigation" onClick={this.getCustomerCareDetail}>Customer Service</button>
                </div>
                <Modal isOpen={modalIsOpenforLogin} style={customStyles_Login} >
                    <div>
                        <div className="user-acct-sign-in">
                            <button className='btn-acct-signin' onClick={this.navigateToLoginPage}>Sign in</button>
                            <span className="sign-in-modal-close" onClick={() => this.handleModal('modalIsOpenforLogin', false)}><strong class="fas fa-times"></strong></span>
                        </div>
                        <div className="user-acct-creation">
                            New Customer?  <button className='btn-acct-signup' onClick={this.navigateToSignupPage}>Create Account</button>
                        </div>
                        <hr></hr>
                        <div className="user-purchase-history">
                            <button className='btn-acct-user-order-history' onClick={this.getRecentOrderDetails}>Your Orders</button>
                            <button className='btn-acct-user-order-history' onClick={this.userLogOut}>Logout</button>
                        </div>
                    </div>
                </Modal>
                <Modal isOpen={modalIsOpenforCustomerCare} style={customStyles_customercare} >
                    <div>
                        <span className="customer-care-modal-close" onClick={() => this.handleModal('modalIsOpenforCustomerCare', false)}><strong class="fas fa-times"></strong></span>
                        <div className="customer-care-number">
                            Toll Free Number :{customercare.Customercare}
                        </div>
                        <div className="customer-care-courier">
                            <table border="1px solid">
                                <thead className="customer-care-heading" border="1px solid">
                                    <th className="courier-partner-heading">
                                        Name of the Courier
                                    </th>
                                    <th className="courier-partner-heading">
                                        Email address
                                    </th>
                                    <th className="courier-partner-heading">
                                        Phone Number
                                    </th>
                                    <th className="courier-partner-heading">
                                        Website
                                    </th>
                                </thead>
                                {customercare.CourierPartners && customercare.CourierPartners.map((courierpartner) => (
                                    <tr>
                                        <td>
                                            <div className="courier-partner-name courier-partner-detail">
                                                {courierpartner.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="courier-partner-email courier-partner-detail">
                                                {courierpartner.email}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="courier-partner-number courier-partner-detail">
                                                {courierpartner.contact_number}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="courier-partner-website courier-partner-detail">
                                                {courierpartner.Website}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>


                    </div>
                </Modal>
                <Modal isOpen={modalIsOpenforCustomerZipCode} style={customStyles_Location} >
                    <div>
                        <div style={{ fontSize: '1em' }}>Please Enter Indian Zip code</div>
                        <form >
                            <input style={{ marginTope: '1em' }} type="number" minLength='6' value={zipcode} onChange={(e) => this.setState({ zipcode: e.target.value })} required></input>
                            <button type="submit" onClick={this.getCustomerDeliverLocation}>Go</button>
                        </form>
                    </div>

                </Modal>
            </div>

        )
    }
}

export default withRouter(Navigation);