import {db} from "../../config/firebaseConfig";

const state = {
    isSalesSaving : false,
    allSales : [],
    brandSales : []
}

const mutations = {
    'SET_ALL_SALES'(state, allSales) {
        state.allSales = allSales;
    },
    'SET_BRAND_SALES'(state, brandSales) {
        state.allSales = brandSales;
    }
}

const actions = {
    getAllSales({commit}) {
        db.collection("sales").orderBy('saleDate', "desc").limit(50).onSnapshot(res => {
            const toSend = [];
            res.forEach(item => {
                toSend.push(item.data())
            })
            commit('SET_ALL_SALES',toSend)
        });
    },
    getBrandSales({commit}, brandID) {
        db.collection("sales").where('brandID','==',brandID).onSnapshot(res =>{
            const toSend = [];
            res.forEach(item => {
                toSend.push(item.data())
            })
            commit('SET_ALL_PRODUCTS',toSend)        })
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
