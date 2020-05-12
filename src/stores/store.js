import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/cart';
import auth from './modules/auth';
import brand from './modules/brand';
import messages from './modules/messages';
import address from "./modules/address";
import productType from "./modules/productType";
import inventory from "./modules/inventory";


import * as actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
	actions,
	modules: {
		auth,
		cart,
		messages,
		brand,
		address,
		productType,
		inventory
	}
});

export default store
