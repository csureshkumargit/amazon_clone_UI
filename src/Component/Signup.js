import react from "react";
import axios from "axios";
import '../Styles/Signup.css';
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
        this.props.history.push('/login');

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
                    <div className='sign-up-user-name'>
                        <label className='sign-up-usr-acct-lbl'>User Name :</label>
                        <input type='text' placeholder='Enter the User Name' required value={username}
                            onChange={(e) => this.setState({ username: e.target.value, usrMsg: undefined })} minLength='6' maxLength='15' className='usr-acct-input'></input>
                    </div>
                    <div>
                        <label className='sign-up-usr-acct-lbl'>Email :</label>
                        <input type='email' placeholder='Enter your email' required value={email}
                            onChange={(e) => this.setState({ email: e.target.value, usrMsg: undefined })} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            minLength='6' className='sign-up-acct-input'></input>
                    </div>
                    <div>
                        <label className='sign-up-usr-acct-lbl'>Password :</label>
                        <input className='sign-up-acct-input' type='password' placeholder='Enter your password' required value={password}
                            onChange={(e) => this.setState({ password: e.target.value, usrMsg: undefined })}
                            id='password'
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 6 or more characters"></input>
                        <div>
                            <input type='checkbox' className='show-password-signup' onClick={this.showPassword}></input>Show Password
                        </div>
                    </div>
                    <div>
                        <div>
                            <button className='btn-user-sign-up-submit' type='submit' >Signup</button>
                        </div>
                        {usrMsg && <button className="btn-sign-up-message" type="button" onClick={this.navigateToLoginPage}>{usrMsg.includes('been') ? "Registered !!!.Please Login to continue." : usrMsg}</button>}
                    </div>
                </form>
            </div >
        )
    }
}

export default Signup;