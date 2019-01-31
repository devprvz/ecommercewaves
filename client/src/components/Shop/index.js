import React, { Component } from 'react'
import PageTop from '../utils/page_top';

import { connect } from 'react-redux';
import { getBrands, getWoods, getProductsToShop } from '../../actions/products_actions';
import { frets, price } from '../utils/Form/fixed_categories';

import CollapseCheckBox from '../utils/collapsecheckBox';
import CollapseRadio from '../utils/collapsradio';

import LoadmoreCards from './LoadmoreCards';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faTh,faBars} from '@fortawesome/fontawesome-free-solid';

class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }

    handlePrice = value => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }
        return array
    }

    handleFilters = (filters, category) => {
        const newFilters = { ...this.state.filters }
        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = this.handlePrice(filters)
            newFilters[category] = priceValues
        }
        this.showFilteredResults(newFilters)
        this.setState({
            filters: newFilters
        })
    }

    showFilteredResults=(filters)=>{
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip:0
            })
        })
    }

    loadMore=()=>{
        let {skip, limit, filters}=this.state
        skip=skip+limit;

        this.props.dispatch(getProductsToShop(
            skip,
            limit,
            filters,
            this.props.products.toShop
        )).then(()=>{
            this.setState({
                skip
            })
        })
    }

    handleGridClick=()=>{
        this.setState({
            grid: !this.state.grid?'grid_bars':''
        })
    }

    render() {
        const products = this.props.products;
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckBox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="Wood"
                                list={products.woods}
                                handleFilters={(filters) => this.handleFilters(filters, 'wood')}
                            />
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filters) => this.handleFilters(filters, 'price')}
                            />
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div
                                        className={`grid_btn ${this.state.grid?'':'active'}`}
                                        onClick={()=>this.handleGridClick()}
                                    >
                                        <FontAwesomeIcon icon={faTh}/>
                                    </div>
                                    <div
                                        className={`grid_btn ${this.state.grid?'':'active'}`}
                                        onClick={()=>this.handleGridClick()}
                                    >
                                        <FontAwesomeIcon icon={faBars}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadmoreCards
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products={products.toShop}
                                    loadMore={()=>this.loadMore()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);