import React, { Component, PropTypes } from 'react';

class PlanCard extends Component {
    render() {
        const { data = {}, active, current, onClick, onStart } = this.props;

        return (
            <div className={`plan-card shadow ${active ? 'active' : ''} ${current ? 'current' : ''}`} onClick={onClick}>
                <div className="title">{data.title}</div>
                <div className="version"><img src={`assets/images/plan_${data.id}${active ? '_white' : ''}.png`} /></div>
                <div className="fee">Starting from</div>
                <div className="price"><span>{data.price}</span><span className="period">/mo</span></div>
                <div className="line"></div>
                <div className="devices">
                    <div>{data.words} words</div>
                    <div className="per-year">per year</div>
                </div>
                <div className="plus"><img src={`assets/images/plus${active ? '_white' : ''}.png`} /></div>
                <div className="description">{data.languages} languages</div>
                <div className="plan-button" onClick={onStart}>Get started</div>
                <img className="current-sticker" src="assets/images/current_plan.png" />
            </div>
        )
    }
};

PlanCard.propTypes = {
    component: PropTypes.object
};

export default PlanCard;