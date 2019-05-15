import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import * as Constants from '../constants';
import { Ajax } from "../shared/ajax.utils";
import { StorageManagerInstance } from "../shared/storage.utils";
import LoadingSpinner from "./LoadingSpinner";
import { Toast } from "./Toast";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            showToast: false,
            toastMsg: '',
            loading: false
        };
        this.submit = this.submit.bind(this);
        this.renderToast = this.renderToast.bind(this);
    }

    renderToast() {
        return (
            <Toast onDismiss={e => this.setState({ showToast: false })}>
                <p>
                    {this.state.toastMsg}
                </p>
            </Toast>
        );
    }

    async submit(ev) {
        const { trial } = this.props;
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let data = {
            'stripeToken': token.id,
            'subscriptionName': Constants.SUBSCRIPTION_NAMES.DIGITAL_MENU,
            'trial': trial
        }
        this.setState({loading: true});
        let response = await Ajax().post("/subscribe", {
            headers: {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "x-access-token": StorageManagerInstance.read("token")
            },
            body: JSON.stringify(data)
        });
        this.setState({loading: false});
        if (response.ok) {
            this.setState({complete: true});
        } else {
            this.setState({ showToast: true, toastMsg: response.errMsg });
        }
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (

            <div className="checkout">
                <LoadingSpinner style={{left: 0, top: 0}} loading={this.state.loading} />
                {this.state.showToast && this.renderToast()}

                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <div className="group-buttons" style={{ marginTop: 20 }}>
                    <div className="notification button--action button--action-filled" style={{ cursor: 'pointer' }} onClick={this.submit}>Send</div>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);