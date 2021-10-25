import react from "react";
import axios from "axios";
import '../Styles/Payment.css';

class Payment extends react.Component {
    constructor() {
        super();
        this.state = {
            cart_items: [],
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            total_items: 0,
            subtotal: 0
        }
    }
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        //form.setAttribute('enctype', 'utf-8')

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        console.log('form', form);
        return form
    }

    post = (details) => {
        const form = this.buildForm(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();
        this.saveUserOrders();


    }
    getData = (data_pay) => {
        return fetch(`https://amazon-clone-db.herokuapp.com/api/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data_pay)
        }).then(response =>
            response.json()).catch(err => console.log(err))

    }
    saveUserOrders = () => {
        let items = [];
        let username = undefined;

        if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('user_cart').length > 0 &&
            sessionStorage.getItem('username') && sessionStorage.getItem('username').length > 0) {
            items = JSON.parse(sessionStorage.getItem('user_cart'));
            username = sessionStorage.getItem('username');
            const order = {
                items,
                username
            }
            axios(
                {
                    url: "https://amazon-clone-db.herokuapp.com/api/orders",
                    Headers: {
                        'content-type': 'application/json'
                    },
                    method: "POST",
                    data: order
                }
            ).then(res => { console.log('orders', res.data.message); sessionStorage.setItem('user_cart', ''); })
                .catch(err => console.log('err', err))
        }

    }
    Payments = (e) => {
        e.preventDefault();
        const { subtotal, email } = this.state;

        const paymentObj = {
            amount: subtotal,
            email
        };
        console.log('payobj', paymentObj);
        this.getData(paymentObj).then(response => {
            console.log('resp', response);
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            console.log('info', information);
            this.post(information)
        })
    }
    componentDidMount() {
        if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('user_cart').length > 0) {
            let user_cart_items = [];
            let total_num_items = 0;
            let subtotal_amt = 0;
            user_cart_items = JSON.parse(sessionStorage.getItem('user_cart'));
            user_cart_items.map((item) => {
                total_num_items = total_num_items + item.qty;
                subtotal_amt = subtotal_amt + item.qty * item.price;
            })
            this.setState({ cart_items: user_cart_items, total_items: total_num_items, subtotal: subtotal_amt })
        }
    }
    render() {
        const { cart_items, firstname, lastname, email, address, total_items, subtotal } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                            <div className="order-heading">Here is your Order Details</div>
                            {cart_items && cart_items.length > 0 && cart_items.map((item, index) => {
                                return (
                                    <div className="row item-detail">
                                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                            <div className='item-cart-name'>
                                                {index + 1} . {item.name}
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
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                            Qty :{item.qty}
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                            &#8377; {item.price}<br></br>
                                            (price per qty)
                                        </div>
                                        <hr></hr>
                                    </div>)
                            })}
                        </div>
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 payment" >
                            <div className="heading">Payment Details</div>
                            <form className='payment-customer-details' onSubmit={this.Payments}>
                                <div className='user-first-name payment-cust-detail'>
                                    <label className='payment-usr-lbl'>First Name :</label>
                                    <input type='text' placeholder='Enter your First Name' required value={firstname}
                                        onChange={(e) => this.setState({ firstname: e.target.value, usrMsg: undefined })} minLength='6' maxLength='15' className='payment-user-input'></input>
                                </div>
                                <div className='user-last-name payment-cust-detail'>
                                    <label className='payment-usr-lbl'>Last Name :</label>
                                    <input type='text' placeholder='Enter your Last Name' required value={lastname}
                                        onChange={(e) => this.setState({ lastname: e.target.value, usrMsg: undefined })} minLength='6' maxLength='15' className='payment-user-input'></input>
                                </div>
                                <div className="payment-cust-detail">
                                    <label className='payment-usr-lbl'>Email :</label>
                                    <input type='email' placeholder='Enter your email' required value={email}
                                        onChange={(e) => this.setState({ email: e.target.value, usrMsg: undefined })} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        minLength='6' className='payment-user-input payment-user-input-email '></input>
                                </div>
                                <div className='user-address-info payment-cust-detail'>
                                    <label className='payment-usr-lbl payment-usr-lbl-delivery'>Delivery Location :</label>
                                    <textarea type="text" placeholder='Enter your address' required value={address}
                                        onChange={(e) => this.setState({ address: e.target.value, usrMsg: undefined })} className='payment-user-input payment-delivery-address'></textarea>
                                </div>
                                <div className="payment-total-price-qty-buy">
                                    <span className="payment-sub-total-buy">Subtotal ({this.state.total_items} items)</span>: <span className="cart-total-amt payment-total-amt">&#8377;{this.state.subtotal.toFixed(2)}</span>
                                    <div><button className="payment-buy-btn" type="submit" >Place Order</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Payment;