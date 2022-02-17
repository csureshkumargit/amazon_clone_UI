import react from "react";
import axios from "axios";
import WithRouter from "./WithRouter";
import '../Styles/Login.css';
class Login extends react.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: '',
            jwt_token: '',
            usrMsg: undefined
        }
    }

    //successful login->save user info in session. if user_cart is in session then navigate to order page,elsehome page.
    //order page -> check user info is available in session then do payment..else pop up to login to place order.
    //order page -> final order detail , payment button, user email.,address(save user purchase hist collection.)
    //
    showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }

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

    navigateToHomeorOrderPage = () => {
        if (sessionStorage.getItem('user_cart') && sessionStorage.getItem('username') &&
            sessionStorage.getItem('jwt_token') && sessionStorage.getItem('user_cart').length > 0 &&
            sessionStorage.getItem('username').length > 0 && sessionStorage.getItem('jwt_token').length > 0) {
            this.saveUsertempOrders();
            this.props.router.navigate('/payment');
        }
        else if (!sessionStorage.getItem('user_cart') && sessionStorage.getItem('username') &&
            sessionStorage.getItem('jwt_token') &&
            sessionStorage.getItem('username').length > 0 && sessionStorage.getItem('jwt_token').length > 0) {
            let username = undefined;
            let user_temp_cart_items = [];
            username = sessionStorage.getItem('username');
            axios(
                {
                    url: `https://amazon-clone-db.herokuapp.com/api/tempOrders/${username}`,
                    Headers: {
                        'content-type': 'application/json'
                    },
                    method: "GET"
                }
            ).then(res => {
                if (res.data.user_temp_order && res.data.user_temp_order.items && res.data.user_temp_order.items.length > 0) {
                    user_temp_cart_items = res.data.user_temp_order.items;
                    sessionStorage.setItem('user_cart', JSON.stringify(user_temp_cart_items));
                }

            })
                .catch(err => console.log('err', err))
            this.props.router.navigate('/');
        }

        else {
            this.props.router.navigate('/');

        }
    }
    saveUserLoggedInfo = () => {
        const { username, jwt_token } = this.state;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('jwt_token', jwt_token);

    }
    navigateToSignupPage = () => {
        this.props.router.navigate('/signup');

    }
    checkUserLogin = (e) => {
        e.preventDefault();
        const { email, password, usrMsg } = this.state;
        const userinfo = {
            email,
            password
        }
        axios(
            {
                url: "https://amazon-clone-db.herokuapp.com/api/user/Login",

                headers: {
                    'content-type': 'application/json',
                },
                method: "POST",
                data: userinfo
            }
        ).then(res => {
            if (res.data.isAuthenticated)
                this.setState({ usrMsg: res.data.message, username: res.data.username, jwt_token: res.data.jwt });
            else
                this.setState({ usrMsg: res.data.message });
        })
            .catch(err => console.log('err', err))
        setTimeout(() => {
            this.saveUserLoggedInfo();
        }, 1000);

    }

    render() {
        const { email, password, usrMsg } = this.state;
        return (
            <div className='user-account-container'>
                <h5 className="sign-in-heading"> Please ,Sign in your information </h5>
                <form className='user-account' onSubmit={this.checkUserLogin}>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-4 user-sign-in-up row">
                        <label className="form-label">Email:</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder='Enter your email' required value={email}
                            onChange={(e) => this.setState({ email: e.target.value, usrMsg: undefined })} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            minLength='6' />
                    </div>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-4 user-sign-in-up row">
                        <label for="exampleFormControlTextarea1" className="form-label">Password :</label>
                        <input type="password" className="form-control" placeholder='Enter your password' required value={password}
                            onChange={(e) => this.setState({ password: e.target.value, usrMsg: undefined })}
                            id='password'
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 6 or 
                            more characters"/>
                    </div>
                    <div>
                        <input type='checkbox' className='show-password-signup user-sign-in-up' onClick={this.showPassword}></input>Show Password
                    </div>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-4 user-sign-in-up row">
                        <button className='btn-user-submit form-control' type='submit' >Login</button> <button className='btn-user-submit btn-user-signup form-control' type='button' onClick={this.navigateToSignupPage} >Create Account</button>
                        {usrMsg && <button className="btn-sign-in-message form-control" type="button" onClick={this.navigateToHomeorOrderPage}>{usrMsg.includes('been') ? "Logged in !!!.Please click to continue." : usrMsg}</button>}
                    </div>
                </form>
            </div >
        )
    }
}

export default WithRouter(Login);