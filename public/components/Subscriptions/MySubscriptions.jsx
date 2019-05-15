import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import Modal from 'react-modal';
import { map } from 'lodash';
import * as actionCreators from '../../action-creators';
import Navbar from '../Navbar';
import Aside from "../Aside";
import PageHeader from "../PageHeader";
import {withRouter} from "react-router-dom";
import BranchLanguagesEdit from "../BranchLanguagesEdit";
const classNames = require('classnames');

const menuList = [
    {title: 'Summer Menu'},
    {title: 'Winter Menu'}
];

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class MySubscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            current: 2,
            modalIsOpen: false,
        };
        this.handleContinue = this.handleContinue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChanges = this.onChanges.bind(this);
        this.handleAddSubscription = this.handleAddSubscription.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.handleCancelSubscription = this.handleCancelSubscription.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        // this.props.dispatch(actionCreators.getProfile(this.handlers.onProfileFetched));
        this.props.dispatch(actionCreators.getLanguages());
    }

    handleContinue() {
        console.log('123')
        const { history } = this.props;
        history.push('/subscriptions/step-2')
    }

    handleClick(id) {
        this.setState({selected: id});
        this.handleStart();
    }

    onChanges(type, obj) {
        console.log(type, obj)
        console.log('changing', this.props.menu);
        let dataToUpdate = {};
        switch (type) {
            case 'main':
                dataToUpdate[obj.key] = obj.target.target.value;
                // console.log(dataToUpdate);

                this.props.dispatch(actionCreators.setMenu({
                    ...this.props.menu,
                    languages: this.props.languages,
                    originalLanguages: this.props.originalLanguages,
                }, dataToUpdate));
                break
            default:
                dataToUpdate[type] = obj.data;

                // console.log(obj);
                // console.log(dataToUpdate);
                this.props.dispatch(actionCreators.setMenu({
                    ...this.props.menu,
                }, dataToUpdate));

        }
    };

    handleAddSubscription() {

    }

    handleCancel() {
        this.closeModal()
    }

    handleCancelSubscription() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    renderPopup() {
        const { crop, zoom, allImages } = this.state;

        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <article className="module--alert">
                    <header className="content--container--header header--alert">
                        <div className="content--container--title">Cancel Subscription</div>
                    </header>
                    <div className="alert--container content--container">
                        <div className="grid alert--content">
                            <div className="content--label">
                                <span>
                                    <p>Would you like to cancel current subscription?<br/>
                                    In case of subscriptioncancelation, prepaid months couldn't be reimbursed or refunded.</p>
                                </span>
                            </div>
                        </div>

                        <footer className="alert--footer group-buttons global-padding-wrapper push-right">
                            <button onClick={this.handleCancel} className="alert button--action button--action-filled button--action--submit">Confirm</button>
                            <button onClick={this.closeModal} className="alert button--action button--action-outline button--action--cancel">Cancel</button>
                        </footer>
                    </div>
                </article>
            </Modal>
        )
    }

    render () {
        const { selected, current } = this.state;
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

        const menus = []
        const originalLanguages = []
        const languages = []

        return (
            <div>
                <Navbar logo={company.logo} />
                <div className="content">
                    <PageHeader company={company} />

                    <div className="main-content">
                        <Aside type={asideType} />

                        <main className="main">
                            <section className={classes}>
                                <h1 className="content--title">My Subscriptions</h1>
                                {map(menuList, (item, index) => {
                                    return (
                                        <article key={index} className="content--module module--item-details no-metadata content--menus">
                                            <div className="content--container global-padding-wrapper branches-container">
                                                <div className="flex-row">
                                                    <div style={{flex: 1}}>
                                                        <div className="menu-header-wrapper">
                                                            <img src={`assets/images/menu-icon.png`} />
                                                            <div>
                                                                <div className="title">{item.title}</div>
                                                                <div className="menu-plan">Plan: Menu du jour</div>
                                                                <div className="active">Active</div>
                                                            </div>
                                                        </div>

                                                        <div className="article--branch">
                                                            <div className="branch--contact aside--section contacts--support" style={{backgroundColor: '#fff'}}>
                                                                <div className="global-padding-wrapper">
                                                                    <div className="menu-row">
                                                                        <div className="row-title">Billing Cycle:</div>
                                                                        <div className="row-value">Yearly</div>
                                                                    </div>
                                                                    <div className="menu-row">
                                                                        <div className="row-title">Registration Date:</div>
                                                                        <div className="row-value">14 Sep 2015</div>
                                                                    </div>
                                                                    <div className="menu-row">
                                                                        <div className="row-title">Renews on:</div>
                                                                        <div className="row-value">4 Sep 2019 ($300)</div>
                                                                    </div>
                                                                    <div className="menu-row">
                                                                        <div className="row-title">Last Payment:</div>
                                                                        <div className="row-value">14 Sep 2018</div>
                                                                    </div>
                                                                    <div className="menu-row">
                                                                        <div className="row-title">Original Language:</div>
                                                                        <div className="row-value">it - Italian</div>
                                                                    </div>
                                                                    <div className="menu-row">
                                                                        <div className="row-title">Translated to:</div>
                                                                        <div>
                                                                            <BranchLanguagesEdit simple className="style-7" languages={(languages && languages.length > 0) ? languages.map(language => {if (language.Language) return language.Language}) : []} name="languages" onChange={this.onChanges} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="menu-notification">
                                                                        <span>Payment has not been processed. Please update your billing<br/>information or the subscription will be cancelled in 10 days</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style={{overflow: 'hidden', marginTop: 24, display: 'flex', justifyContent: 'flex-end'}}>
                                                            <button style={{marginRight: 16}} className="notification button--action button--action-outline" onClick={this.handleAddSubscription}>Modify</button>
                                                            <button style={{marginRight: 0}} className="notification button--action button--action-outline" onClick={this.handleCancelSubscription}>Cancel Subscription</button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>

                                            </div>
                                        </article>
                                    )
                                })}
                            </section>
                        </main>
                    </div>
                </div>
                {this.renderPopup()}
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        profile: state._profile.profile
    }
};
export default connect(mapStateToProps)(withRouter(MySubscriptions));
