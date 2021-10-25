import react from "react";
import '../Styles/Footer.css';
class Footer extends react.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-section-2">
                    <div className="footer-2 about">
                        <ul>
                            <li style={{ fontFamily: "bolder", fontSize: "1.2em" }}> Get to Know Us</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press Releases</li>
                            <li>Amazon Cares</li>
                            <li>Gift a Smile</li>
                        </ul>
                    </div>
                    <div className="footer-2 connect">
                        <ul>
                            <li style={{ fontFamily: "bolder", fontSize: "1.2em" }}>Connect with Us</li>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
                    <div className="footer-2 make-money">
                        <ul>
                            <li style={{ fontFamily: "bolder", fontSize: "1.2em" }}>Make Money with Us</li>
                            <li>Sell on Amazon</li>
                            <li>Sell under Amazon Accelerator</li>
                            <li>Amazon Global Selling </li>
                            <li>Become an Affiliate</li>
                            <li>Fulfilment by Amazon</li>
                            <li>Advertise your Product</li>
                        </ul>
                    </div>
                    <div className="footer-2 Help">
                        <ul>
                            <li style={{ fontFamily: "bolder", fontSize: "1.2em" }}>Get to Know Us</li>
                            <li>COVID-19 and Amazon</li>
                            <li>Your Account</li>
                            <li>Returns Centre</li>
                            <li>Help</li>
                        </ul>
                    </div>
                    <hr ></hr>
                </div>
                <div className="splitter">
                    <hr style={{ marginTop: "-1%" }}></hr>
                </div>
                <div className="footer-section-3">
                    <div className="sub-footer-sec-3">
                        <div className="logo-sec">
                            <img className='logo-footer' src={`./Assets/Images/Logo/Amazon-India-Logo.png`} />
                        </div>
                        <div className="lang-footer">
                            <button className="language">English</button>
                        </div>
                        <div className="footer-amazon-countries">
                            <span className="amazon-countries">Australia</span>
                            <span className="amazon-countries">Brazil</span>
                            <span className="amazon-countries">Canada</span>
                            <span className="amazon-countries">China</span>
                            <span className="amazon-countries">France</span>
                        </div>
                    </div>
                </div>
                <div className="footer-section-4">
                    <div className="footer-4">
                        <span className="sub-footer-section-4">Condition of Use &#38; Sale </span>
                        <span className="sub-footer-section-4">Privacy Notice</span>
                        <span className="sub-footer-section-4">Interest-Based Ads</span>
                        <span className="sub-footer-section-4">© 1996-2021, Amazon.com, Inc. or its affiliates</span>
                    </div>
                </div>
            </div >
        )
    }
}
export default Footer;