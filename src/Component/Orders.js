import react from "react";
import axios from "axios";
import queryString from "query-string";
import '../Styles/Orders.css';
class Orders extends react.Component {
    constructor() {
        super();
        this.state = {
            user_orders: []
        }
    }
    componentDidMount() {
        const { username } = queryString.parse(this.props.location.search);
        console.log('usr', username);
        axios({
            url: `https://amazon-clone-db.herokuapp.com/api/orders/${username}`,
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ user_orders: res.data.user_order_history })).catch(err => console.log(err))

    }
    render() {
        const { user_orders } = this.state;
        return (
            <div>
                <div className="order-history-heading">Your Order History Details</div>
                <div className="container">
                    {user_orders && user_orders.length > 0 && user_orders.map((orders) => (
                        <div className="row">
                            <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3 ordered-date">
                                Ordered On : {orders.createdAt.substring(0, 10)}

                            </div>
                            <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                                {orders.items.map((item) => (
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6 col-lg-7 col-xl-8 order-item-name">
                                            {item.name}
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 order-item-qty">
                                            qty: {item.qty}
                                        </div>
                                        <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 order-item-price">
                                            {item.price_symbol} {item.price}
                                            (price per qty)
                                        </div>
                                    </div>



                                ))}

                            </div>
                        </div>

                    ))}
                </div>

            </div >



        )
    }
}

export default Orders;