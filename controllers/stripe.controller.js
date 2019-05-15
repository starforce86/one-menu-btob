'use strict';
const constants = require('../constants');
const stripe = require("stripe")(constants.STRIPE_SECRET_KEY);
const moment = require('moment');
const Company = require('../models/company.model');
const Subscription = require('../models/subscription.model');

class StripeController {

}

StripeController.subscribe = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	try {
		let { CompanyID, Email, SubscriptionID, StripeCustomerID } = await Company.getByEmail(req.decoded);
		if (!SubscriptionID) {
			if (!StripeCustomerID) {
				let { id } = await stripe.customers.create({
					source: req.body.stripeToken,
					email: Email
				});
				StripeCustomerID = id;
				await Company.update(CompanyID, { StripeCustomerID });
			}
			let { PlanID, SubscriptionID } = await Subscription.get({ Title: constants.SUBSCRIPTION_NAMES.DIGITAL_MENU }).first('*');
			const trialEnd = moment().add(constants.DIGITAL_MENU_TRIAL_MONTH, 'M').unix();
			await stripe.subscriptions.create({
				customer: StripeCustomerID,
				items: [
					{
						plan: PlanID,
					}
				],
				trial_end: trialEnd
			});
			await Company.update(CompanyID, { SubscriptionID });
			res.json({ ok: true });
		} else {
			res.json({ ok: false, errMsg: "Already subscribed" });
		}
	} catch (err) {
		res.json({ ok: false, errMsg: err.message });
	}
};

module.exports = StripeController;