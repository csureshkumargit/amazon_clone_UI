import react from "react";
import queryString from "query-string";
import axios from "axios";
import '../../Styles/Electronics/ElectronicsFilter.css';
import WithRouter from "../WithRouter";

class ElecronicsFilter extends react.Component {
    constructor() {
        super();
        this.state = {
            electronics_by_item: [],
            electronics_id: undefined,
            prime: undefined,
            brand: undefined,
            lcost: undefined,
            hcost: undefined,
            rating: undefined,
            sort: undefined
        }
    }
    filterElectronicsItems = (filterobj) => {
        axios({
            url: "https://amazon-clone-db.herokuapp.com/electronics/filter",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: filterobj
        }).then(res => this.setState({ electronics_by_item: res.data.electronics_collection_fillter })).catch(err => console.log(err));
    }
    checkforPrime = (state, value) => {
        let { prime, brand, lcost, hcost, lrating, hrating, sort, electronics_id } = this.state;
        if (prime == value) {
            prime = undefined;
            this.setState({ [state]: prime });
        }
        else {
            prime = value
            this.setState({ [state]: prime })
        }

        const filterObj = {
            prime, brand, lcost, hcost, lrating, hrating, sort, electronics_id
        }
        this.filterElectronicsItems(filterObj);

    }

    checkforBrand = (brand) => {
        let { prime, lcost, hcost, lrating, hrating, sort, electronics_id } = this.state;
        this.setState({ brand: brand });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort, electronics_id
        }
        this.filterElectronicsItems(filterobj);
    }
    setCost = (lcost, hcost) => {
        let { prime, brand, lrating, hrating, sort, electronics_id } = this.state;
        this.setState({ lcost: lcost, hcost: hcost });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort, electronics_id
        }
        this.filterElectronicsItems(filterobj);
    }
    checkforAvgRating = (lrating, hrating) => {
        let { prime, brand, lcost, hcost, sort, electronics_id } = this.state;
        this.setState({ lrating: lrating, hrating: hrating });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort, electronics_id
        }
        this.filterElectronicsItems(filterobj);
    }
    handlepriceSort = (sort) => {
        let { prime, brand, lcost, hcost, lrating, hrating, electronics_id } = this.state;
        this.setState({ sort: sort });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort, electronics_id
        }
        this.filterElectronicsItems(filterobj);
    }
    checkforItemDetail = (productId) => {
        this.props.router.navigate(`/electronics/detail?productId=${productId}`);
    }
    showfilterpage = () => {
        document.getElementById('electronics-filter-id').style.display = 'block';
    }

    hidefilterpage = () => {

        let element = document.getElementById('electronics-filter-id');
        element.style.display = 'none';
    }
    componentDidMount() {
        const { electronics_id } = queryString.parse(this.props.router.location.search);
        this.setState({ electronics_id: electronics_id });
        axios({
            url: `https://amazon-clone-db.herokuapp.com/electronics/${electronics_id}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ electronics_by_item: res.data.electronics_collections })).catch(err => console.log(err))


    }
    render() {
        const { electronics_by_item, electronics_id } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div>
                            <button className="mFilter" onClick={this.showfilterpage}>Filter</button>
                        </div>
                        <div className="electronics-filter col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2" id="electronics-filter-id">
                            <div className="prime-filter">
                                <lable className="lbl-electronics-fil-desc">Amazon Prime</lable>
                                <br />
                                <input className="input-electronics-fil-desc" type="checkbox" name="prime" onChange={() => this.checkforPrime('prime', true)} /><img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img" />
                                <br />
                            </div>
                            {electronics_id && electronics_id == 1 && <div className="electronic-brand-filter">
                                <label className="lbl-electronics-fil-desc">Brands</label>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="1" onChange={() => this.checkforBrand('.*iBall.*')} /><span className="item-electronics-filter">iBall</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="2" onChange={() => this.checkforBrand(".*Logitech.*")} /><span className="item-electronics-filter">Logitech</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="3" onChange={() => this.checkforBrand(".*boAt.*")} /><span className="item-electronics-filter">boAt</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="4" onChange={() => this.checkforBrand(".*JBL.*")} /><span className="item-electronics-filter">JBL</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" onChange={() => this.checkforBrand(undefined)} /><span className="item-electronics-filter">All</span>
                            </div>}
                            {electronics_id && electronics_id == 2 && <div className="electronic-brand-filter">
                                <label className="lbl-electronics-fil-desc">Brands</label>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="1" onChange={() => this.checkforBrand('.*HP.*')} /><span className="item-electronics-filter">HP</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="2" onChange={() => this.checkforBrand(".*Logitech.*")} /><span className="item-electronics-filter">Logitech</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="3" onChange={() => this.checkforBrand(".*Zebronics.*")} /><span className="item-electronics-filter">Zebronics</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="4" onChange={() => this.checkforBrand(".*iBall.*")} /><span className="item-electronics-filter">iBall</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" onChange={() => this.checkforBrand(undefined)} /><span className="item-electronics-filter">All</span>
                            </div>}
                            {electronics_id && electronics_id == 3 && <div className="electronic-brand-filter">
                                <label className="lbl-electronics-fil-desc">Brands</label>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="1" onChange={() => this.checkforBrand('.*Lenovo.*')} /><span className="item-electronics-filter">Lenovo</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="2" onChange={() => this.checkforBrand(".*SanDisk.*")} /><span className="item-electronics-filter">SanDisk</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="3" onChange={() => this.checkforBrand(".*100yellow.*")} /><span className="item-electronics-filter">100yellow</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" value="4" onChange={() => this.checkforBrand(".*boAt.*")} /><span className="item-electronics-filter">boAt</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="brand" onChange={() => this.checkforBrand(undefined)} /><span className="item-electronics-filter">All</span>
                            </div>}
                            <div className="electronic-cost-filter">
                                <label className="lbl-electronics-fil-desc">Price</label>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="Less than 1000" name='cost' onChange={() => this.setCost(1, 999)} /><span className="item-electronics-filter">Less than &#8377;1,000</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="Between 1000 and 5000" name='cost' onChange={() => this.setCost(1000, 5000)} /><span className="item-electronics-filter">&#8377;1,000-&#8377;5,000</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="Between 5000 and 10000" name='cost' onChange={() => this.setCost(5001, 10000)} /><span className="item-electronics-filter">&#8377;5,000-&#8377;10,000</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="Between 10000 and 20000" name='cost' onChange={() => this.setCost(10001, 20000)} /><span className="item-electronics-filter">&#8377;10,000-&#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="Over 20000" name='cost' onChange={() => this.setCost(20001, 200000)} /><span className="item-electronics-filter">Above &#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="All" name='cost' onChange={() => this.setCost(undefined, undefined)} /><span className="item-electronics-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="rating-filter">
                                <label className="lbl-electronics-fil-desc">Avg. Customer Rating</label>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="1 and above" name='rating' onChange={() => this.checkforAvgRating(1, 2)} /><span className="item-electronics-filter">1 and above</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="2 and above" name='rating' onChange={() => this.checkforAvgRating(2, 3)} /><span className="item-electronics-filter">2 and above</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="3 and above" name='rating' onChange={() => this.checkforAvgRating(3, 4)} /><span className="item-electronics-filter">3 and above</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="4 and above" name='rating' onChange={() => this.checkforAvgRating(4, 6)} /><span className="item-electronics-filter">4 and above</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="All" name='rating' onChange={() => this.checkforAvgRating(undefined, undefined)} /><span className="item-electronics-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="price-sort-filter">
                                <label className="lbl-electronics-fil-desc">Sort</label>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="Price low to high" name="sort" onChange={() => this.handlepriceSort(1)} /><span className="item-electronics-filter">Price low to high</span>
                                <br />
                                <input type="radio" className="input-electronics-fil-desc" name="Price high to low" name="sort" onChange={() => this.handlepriceSort(-1)} /><span className="item-electronics-filter">Price high to low</span>
                            </div>
                            <button className="mFilterClose" onClick={this.hidefilterpage}>close</button>
                        </div>
                        <div className="electronic-brand-items col-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                            <div className="row">
                                {electronics_by_item && electronics_by_item.length > 0 && electronics_by_item.map((electronics_items) => {
                                    return (<div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 electronic-img-item" key={electronics_items.productID} onClick={() => this.checkforItemDetail(electronics_items.productID)}>
                                        <div className="electronic-item">
                                            <img src={electronics_items.image} alt="mobile" />

                                        </div>
                                        <div className="electronic-description" >
                                            {electronics_items.name.length > 90 ? electronics_items.name.substring(0, 90) + '...' :
                                                electronics_items.name}
                                            <span className="tool-tip-text">{electronics_items.name}</span>
                                        </div>
                                        <div className="avg-rating">
                                            Rating : {electronics_items.stars}
                                        </div>
                                        <div className="item-price">
                                            Price: {electronics_items.price && electronics_items.price > 0 ? `${electronics_items.price_symbol}${electronics_items.price}` : 'Contact Support'}
                                        </div>
                                        <div className="prime-item">
                                            {electronics_items.has_prime == true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                        "/> : <p className="prime-desc">Not Eligible for Prime</p>}
                                        </div>

                                    </div>

                                    )
                                })}
                                {
                                    electronics_by_item && electronics_by_item.length === 0 && <div>
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

export default WithRouter(ElecronicsFilter);