import react from "react";
import queryString from "query-string";
import axios from "axios";
import '../../Styles/HomeAppliances/HomeApplianceFilter.css';

class HomeApplianceFilter extends react.Component {
    constructor() {
        super();
        this.state = {
            home_appl_by_brand: [],
            prime: undefined,
            brand: undefined,
            lcost: undefined,
            hcost: undefined,
            rating: undefined,
            memory: '',
            sort: undefined
        }
    }
    filterHomeAppliances = (filterobj) => {
        axios({
            url: "https://amazon-clone-db.herokuapp.com/appliances/filter",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: filterobj
        }).then(res => this.setState({ home_appl_by_brand: res.data.appliances_collection_fillter })).catch(err => console.log(err));
    }
    checkforPrime = (state, value) => {
        let { prime, brand, lcost, hcost, lrating, hrating, sort } = this.state;
        if (prime == value) {
            prime = undefined;
            this.setState({ [state]: prime });
        }
        else {
            prime = value
            this.setState({ [state]: prime })
        }

        const filterObj = {
            prime, brand, lcost, hcost, lrating, hrating, sort
        }
        this.filterHomeAppliances(filterObj);

    }

    checkforBrand = (name) => {
        let { prime, lcost, hcost, lrating, hrating, sort } = this.state;
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let brand = [];
        checkboxes.forEach((checkbox) => {
            brand.push(parseInt(checkbox.value));
        });
        brand = brand.length > 0 ? brand : undefined;
        this.setState({ brand: brand });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort
        }
        this.filterHomeAppliances(filterobj);
    }
    setCost = (lcost, hcost) => {
        let { prime, brand, lrating, hrating, sort } = this.state;
        this.setState({ lcost: lcost, hcost: hcost });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort
        }
        this.filterHomeAppliances(filterobj);
    }
    checkforAvgRating = (lrating, hrating) => {
        let { prime, brand, lcost, hcost, sort } = this.state;
        this.setState({ lrating: lrating, hrating: hrating });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort
        }
        this.filterHomeAppliances(filterobj);
    }

    handlepriceSort = (sort) => {
        let { prime, brand, lcost, hcost, lrating, hrating } = this.state;
        this.setState({ sort: sort });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, sort
        }
        this.filterHomeAppliances(filterobj);
    }
    checkforItemDetail = (productId) => {
        this.props.history.push(`detail?productId=${productId}`);
    }
    showfilterpage = () => {
        document.getElementById('appliance-filter-id').style.display = 'block';
    }

    hidefilterpage = () => {

        let element = document.getElementById('appliance-filter-id');
        element.style.display = 'none';
    }
    componentDidMount() {
        const { home_appl_id } = queryString.parse(this.props.location.search);
        axios({
            url: `https://amazon-clone-db.herokuapp.com/appliances/${home_appl_id}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ home_appl_by_brand: res.data.appliances_by_brand })).catch(err => console.log(err))


    }
    render() {
        const { home_appl_by_brand } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div>
                            <button className="mFilter" onClick={this.showfilterpage}>Filter</button>
                        </div>
                        <div className="home-appl-filter col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2" id="appliance-filter-id">
                            <div className="prime-filter">
                                <lable className="lbl-appliance-fil-desc">Amazon Prime</lable>
                                <br />
                                <input type="checkbox" className="input-appliance-fil-desc" name="prime" onChange={() => this.checkforPrime('prime', true)} /><img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img" />
                                <br />
                            </div>
                            <div className="home-appl-brand-filter">
                                <label className="lbl-appliance-fil-desc">Brands</label>
                                <br />
                                <input type="checkbox" className="input-appliance-fil-desc" name="brand" value="1" onChange={() => this.checkforBrand("brand")} /><span className="item-appliance-filter">Bajaj</span>
                                <br />
                                <input type="checkbox" className="input-appliance-fil-desc" name="brand" value="2" onChange={() => this.checkforBrand("brand")} /><span className="item-appliance-filter">Philips</span>
                                <br />
                                <input type="checkbox" className="input-appliance-fil-desc" name="brand" value="3" onChange={() => this.checkforBrand("brand")} /><span className="item-appliance-filter">Pigeon</span>
                                <br />
                                <input type="checkbox" className="input-appliance-fil-desc" name="brand" value="4" onChange={() => this.checkforBrand("brand")} /><span className="item-appliance-filter">Bosch</span>
                                <br />
                            </div>
                            <div className="home-appl-cost-filter">
                                <label className="lbl-appliance-fil-desc">Price</label>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="Less than 1000" name='cost' onChange={() => this.setCost(1, 999)} /><span className="item-appliance-filter">Less than &#8377;1,000</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="Between 1000 and 5000" name='cost' onChange={() => this.setCost(1000, 5000)} /><span className="item-appliance-filter">&#8377;1,000-&#8377;5,000</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="Between 5000 and 10000" name='cost' onChange={() => this.setCost(5001, 10000)} /><span className="item-appliance-filter">&#8377;5,000-&#8377;10,000</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="Between 10000 and 20000" name='cost' onChange={() => this.setCost(10001, 20000)} /><span className="item-appliance-filter">&#8377;10,000-&#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="Over 20000" name='cost' onChange={() => this.setCost(20001, 200000)} /><span className="item-appliance-filter">Above &#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="All" name='cost' onChange={() => this.setCost(undefined, undefined)} /><span className="item-appliance-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="rating-filter">
                                <label className="lbl-appliance-fil-desc">Avg. Customer Rating</label>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="1 and above" name='rating' onChange={() => this.checkforAvgRating(1, 2)} /><span className="item-appliance-filter">1 and above</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="2 and above" name='rating' onChange={() => this.checkforAvgRating(2, 3)} /><span className="item-appliance-filter"> 2 and above</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="3 and above" name='rating' onChange={() => this.checkforAvgRating(3, 4)} /><span className="item-appliance-filter">3 and above</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="4 and above" name='rating' onChange={() => this.checkforAvgRating(4, 6)} /><span className="item-appliance-filter">4 and above</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="All" name='rating' onChange={() => this.checkforAvgRating(undefined, undefined)} /><span className="item-appliance-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="price-sort-filter">
                                <label className="lbl-appliance-fil-desc">Sort</label>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="Price low to high" name="sort" onChange={() => this.handlepriceSort(1)} /><span className="item-appliance-filter">Price low to high</span>
                                <br />
                                <input type="radio" className="input-appliance-fil-desc" name="Price high to low" name="sort" onChange={() => this.handlepriceSort(-1)} /><span className="item-appliance-filter">Price high to low</span>
                            </div>
                            <button className="mFilterClose" onClick={this.hidefilterpage}>close</button>
                        </div>
                        <div className="home-appl-brand-items col-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                            <div className="row">
                                {home_appl_by_brand && home_appl_by_brand.length > 0 && home_appl_by_brand.map((home_appl_items) => {
                                    return (<div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 home-appl-img-item" key={home_appl_items.productID} onClick={() => this.checkforItemDetail(home_appl_items.productID)}>
                                        <div className="home-appl-item">
                                            <img src={home_appl_items.image} alt="mobile" />

                                        </div>
                                        <div className="home-appl-description" >
                                            {home_appl_items.name.length > 90 ? home_appl_items.name.substring(0, 90) + '...' :
                                                home_appl_items.name}
                                            <span className="tool-tip-text">{home_appl_items.name}</span>
                                        </div>
                                        <div className="avg-rating">
                                            Rating : {home_appl_items.stars}
                                        </div>
                                        <div className="item-price">
                                            Price: {home_appl_items.price && home_appl_items.price > 0 ? `${home_appl_items.price_symbol}${home_appl_items.price}` : 'Contact Support'}
                                        </div>
                                        <div className="prime-item">
                                            {home_appl_items.has_prime == true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                        "/> : <p className="prime-desc">Not Eligible for Prime</p>}
                                        </div>
                                        <hr />
                                    </div>

                                    )
                                })}
                                {
                                    home_appl_by_brand && home_appl_by_brand.length === 0 && <div>
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

export default HomeApplianceFilter;