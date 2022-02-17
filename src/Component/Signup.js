import react from "react";
import axios from "axios";
import '../Styles/Signup.css';
import WithRouter from "./WithRouter";
class Signup extends react.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            usrMsg: ''
        }
    }

    showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }

    }
    navigateToLoginPage = () => {
        this.props.router.navigate('/login');

    }

    checkUserSignup = (e) => {
        e.preventDefault();
        const { username, email, password, usrMsg } = this.state;
        const userinfo = {
            username,
            email,
            password
        }
        console.log('info', userinfo);
        axios(
            {
                url: "https://amazon-clone-db.herokuapp.com/api/user/Register",
                Headers: {
                    'content-type': 'application/json'
                },
                method: "POST",
                data: userinfo
            }
        ).then(res => this.setState({ usrMsg: res.data.message })).catch(err => console.log('err', err))

    }

    render() {
        const { username, email, password, usrMsg } = this.state;
        return (
            <div className='sign-up-container'>
                <h5 className="sign-up-heading"> Please , add your information </h5>
                <form className='sign-up-account' onSubmit={this.checkUserSignup}>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-4 user-sign-in-up row">
                        <label className="form-label">User Name :</label>
                        <input type='text' placeholder='Enter the User Name' required value={username}
                            onChange={(e) => this.setState({ username: e.target.value, usrMsg: undefined })} minLength='6' maxLength='15' class="form-control"></input>
                    </div>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-4 user-sign-in-up row">
                        <label className='form-label'>Email :</label>
                        <input type='email' placeholder='Enter your email' required value={email}
                            onChange={(e) => this.setState({ email: e.target.value, usrMsg: undefined })} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            minLength='6' className='form-control'></input>
                    </div>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-4 user-sign-in-up row">
                        <label className='form-label'>Password :</label>
                        <input className='form-control' type='password' placeholder='Enter your password' required value={password}
                            onChange={(e) => this.setState({ password: e.target.value, usrMsg: undefined })}
                            id='password'
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 6 or more characters"></input>
                    </div>
                    <div>
                        <input type='checkbox' className='show-password-signup user-sign-in-up' onClick={this.showPassword}></input>Show Password
                    </div>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-6 col-xl-4 user-sign-in-up row">
                        <div>
                            <button className='btn-user-sign-up-submit form-control' type='submit' >Signup</button>
                        </div>
                        {usrMsg && <button className="btn-sign-up-message form-control" type="button" onClick={this.navigateToLoginPage}>{usrMsg.includes('been') ? "Registered !!!.Please Login to continue." : usrMsg}</button>}
                    </div>
                </form>
            </div >
        )
    }
}

export default WithRouter(Signup);