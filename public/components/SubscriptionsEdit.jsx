import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import * as actionCreators from '../action-creators';

import * as DomUtils from '../shared/dom.utils';

import SubscriptionEdit from './SubscriptionEdit';
import LanguagePicker from './LanguagePicker';

let createHandlers = (ctx) => {
	let onAdd = (obj) => {
		let menus;
		ctx.setState((prevState) => {
			menus = prevState.allMenus;

			let newBranch = (ctx.props.profile && ctx.props.profile.menus) ? ctx.props.profile.menus.find(branch => {
				return branch.MenuID === obj.id;
			}) : null;

			if (newBranch) {
				menus.push(newBranch);
			}

			if (ctx.props.onChange && typeof ctx.props.onChange === 'function') {
				ctx.props.onChange('menus', {data: menus});
			}

			return {
				allMenus: menus
			}
		});
	};

	let onPickerBlur = (e) => {
		let select = e.target.querySelector('.select--styled.active');
		if (select) {
			DomUtils.toggleClass(select, 'active');
		}
	};

	let onRemove = (obj) => {
		// console.log(obj);
		let menus;
		ctx.setState((prevState) => {
			menus = prevState.allMenus.reduce((acc, current) => {
				return (current.MenuID !== obj.id) ? acc.concat([current]) : acc;
			}, []);

			// console.log(prevState.allMenus);

			// console.log(menus);

			ctx.props.onChange('menus', {data: menus});

			return {
				allMenus: menus
			}
		});
	};

	let onPickerClick = (e) => {
		DomUtils.toggleClass(e.target, 'active');
	};

	let onPickerItemClick = (e) => {
		// Change UI
		let rel = e.target.getAttribute('rel');
		let text = e.target.textContent;
		let id = parseInt(e.target.getAttribute('data-id'), 10);
		let target = e.target.parentNode.previousElementSibling;
		target.setAttribute('data-rel', rel);
		target.textContent = text;

		DomUtils.toggleClass(target, 'active');

		// Then add the new menu
		onAdd({
			id,
			rel,
			name: text
		});
	};

	return {
		onAdd,
		onPickerBlur,
		onRemove,
		onPickerClick,
		onPickerItemClick
	};
};

class SubsriptionsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allMenus: []
		};
		this.handlers = createHandlers(this);
	}

	componentDidMount() {
		const { menus, profile } = this.props;
		let allMenus = []

    if (menus && menus.length > 0) {
      menus.forEach(MenuID => {
      	const tempBranch = (profile && profile.menus) ? profile.menus.find(menu => {
          return menu.MenuID === MenuID;
        }) : null;

        if (tempBranch) {
          allMenus.push(tempBranch);
				}
			})
		}

			this.setState({allMenus})
	}

	render() {
		const { menus, onChange, simple, subscriptions } = this.props;


		// console.log('allMenus', this.state.allMenus);
		console.log('subscriptions', subscriptions);
		// console.log('availableMenus', availableMenus);

		// List of all menus availables is to retrieved dynamically from db
		const obj = {
			type: "subscriptions",
			items: subscriptions
		};

		const menusComponent = (this.state.allMenus && this.state.allMenus.length > 0) ? this.state.allMenus.map((menu, index) => {
			return (index < this.state.allMenus.length - 1)
				? (
					<span key={menu.MenuID}>
						<SubscriptionEdit id={menu.MenuID} name={menu.Title} onRemove={this.handlers.onRemove} key={menu.MenuID} />
						,&nbsp;
					</span>
				) : (
					<span key={menu.MenuID}>
						<SubscriptionEdit id={menu.MenuID} name={menu.Title} onRemove={this.handlers.onRemove} key={menu.MenuID} />
					</span>
				)
		}) : null;

		return (
			<div>
				{!simple ? <p className="menu--title">Subscription Package</p> : null}
				{menusComponent}

				<div id="menu-branch-add" className="language--add">
                    {!simple ? <label>Select Package:</label> : null}
					<div id="branch-picker" className="language--picker">
						<LanguagePicker data={obj} onAdd={this.handlers.onAdd} onPickerBlur={this.handlers.onPickerBlur} onPickerClick={this.handlers.onPickerClick} onPickerItemClick={this.handlers.onPickerItemClick} />
                    </div>
				</div>
            </div>
		)
	}
};

SubsriptionsEdit.propTypes = {
  menus: PropTypes.array,
	onChange: PropTypes.func
};

const mapStateToProps = (state) => {
	// console.log(state);
  return {
    profile: state._profile.profile,
  	subscriptions: state._subscriptions.list
  };
};

export default connect(mapStateToProps)(SubsriptionsEdit);