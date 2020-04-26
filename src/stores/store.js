import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/cart';
import products from './modules/products';
import auth from './modules/auth';
import brand from './modules/brand';
import messages from './modules/messages';
import address from "./modules/address";

import * as actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
	actions,
	modules: {
		auth,
		cart,
		products,
		messages,
		brand,
		address
	}
});

export default store