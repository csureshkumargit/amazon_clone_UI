import react from "react";
import queryString from "query-string";
import axios from "axios";
import '../Styles/searchproduct.css';
import WithRouter from "./WithRouter";
class Searchproduct extends react.Component {
    constructor() {
        super();
        this.state = {
            searchproducts: [],
            searchword: undefined
        }
    }

    checkforItemDetail = (product, productId) => {
        this.props.router.navigate(`/${product}/detail?productId=${productId}`);
    }
    componentDidUpdate(prevProps, prevState) {
        let { searchproductword } = queryString.parse(this.props.router.location.search);
        console.log('sp', searchproductword);
        const { searchproducts, searchword } = this.state;
        console.log('sp1', prevState.searchword);
        if (searchword != searchproductword) {
            axios(
                {
                    url: `https://amazon-clone-db.herokuapp.com/searchproduct/${searchproductword}`,
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'get'
                }
            ).then((res) => this.setState({ searchproducts: res.data.searchproduct, searchword: searchproductword })).catch(err => console.log(err))
        }
    }

    componentDidMount() {
        const { searchproductword } = queryString.parse(this.props.router.location.search);
        this.setState({ searchword: searchproductword });
        axios(
            {
                url: `https://amazon-clone-db.herokuapp.com/searchproduct/${searchproductword}`,
                headers: {
                    'content-type': 'application/json'
                },
                method: 'get'
            }
        ).then((res) => this.setState({ searchproducts: res.data.searchproduct })).catch(err => console.log(err))
    }
    render() {
        const { searchproducts } = this.state;

        return (
            <div className="container">
                <div className="row">

                    {searchproducts && searchproducts.length > 0 && searchproducts.map((resultitem) => {
                        let product = '';
                        if ('mobile_id' in resultitem) {
                            product = 'mobile'
                        }
                        else if ('electronics_id' in resultitem) {
                            product = 'electronics'
                        }
                        else if ('home_appl_id' in resultitem) {
                            product = 'home-appliances'
                        }
                        else if ('fashion_id_kids' in resultitem) {
                            product = 'kids'
                        }
                        else if ('fashion_id_men' in resultitem) {
                            product = 'men'
                        }
                        else if ('fashion_id_women' in resultitem) {
                            product = 'women'
                        }
                        return (<div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 search-product-img-item" key={resultitem.productID} onClick={() => this.checkforItemDetail(product, resultitem.productID)}>
                            <div className="search-product-item">
                                <img src={resultitem.image} alt="mobile" />

                            </div>
                            <div className="search-product-description" >
                                {resultitem.name.length > 90 ? resultitem.name.substring(0, 90) + '...' :
                                    resultitem.name}
                                <span className="tool-tip-text">{resultitem.name}</span>
                            </div>
                            <div className="avg-rating">
                                Rating : {resultitem.stars}
                            </div>
                            <div className="item-price">
                                Price: {resultitem.price && resultitem.price > 0 ? `${resultitem.price_symbol}${resultitem.price}` : 'Contact Support'}
                            </div>
                            <div className="prime-item">
                                {resultitem.has_prime === true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                        "/> : <p className="prime-desc">Not Eligible for Prime</p>}
                            </div>

                        </div>

                        )
                    })}
                    {
                        searchproducts && searchproducts.length === 0 && <div>
                            <div className="user-msg">
                                Sorry , We could not find any items with your search. Please look for other items.
                            </div>
                        </div>
                    }
                </div>
            </div>
        )

    }
}
export default WithRouter(Searchproduct);
