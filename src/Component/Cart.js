import react from "react";
import { Component } from "react";
import Modal from 'react-modal';
import '../Styles/Cart.css';
import axios from "axios";
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
class Cart extends react.Component {
    constructor() {
        super();
        this.state = {
            cart_items: [],
            modalIsOpenforusertoSignIn: false,
            total_items: 0,
            subtotal: 0
        }
    }
    navigateToHomeorOrderPage = () => {

        if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('username') &&
            sessionStorage.getItem('jwt_token') && sessionStorage.getItem('user_cart').length > 0 &&
            sessionStorage.getItem('username').length > 0 && sessionStorage.getItem('jwt_token').length > 0) {
            console.log('true', 1);
            this.props.history.push('/payment');
        }
        else {
            console.log('true', 2);
            this.setState({ modalIsOpenforusertoSignIn: true });
        }
    }

    navigateToLoginPage = () => {
        this.props.history.push('/login');
    }
    handlemodal = (state, value) => {
        this.setState({ [state]: value });
    }
    saveUsertempOrders = () => {
        let items = [];
        let username = undefined;

        items = JSON.parse(sessionStorage.getItem('user_cart'));
        username = sessionStorage.getItem('username');
        const order = {
            items,
            username
        }
        axios(
            {
                url: `https://amazon-clone-db.herokuapp.com/api/tempOrders/${username}`,
                Headers: {
                    'content-type': 'application/json'
                },
                method: "DELETE"
            }
        ).then(res => console.log('del_orders', res.data.message))
            .catch(err => console.log('err', err))
        axios(
            {
                url: "https://amazon-clone-db.herokuapp.com/api/tempOrders",
                Headers: {
                    'content-type': 'application/json'
                },
                method: "POST",
                data: order
            }
        ).then(res => console.log('orders', res.data.message))
            .catch(err => console.log('err', err))

    }

    updateCartItems = (operation, index) => {
        const { cart_items } = this.state;
        let total_num_items = 0;
        let subtotal_amt = 0;
        let update_result_cart_items = [...cart_items];
        let update_item = update_result_cart_items[index];
        if (operation === "add") {
            update_item.qty = update_item.qty + 1;
            update_result_cart_items[index] = update_item;
            console.log('add', update_item);
        }
        else {
            if (update_item.qty === 1) {
                update_result_cart_items.splice(index, 1);
                console.log('slice', update_result_cart_items);
            }
            else {
                update_item.qty = update_item.qty - 1;
                update_result_cart_items[index] = update_item;
                console.log('sub', update_item);
            }
        }

        update_result_cart_items.map((item) => {
            total_num_items = total_num_items + item.qty;
            subtotal_amt = subtotal_amt + item.qty * item.price;
        })
        this.setState({ cart_items: update_result_cart_items, total_items: total_num_items, subtotal: subtotal_amt });
        sessionStorage.setItem('user_cart', JSON.stringify(update_result_cart_items));
        if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('user_cart').length > 0 &&
            sessionStorage.getItem('username') && sessionStorage.getItem('username').length > 0) {
            this.saveUsertempOrders();
        }

    }



    componentDidMount() {
        if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('user_cart').length > 0 &&
            sessionStorage.getItem('username') && sessionStorage.getItem('username').length > 0) {
            this.saveUsertempOrders();
        }
        if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('user_cart').length > 0) {
            let user_cart_items = [];
            let total_num_items = 0;
            let subtotal_amt = 0;
            user_cart_items = JSON.parse(sessionStorage.getItem('user_cart'));
            user_cart_items.map((item) => {
                total_num_items = total_num_items + item.qty;
                subtotal_amt = subtotal_amt + item.qty * item.price;
            })
            this.setState({ cart_items: JSON.parse(sessionStorage.getItem('user_cart')), total_items: total_num_items, subtotal: subtotal_amt })
        }

    }
    render() {
        const { cart_items, total_items, subtotal, modalIsOpenforusertoSignIn } = this.state;
        return (
            <div>
                <div className="container-fluid shopping-cart">
                    <div className="row">
                        <div className="col-8 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                            <div className="cart-heading">
                                <h4>Shopping Cart</h4>
                                <hr></hr>
                            </div>

                            {cart_items && cart_items.length > 0 && cart_items.map((item, index) => {
                                return (
                                    <div className="row">
                                        <div className="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2 item-image-cart">
                                            <img src={item.image} alt={item.productID} />
                                        </div>
                                        <div className="col-9 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                            <div className="row">
                                                <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                    <div className='item-cart-name'>
                                                        {item.name}
                                                    </div>
                                                    <div className="cart-avg-rating">
                                                        Rating : {item.stars}
                                                    </div>
                                                    <div className="cart-prime-item">
                                                        {item.has_prime == true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                                        "/> : <p className="cart-prime-desc">Not Eligible for Prime</p>}
                                                    </div>
                                                    <div className="cart-item-deliver">
                                                        <div className="cart-order-placed-verbiage">If you placed the order now</div>
                                                        <span className="cart-order-delivery-verbiage" style={{ fontFamily: "serif", fontSize: "0.9em" }}>Deliver On</span> : {item.has_prime == true ? <span className="cart-item-delivery-date" style={{ fontFamily: "serif", fontSize: "1em", fontWeight: "bolder" }}>
                                                            {new Date(new Date().setDate(new Date().getDate() + 2)).toString().substring(0, 24)}
                                                        </span> : <span className="cart-item-delivery-date" style={{ fontFamily: "serif", fontSize: "1em", fontWeight: "bolder" }}>
                                                            {new Date(new Date().setDate(new Date().getDate() + 10)).toString().substring(0, 24)}
                                                        </span>}
                                                    </div>
                                                    <div className="cart-item-add-remove">
                                                        <button className="sub-cart-item btn-cart-item" onClick={() => this.updateCartItems('sub', index)}>Remove</button><button className="cart-item-qty">{item.qty}</button><button className="add-cart-item btn-cart-item" onClick={() => this.updateCartItems('add', index)}>Add</button>
                                                    </div>
                                                </div>
                                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                    &#8377; {item.price}
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="cart-item-split"></hr>
                                    </div>)
                            })}
                            {
                                cart_items && cart_items.length === 0 &&
                                <div className="user-msg">
                                    No items availabile in your cart.
                                    <hr></hr>
                                </div>

                            }
                            <div className="cart-footer">
                                <div className="cart-footer-total-price-qty">
                                    <span className="cart-sub-total">Subtotal ({this.state.total_items} items)</span>: <span className="cart-total-amt">&#8377;{this.state.subtotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                            <div className="cart-total-price-qty-buy">
                                <span className="cart-sub-total-buy">Subtotal ({this.state.total_items} items)</span>: <span className="cart-total-amt">&#8377;{this.state.subtotal.toFixed(2)}</span>
                                <div><button className="cart-buy-btn" onClick={this.navigateToHomeorOrderPage}>Proceed to Buy</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal isOpen={modalIsOpenforusertoSignIn} style={customStyles} >
                        <div>
                            <span className="cart-pop-header user-login-alert">Please Sign In/Sign up to continue</span>
                            <span className="add-to-cart-modal-close" onClick={() => this.handlemodal('modalIsOpenforusertoSignIn', false)}><strong class="fas fa-times"></strong></span>
                            <button className="btn-view-cart-item" onClick={() => this.handlemodal('modalIsOpenforusertoSignIn', false), this.navigateToLoginPage} >OK</button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Cart;