import react from "react";
import queryString from "query-string";
import axios from "axios";
import '../../Styles/Men/MenFilter.css';
import WithRouter from "../WithRouter";

class MenFilter extends react.Component {
    constructor() {
        super();
        this.state = {
            men_collections: [],
            fashion_id_men: undefined,
            prime: undefined,
            brand: undefined,
            lcost: undefined,
            hcost: undefined,
            rating: undefined,
            sort: undefined
        }
    }
    filterMenCollections = (filterobj) => {
        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionmen/filter",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: filterobj
        }).then(res => this.setState({ men_collections: res.data.fashionmen_collection_fillter })).catch(err => console.log(err));
    }
    checkforPrime = (state, value) => {
        let { prime, lcost, hcost, lrating, hrating, fashion_id_men, sort } = this.state;
        if (prime == value) {
            prime = undefined;
            this.setState({ [state]: prime });
        }
        else {
            prime = value
            this.setState({ [state]: prime })
        }

        const filterObj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_men, sort
        }
        this.filterMenCollections(filterObj);

    }
    setCost = (lcost, hcost) => {
        let { prime, lrating, hrating, fashion_id_men, sort } = this.state;
        this.setState({ lcost: lcost, hcost: hcost });
        const filterobj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_men, sort
        }
        this.filterMenCollections(filterobj);
    }
    checkforAvgRating = (lrating, hrating) => {
        let { prime, lcost, hcost, fashion_id_men, sort } = this.state;
        this.setState({ lrating: lrating, hrating: hrating });
        const filterobj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_men, sort
        }
        this.filterMenCollections(filterobj);
    }
    handlepriceSort = (sort) => {
        let { prime, lcost, hcost, lrating, hrating, fashion_id_men } = this.state;
        this.setState({ sort: sort });
        const filterobj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_men, sort
        }
        this.filterMenCollections(filterobj);
    }
    checkforItemDetail = (productId) => {
        this.props.router.navigate(`/men/detail?productId=${productId}`);
    }
    showfilterpage = () => {
        document.getElementById('men-filter-id').style.display = 'block';
    }

    hidefilterpage = () => {

        let element = document.getElementById('men-filter-id');
        element.style.display = 'none';
    }
    componentDidMount() {
        const { fashion_id_men } = queryString.parse(this.props.router.location.search);
        this.setState({ fashion_id_men: fashion_id_men });
        axios({
            url: `https://amazon-clone-db.herokuapp.com/fashionmen/${fashion_id_men}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ men_collections: res.data.fashion_men_collections })).catch(err => console.log(err))


    }
    render() {
        const { men_collections } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div>
                            <button className="mFilter" onClick={this.showfilterpage}>Filter</button>
                        </div>
                        <div className="men-filter col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2" id="men-filter-id">
                            <div className="prime-filter">
                                <lable className="lbl-men-fil-desc">Amazon Prime</lable>
                                <br />
                                <input type="checkbox" className="input-men-fil-desc" name="prime" onChange={() => this.checkforPrime('prime', true)} /><img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img" />
                                <br />
                            </div>
                            <div className="men-cost-filter">
                                <label className="lbl-men-fil-desc">Price</label>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="Less than 1000" name='cost' onChange={() => this.setCost(1, 999)} /><span className="item-men-filter">Less than &#8377;1,000</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="Between 1000 and 5000" name='cost' onChange={() => this.setCost(1000, 5000)} /><span className="item-men-filter">&#8377;1,000-&#8377;5,000</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="Between 5000 and 10000" name='cost' onChange={() => this.setCost(5001, 10000)} /><span className="item-men-filter">&#8377;5,000-&#8377;10,000</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="Between 10000 and 20000" name='cost' onChange={() => this.setCost(10001, 20000)} /><span className="item-men-filter">&#8377;10,000-&#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="Over 20000" name='cost' onChange={() => this.setCost(20001, 200000)} /><span className="item-men-filter">Above &#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="All" name='cost' onChange={() => this.setCost(undefined, undefined)} /><span className="item-men-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="rating-filter">
                                <label className="lbl-men-fil-desc">Avg. Customer Rating</label>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="1 and above" name='rating' onChange={() => this.checkforAvgRating(1, 2)} /><span className="item-men-filter">1 and above</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="2 and above" name='rating' onChange={() => this.checkforAvgRating(2, 3)} /><span className="item-men-filter">2 and above</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="3 and above" name='rating' onChange={() => this.checkforAvgRating(3, 4)} /><span className="item-men-filter">3 and above</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="4 and above" name='rating' onChange={() => this.checkforAvgRating(4, 6)} /><span className="item-men-filter">4 and above</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="All" name='rating' onChange={() => this.checkforAvgRating(undefined, undefined)} /><span className="item-men-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="price-sort-filter">
                                <label className="lbl-men-fil-desc">Sort</label>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="Price low to high" name="sort" onChange={() => this.handlepriceSort(1)} /><span className="item-men-filter">Price low to high</span>
                                <br />
                                <input type="radio" className="input-men-fil-desc" name="Price high to low" name="sort" onChange={() => this.handlepriceSort(-1)} /><span className="item-men-filter">Price high to low</span>
                            </div>
                            <button className="mFilterClose" onClick={this.hidefilterpage}>close</button>
                        </div>
                        <div className="men-brand-items col-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                            <div className="row">
                                {men_collections && men_collections.length > 0 && men_collections.map((men_items) => {
                                    return (<div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 men-img-item" key={men_items.productID} onClick={() => this.checkforItemDetail(men_items.productID)}>
                                        <div className="men-item">
                                            <img src={men_items.image} alt="mobile" />

                                        </div>
                                        <div className="men-description" >
                                            {men_items.name.length > 90 ? men_items.name.substring(0, 90) + '...' :
                                                men_items.name}
                                            <span className="tool-tip-text">{men_items.name}</span>
                                        </div>
                                        <div className="avg-rating">
                                            Rating : {men_items.stars}
                                        </div>
                                        <div className="item-price">
                                            Price: {men_items.price && men_items.price > 0 ? `${men_items.price_symbol}${men_items.price}` : 'Contact Support'}
                                        </div>
                                        <div className="prime-item">
                                            {men_items.has_prime == true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                        "/> : <p className="prime-desc">Not Eligible for Prime</p>}
                                        </div>
                                        <hr />
                                    </div>

                                    )
                                })}
                                {
                                    men_collections && men_collections.length === 0 && <div>
                                        <div className="user-msg">
                                            Sorry , We could not find any items with your search. Please look for other items.
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default WithRouter(MenFilter);