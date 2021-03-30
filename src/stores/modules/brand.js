import {db} from "../../config/firebaseConfig";

const state = {
    isBrandLoading: false,
    brand: {}
}

const mutations = {
    'SET_BRAND'(state, brand) {
        state.brand = brand;
        state.isBrandLoading = false;
    },
}

const actions = {
    getBrandDocReferenceBeforeSave() {
        return db.collection("brands").doc();
    },
    getBrands({commit}, uid) {
        state.isAddressesLoading = true
        return db.collection("brands").doc(uid).collection('addresses').get().then(addresses => {
            const toSend = []
            addresses.forEach(function (doc) {
                const toAdd = {
                    id: doc.id,
                    ...doc.data()
                }
                toSend.push(toAdd);
            });
            commit('SET_USER_ADDRESSES', toSend);
        })
    },
    saveBrand({commit}, brandObject) {
        db.collection("brands").doc(brandObject.docID).set({
            brandID: brandObject.docID,
            brandName: brandObject.brandName,
            brandTelNumber: brandObject.brandTelNumber,
            brandEmail: brandObject.brandEmail,
            brandDescription: brandObject.brandDescription,
            logoURL: brandObject.logoURL,
            ownerID: brandObject.ownerID,
            verified: brandObject.verified || false
        })
        commit('',);
    },
    getBrandByID({commit}, ownerID) {
        console.log(commit);
        return db.collection("brands").where('ownerID', '==', ownerID).get().then(res => {
            commit('SET_BRAND', res.docs[0].data() || {});
        })
    }
}

const getters = {
    isBrandLoading: (state) => {
        return state.isBrandLoading;
    },
    brand: (state) => {
        return state.brand;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
