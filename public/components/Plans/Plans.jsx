import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as actionCreators from '../../action-creators';
import Navbar from '../Navbar';
import Aside from "../Aside";
import PageHeader from "../PageHeader";
import PlanCard from "./PlanCard";
import DigitalMenu from "./DigitalMenu";
import CustomOrder from "./CustomOrder";
import {withRouter} from "react-router-dom";
import * as SubscriptionActions from '../../actions/subscriptions';
import {bindActionCreators} from "redux";
import {sendCustomOrder} from "./plan.service";
import {Toast} from "../Toast";
const classNames = require('classnames');

class Plans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            message: ''
        };
        this.handleStart = this.handleStart.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCustomOrder = this.handleCustomOrder.bind(this);
        this.renderToast = this.renderToast.bind(this);
    }

    componentDidMount() {
        // this.props.dispatch(actionCreators.getProfile(this.handlers.onProfileFetched));
    }

    handleStart(id) {
        const { history } = this.props;

        this.handleClick(id);
        history.push('/subscriptions/step-1')
    }

    handleClick(id) {
        this.props.selectPlan(id);
    }

    handleCustomOrder(payload, cb) {
        console.log(payload);
        sendCustomOrder(payload, (res) => {
            console.log('sent ', res)
            if(res) {
                this.setState({isSuccess: true, message: 'Email sent.'})
                cb(true)
            } else {
                this.setState({isSuccess: true, message: 'Email not sent. Please try one more time.'})
                cb(false)
            }
        });
    }

    renderToast() {
        return (
            <Toast onDismiss={e => this.setState({ isSuccess: false })}>
                <p>
                    {this.state.message}
                </p>
            </Toast>
        );
    }

    render () {
        const { subscriptions, selected, current } = this.props;
        const { isSuccess } = this.state;
        const action = this.props.match.params.action;
        const profileType = (typeof this.props.match.params.action !== 'undefined') ? 'profile-' + action : 'profile';

        const profile = (this.props.profile) ? this.props.profile : {};

        const branchRoot = (profile.branches && profile.branches.length > 0) ? profile.branches.find(branch => {
            return branch.HasHeadquarters == 1;
        }) : null;

        if (branchRoot) {
            branchRoot.mainContact = (branchRoot.contacts && branchRoot.contacts.length > 0) ? branchRoot.contacts.find(contact => {
                return contact.IsAdmin == 1;
            }) : null;
        }


        const company = {
            name: profile.Name,
            description: profile.Description,
            logo: {
                imgPath: profile.LogoPath,
                altDesc: profile.LogoAltDesc
            },
            website: profile.Website,
            tel: profile.Tel,
            email: profile.Email,
            social: {
                twitter: profile.Twitter,
                facebook: profile.Facebook,
                instagram: profile.Instagram,
                youtube: profile.Youtube
            },
            branchRoot: branchRoot
        };

        const asideType = 'plan';

        const classes = classNames(
            'content--section',
            'section--dashboard',
            'section--type-plans'
        );


        return (
            <div>
                <Navbar logo={company.logo} />
                <div className="content">
                    <PageHeader company={company} />

                    <div className="main-content">
                        <Aside type={asideType} />

                        <main className="main">
                            <section className={classes}>
                                <h1 className="content--title">Plans</h1>
                                    <Tabs>
                                        <TabList>
                                            <Tab>Digital Menu</Tab>
                                            <Tab>Multilingual digital menu</Tab>
                                            <Tab>Custom Order</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <DigitalMenu onClick={this.handleStart} />
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="plan-wrapper">
                                                {subscriptions.map((item, index) => {
                                                    return <PlanCard
                                                        key={item.id}
                                                        active={item.id === selected}
                                                        current={item.id === current}
                                                        data={item}
                                                        onStart={() => this.handleStart(item.id)}
                                                        onClick={() => this.handleClick(item.id)}
                                                    />
                                                })}
                                            </div>
                                            <div className="notes">*5 months prepay in advance required on subscription</div>
                                        </TabPanel>
                                        <TabPanel>
                                            <CustomOrder onClick={this.handleCustomOrder} />
                                        </TabPanel>
                                    </Tabs>
                            </section>
                        </main>
                    </div>
                </div>
                {isSuccess && this.renderToast()}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        profile: state._profile.profile,
        subscriptions: state._subscriptions.list,
        selected: state._subscriptions.selected,
        current: state._subscriptions.current
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators(Object.assign({}, SubscriptionActions), dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Plans));
