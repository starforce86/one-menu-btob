import React, { Component, PropTypes } from 'react';

class PlanOrder extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { total, onClick } = this.props;
        console.log('total', total, onClick, this.props)
        return (
            <div className={`plan-order`} onClick={onClick}>
                <div className="header"><img src={`assets/images/cart.png`} /> <span className="title">Your Order</span></div>
                <div className="menu">Menu #1. Summer Menu</div>
                <div className="primary"><div>"A la carte"(2 lang inc)</div><div><span>$0x1=</span> <span>$0</span></div></div>
                <div className="secondary">Prepaid</div>
                <div className="primary"><div>Additional lang</div><div><span>$1000x2=</span> <span>$2,000</span></div></div>
                <div className="secondary">5 mo included</div>
                <div className="menu">Menu #2. Winter Menu</div>
                <div className="primary"><div>"Degustation"(2 lang inc)</div><div><span>$90x1=</span> <span>$90</span></div></div>
                <div className="secondary">1 mo</div>
                <div className="footer"><span className="title">Total</span><span className="title">${total ? total : '0,0'}</span></div>
                <div style={{paddingLeft: 50,paddingRight: 50}} className="notification button--action button--action-filled" onClick={onClick}>Continue</div>
            </div>
        )
    }
};

export default PlanOrder;