import {db} from "../../config/firebaseConfig";

const state = {
    isProductTypesLoading : false,
    productTypes : []
}

const mutations = {
    'SET_PRODUCT_TYPES'(state, productTypes) {
        state.productTypes = productTypes;
        state.isProductTypesLoading = false;
    }
}

const actions = {
    getProductTypes({commit}) {
        db.collection("productTypes").onSnapshot(res => {
            const toSend = [];
            res.forEach(item => {
                toSend.push(item.data())
            })
            commit('SET_PRODUCT_TYPES',toSend)
        });
    },
    saveProductType({commit}, productTypeObject) {
        console.log(commit)
        const docRef = db.collection("productTypes  ").doc();
        db.collection("productTypes").doc(docRef.id).set({
            id: docRef.id,
            productTypeName: productTypeObject.productTypeName,
            sizes: productTypeObject.sizes
        })
    }
}

const getters = {
    productTypes: (state) => {
        return state.productTypes;
    },
    isProductTypesLoading: (state) => {
        return state.isProductTypesLoading;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
