import react from "react";
import queryString from "query-string";
import axios from "axios";
import '../../Styles/Mobile/MobileFilter.css';

class MobileFilter extends react.Component {
    constructor() {
        super();
        this.state = {
            mobile_by_brand: [],
            prime: undefined,
            brand: undefined,
            lcost: undefined,
            hcost: undefined,
            rating: undefined,
            memory: '',
            sort: undefined
        }
    }
    filterMobile = (filterobj) => {
        axios({
            url: "https://amazon-clone-db.herokuapp.com/mobile/filter",
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: filterobj
        }).then(res => this.setState({ mobile_by_brand: res.data.mobile_collection_fillter })).catch(err => console.log(err));
    }
    checkforPrime = (state, value) => {
        let { prime, brand, lcost, hcost, lrating, hrating, memory, sort } = this.state;
        if (prime == value) {
            prime = undefined;
            this.setState({ [state]: prime });
        }
        else {
            prime = value
            this.setState({ [state]: prime })
        }

        const filterObj = {
            prime, brand, lcost, hcost, lrating, hrating, memory, sort
        }
        this.filterMobile(filterObj);

    }

    checkforBrand = (name) => {
        let { prime, lcost, hcost, lrating, hrating, memory, sort } = this.state;
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let brand = [];
        checkboxes.forEach((checkbox) => {
            brand.push(parseInt(checkbox.value));
        });
        brand = brand.length > 0 ? brand : undefined;
        this.setState({ brand: brand });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, memory, sort
        }
        this.filterMobile(filterobj);
    }
    setCost = (lcost, hcost) => {
        let { prime, brand, lrating, hrating, memory, sort } = this.state;
        this.setState({ lcost: lcost, hcost: hcost });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, memory, sort
        }
        this.filterMobile(filterobj);
    }
    checkforAvgRating = (lrating, hrating) => {
        let { prime, brand, lcost, hcost, memory, sort } = this.state;
        this.setState({ lrating: lrating, hrating: hrating });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, memory, sort
        }
        this.filterMobile(filterobj);
    }
    checkforProcessorMemory = (memory) => {
        let { prime, brand, lcost, hcost, lrating, hrating, sort } = this.state;
        this.setState({ memory: memory });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, memory, sort
        }
        this.filterMobile(filterobj);
    }
    handlepriceSort = (sort) => {
        let { prime, brand, lcost, hcost, lrating, hrating, memory } = this.state;
        this.setState({ sort: sort });
        const filterobj = {
            prime, brand, lcost, hcost, lrating, hrating, memory, sort
        }
        this.filterMobile(filterobj);
    }
    checkforItemDetail = (productId) => {
        this.props.history.push(`detail?productId=${productId}`);
    }
    showfilterpage = () => {
        document.getElementById('mobile-filter-id').style.display = 'block';
    }

    hidefilterpage = () => {

        let element = document.getElementById('mobile-filter-id');
        element.style.display = 'none';
    }
    componentDidMount() {
        const { mobile_id } = queryString.parse(this.props.location.search);
        axios({
            url: `https://amazon-clone-db.herokuapp.com/mobile/${mobile_id}`,
            Headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        }).then(res => this.setState({ mobile_by_brand: res.data.mobile_by_brand })).catch(err => console.log(err))


    }
    render() {
        const { mobile_by_brand } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div>
                            <button className="mFilter" onClick={this.showfilterpage}>Filter</button>
                        </div>
                        <div className="mobile-filter col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2" id="mobile-filter-id">
                            <div className="prime-filter">
                                <lable className="lbl-mobile-fil-desc">Prime</lable>
                                <br />
                                <input type="checkbox" className="input-mobile-fil-desc" name="prime" onChange={() => this.checkforPrime('prime', true)} /><img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img" />
                                <br />
                            </div>
                            <div className="mobile-brand-filter">
                                <label className="lbl-mobile-fil-desc">Brands</label>
                                <br />
                                <input type="checkbox" className="input-mobile-fil-desc" name="brand" value="1" onChange={() => this.checkforBrand("brand")} /><span className="item-mobile-filter">OnePlus</span>
                                <br />
                                <input type="checkbox" className="input-mobile-fil-desc" name="brand" value="2" onChange={() => this.checkforBrand("brand")} /><span className="item-mobile-filter">Redmi</span>
                                <br />
                                <input type="checkbox" className="input-mobile-fil-desc" name="brand" value="3" onChange={() => this.checkforBrand("brand")} /><span className="item-mobile-filter">Samsung</span>
                                <br />
                                <input type="checkbox" className="input-mobile-fil-desc" name="brand" value="4" onChange={() => this.checkforBrand("brand")} /><span className="item-mobile-filter">IQOO</span>
                                <br />
                                <input type="checkbox" className="input-mobile-fil-desc" name="brand" value="5" onChange={() => this.checkforBrand("brand")} /><span className="item-mobile-filter">Apple</span>
                                <br />
                                <input type="checkbox" className="input-mobile-fil-desc" name="brand" value="6" onChange={() => this.checkforBrand("brand")} /><span className="item-mobile-filter">Vivo</span>
                            </div>
                            <div className="mobile-cost-filter">
                                <label className="lbl-mobile-fil-desc">Price</label>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="Less than 1000" name='cost' onChange={() => this.setCost(1, 999)} /><span className="item-mobile-filter">Less than &#8377;1,000</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="Between 1000 and 5000" name='cost' onChange={() => this.setCost(1000, 5000)} /><span className="item-mobile-filter">&#8377;1,000-&#8377;5,000</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="Between 5000 and 10000" name='cost' onChange={() => this.setCost(5001, 10000)} /><span className="item-mobile-filter">&#8377;5,000-&#8377;10,000</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="Between 10000 and 20000" name='cost' onChange={() => this.setCost(10001, 20000)} /><span className="item-mobile-filter">&#8377;10,000-&#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="Over 20000" name='cost' onChange={() => this.setCost(20001, undefined)} /><span className="item-mobile-filter">Above &#8377;20,000</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="All" name='cost' onChange={() => this.setCost(undefined, undefined)} /><span className="item-mobile-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="rating-filter">
                                <label className="lbl-mobile-fil-desc">Avg. Customer Rating</label>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="1 and above" name='rating' onChange={() => this.checkforAvgRating(1, undefined)} /><span className="item-mobile-filter">1 and above</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="2 and above" name='rating' onChange={() => this.checkforAvgRating(2, undefined)} /><span className="item-mobile-filter">2 and above</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="3 and above" name='rating' onChange={() => this.checkforAvgRating(3, undefined)} /><span className="item-mobile-filter">3 and above</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="4 and above" name='rating' onChange={() => this.checkforAvgRating(4, undefined)} /><span className="item-mobile-filter">4 and above</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="All" name='rating' onChange={() => this.checkforAvgRating(undefined, undefined)} /><span className="item-mobile-filter">All</span>
                                <br />
                                <br />
                            </div>
                            <div className="mobile-memory-filter">
                                <label className="lbl-mobile-fil-desc">RAM</label>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="memory" onChange={() => this.checkforProcessorMemory('.*8GB RAM.*')} /><span className="item-mobile-filter">8 GB</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="memory" onChange={() => this.checkforProcessorMemory('.*6GB RAM.*')} /><span className="item-mobile-filter">6 GB</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="memory" onChange={() => this.checkforProcessorMemory('.*4GB RAM.*')} /><span className="item-mobile-filter">4 GB</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="memory" onChange={() => this.checkforProcessorMemory('.*3GB RAM.*')} /><span className="item-mobile-filter">3 GB</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="memory" onChange={() => this.checkforProcessorMemory('.*2GB RAM.*')} /><span className="item-mobile-filter">2 GB</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="memory" onChange={() => this.checkforProcessorMemory('.*1GB RAM.*')} /><span className="item-mobile-filter">1 GB</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="memory" onChange={() => this.checkforProcessorMemory(undefined)} /><span className="item-mobile-filter">All</span>
                            </div>
                            <div className="price-sort-filter">
                                <label className="lbl-mobile-fil-desc">Sort</label>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="Price low to high" name="sort" onChange={() => this.handlepriceSort(1)} /><span className="item-mobile-filter">Price low to high</span>
                                <br />
                                <input type="radio" className="input-mobile-fil-desc" name="Price high to low" name="sort" onChange={() => this.handlepriceSort(-1)} /><span className="item-mobile-filter">Price high to low</span>
                            </div>
                            <button className="mFilterClose" onClick={this.hidefilterpage}>close</button>
                        </div>
                        <div className="mobile-brand-items col-9 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                            <div className="row">
                                {mobile_by_brand && mobile_by_brand.length > 0 && mobile_by_brand.map((mobile_items) => {
                                    return (<div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mobile-img-item" key={mobile_items.productID} onClick={() => this.checkforItemDetail(mobile_items.productID)}>
                                        <div className="mobile-item">
                                            <img src={mobile_items.image} alt="mobile" />

                                        </div>
                                        <div className="mobile-description" >
                                            {mobile_items.name.length > 90 ? mobile_items.name.substring(0, 90) + '...' :
                                                mobile_items.name}
                                            <span className="tool-tip-text">{mobile_items.name}</span>
                                        </div>
                                        <div className="avg-rating">
                                            Rating : {mobile_items.stars}
                                        </div>
                                        <div className="item-price">
                                            Price: {mobile_items.price && mobile_items.price > 0 ? `${mobile_items.price_symbol}${mobile_items.price}` : 'Contact Support'}
                                        </div>
                                        <div className="prime-item">
                                            {mobile_items.has_prime == true ? <img src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png" alt="prime-img 
                                        "/> : <p className="prime-desc">Not Eligible for Prime</p>}
                                        </div>
                                        <hr />
                                    </div>

                                    )
                                })}
                                {
                                    mobile_by_brand && mobile_by_brand.length === 0 && <div>
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

export default MobileFilter;