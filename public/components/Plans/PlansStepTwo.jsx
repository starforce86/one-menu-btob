import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../../action-creators';
import Navbar from '../Navbar';
import Aside from "../Aside";
import PageHeader from "../PageHeader";
import {withRouter} from "react-router-dom";
import BranchMenusEdit from "../BranchMenusEdit";
import SubscriptionsEdit from "../SubscriptionsEdit";
import BranchLanguagesEdit from "../BranchLanguagesEdit";
import PlanOrder from "./PlanOrder";
const classNames = require('classnames');

const menuList = [
    {title: 'Menu #1. Summer Menu'},
    {title: 'Menu #2. Winter Menu'}
];
class PlansStepOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            current: 2
        };
        this.handleContinue = this.handleContinue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChanges = this.onChanges.bind(this);
        this.handleAddSubscription = this.handleAddSubscription.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
    }

    componentDidMount() {
        // this.props.dispatch(actionCreators.getProfile(this.handlers.onProfileFetched));
        this.props.dispatch(actionCreators.getLanguages());
    }

    handleContinue() {
        // const { history } = this.props;
        // history.push('/subscriptions/step-2')

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
                                <ul className="breadcrumbs">
                                    <li>{'<'} <Link to="/subscriptions/plans">Back to Package</Link></li>
                                </ul>
                                <h1 className="content--title">Purchase. Step 2 of 3</h1>
                                <article className="content--module module--item-details no-metadata content--menus">
                                    <div className="content--container global-padding-wrapper branches-container">
                                        <div className="flex-row">
                                            <div style={{flex: 1}}>
                                                <h2 className="asset--subtitle" style={{marginBottom: 14}}>
                                                    Menu #1. Summer Menu
                                                </h2>

                                                <div className="article--branch">
                                                    <div className="branch--contact aside--section contacts--support">
                                                        <div className="global-padding-wrapper">
                                                            <div className="menu--languages">
                                                                <BranchLanguagesEdit className="style-7" languages={(languages && languages.length > 0) ? languages.map(language => {if (language.Language) return language.Language}) : []} name="languages" onChange={this.onChanges} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div>
                                                <PlanOrder total={"2,200"} onClick={this.handleContinue} />
                                            </div>
                                        </div>

                                    </div>
                                </article>
                            </section>
                        </main>
                    </div>
                </div>
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
export default connect(mapStateToProps)(withRouter(PlansStepOne));
