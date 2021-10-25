import react from "react";
import queryString from "query-string";
import axios from "axios";
import '../../Styles/Kids/KidsFilter.css';

class KidsFilter extends react.Component {
    constructor() {
        super();
        this.state = {
            kids_collections: [],
            fashion_id_kids: undefined,
            prime: undefined,
            brand: undefined,
            lcost: undefined,
            hcost: undefined,
            rating: undefined,
            sort: undefined
        }
    }
    filterKidsCollections = (filterobj) => {
        axios({
            url: "https://amazon-clone-db.herokuapp.com/fashionkids/filter",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: filterobj
        }).then(res => this.setState({ kids_collections: res.data.fashionkids_collection_fillter })).catch(err => console.log(err));
    }
    checkforPrime = (state, value) => {
        let { prime, lcost, hcost, lrating, hrating, fashion_id_kids, sort } = this.state;
        if (prime == value) {
            prime = undefined;
            this.setState({ [state]: prime });
        }
        else {
            prime = value
            this.setState({ [state]: prime })
        }

        const filterObj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_kids, sort
        }
        this.filterKidsCollections(filterObj);

    }
    setCost = (lcost, hcost) => {
        let { prime, lrating, hrating, fashion_id_kids, sort } = this.state;
        this.setState({ lcost: lcost, hcost: hcost });
        const filterobj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_kids, sort
        }
        this.filterKidsCollections(filterobj);
    }
    checkforAvgRating = (lrating, hrating) => {
        let { prime, lcost, hcost, fashion_id_kids, sort } = this.state;
        this.setState({ lrating: lrating, hrating: hrating });
        const filterobj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_kids, sort
        }
        this.filterKidsCollections(filterobj);
    }
    handlepriceSort = (sort) => {
        let { prime, lcost, hcost, lrating, hrating, fashion_id_kids } = this.state;
        this.setState({ sort: sort });
        const filterobj = {
            prime, lcost, hcost, lrating, hrating, fashion_id_kids, sort
        }
        this.filterKidsCollections(filterobj);
    }
    checkforItemDetail = (productId) => {
        this.props.history.push(`detail?productId=${productId}`);
    }
    showfilterpage = () => {
        document.getElementById('kids-filter-id').style.display = 'block';
    }

    hidefilterpage = () => {

        let element = document.getElementById('kids-filter-id');
        element.style.display = 'none';
    }
    componentDidMount() {
        const { fashion_id_kids } = queryString.parse(this.props.location.search);
        this.setState({ fashion_id_kids: fashion_id_kids });
        axios({
            url: `https://amazon-clone-db.herokuapp.com/fashionkids/${fashion_id_kids}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ kids_collections: res.data.fashion_kids_collections })).catch(err => console.log(err))


    }
    render() {
        const { kids_collections } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div>
                            <button className="mFilter" onClick={this.showfilterpage}>Filter</button>
                        </div>
                        <div className="kids-filter col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2" id="kids-filter-id">
                            <div className="prime-filter">
                                <lable className="lbl-kids-fil-desc">Amazon Prime</lable>
                                <br />
                                <input type="checkbox" className="input-kids-fil-desc" name="prime" onChange={() => this.checkforPrime('prime', true)} /><img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img" />
                                <br />
                            </div>
                            <div className="kids-cost-filter">
                                <label className="lbl-kids-fil-desc">Price</label>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="Less than 1000" name='cost' onChange={() => this.setCost(1, 999)} /><span className="item-kids-filter">Less than &#8377;1,000</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="Between 1000 and 5000" name='cost' onChange={() => this.setCost(1000, 5000)} /><span className="item-kids-filter">&#8377;1,000-&#8377;5,000</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="Between 5000 and 10000" name='cost' onChange={() => this.setCost(5001, 10000)} /><span className="item-kids-filter">&#8377;5,000-&#8377;10,000</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="Between 10000 and 20000" name='cost' onChange={() => this.setCost(10001, 20000)} /><span className="item-kids-filter">&#8377;10,000-&#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="Over 20000" name='cost' onChange={() => this.setCost(20001, 200000)} /><span className="item-kids-filter">Above &#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="All" name='cost' onChange={() => this.setCost(undefined, undefined)} /><span className="item-kids-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="rating-filter">
                                <label className="lbl-kids-fil-desc">Avg. Customer Rating</label>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="1 and above" name='rating' onChange={() => this.checkforAvgRating(1, 2)} /><span className="item-kids-filter">1 and above</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="2 and above" name='rating' onChange={() => this.checkforAvgRating(2, 3)} /><span className="item-kids-filter">2 and above</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="3 and above" name='rating' onChange={() => this.checkforAvgRating(3, 4)} /><span className="item-kids-filter">3 and above</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="4 and above" name='rating' onChange={() => this.checkforAvgRating(4, 6)} /><span className="item-kids-filter">4 and above</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="All" name='rating' onChange={() => this.checkforAvgRating(undefined, undefined)} /><span className="item-kids-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="price-sort-filter">
                                <label className="lbl-kids-fil-desc">Sort</label>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="Price low to high" name="sort" onChange={() => this.handlepriceSort(1)} /><span className="item-kids-filter"> Price low to high</span>
                                <br />
                                <input type="radio" className="input-kids-fil-desc" name="Price high to low" name="sort" onChange={() => this.handlepriceSort(-1)} /><span className="item-kids-filter">Price high to low</span>
                            </div>
                            <button className="mFilterClose" onClick={this.hidefilterpage}>close</button>
                        </div>
                        <div className="kids-brand-items col-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                            <div className="row">
                                {kids_collections && kids_collections.length > 0 && kids_collections.map((kids_items) => {
                                    return (<div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 kids-img-item" key={kids_items.productID} onClick={() => this.checkforItemDetail(kids_items.productID)}>
                                        <div className="kids-item">
                                            <img src={kids_items.image} alt="mobile" />

                                        </div>
                                        <div className="kids-description" >
                                            {kids_items.name.length > 90 ? kids_items.name.substring(0, 90) + '...' :
                                                kids_items.name}
                                            <span className="tool-tip-text">{kids_items.name}</span>
                                        </div>
                                        <div className="avg-rating">
                                            Rating : {kids_items.stars}
                                        </div>
                                        <div className="item-price">
                                            Price: {kids_items.price && kids_items.price > 0 ? `${kids_items.price_symbol}${kids_items.price}` : 'Contact Support'}
                                        </div>
                                        <div className="prime-item">
                                            {kids_items.has_prime == true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                        "/> : <p className="prime-desc">Not Eligible for Prime</p>}
                                        </div>
                                        <hr />
                                    </div>

                                    )
                                })}
                                {
                                    kids_collections && kids_collections.length === 0 && <div>
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

export default KidsFilter;