import {db} from "../../config/firebaseConfig";

const state = {
    isBrandLoading: false,
}

const mutations = {
    'SET_BRAND'(state, addresses) {
        state.addresses = addresses;
        state.isBrandLoading = false;
    },
}

const actions = {
    getBrandDocReferenceBeforeSave() {
        return db.collection("brands").doc();
    },
    getBrand({commit}, uid) {
        state.isAddressesLoading = true
        return db.collection("brands").doc(uid).collection('addresses').onSnapshot(addresses => {
            const toSend = []
            addresses.forEach(function (doc) {
                const toAdd = {
                    id: doc.id,
                    ...doc.data()
                }
                toSend.push(toAdd);
            });
            console.log(toSend);
            commit('SET_USER_ADDRESSES', toSend);
        })
    },
    saveBrand({commit}, brandObject) {
        console.log(commit);
        db.collection("brands").doc(brandObject.docID).set({
            brandID: brandObject.docID,
            brandName: brandObject.brandName,
            brandTelNumber: brandObject.brandTelNumber,
            brandEmail: brandObject.brandEmail,
            brandDescription: brandObject.brandDescription,
            logoURL: brandObject.logoURL,
            ownerID: brandObject.ownerID,
            verified: brandObject.verified
        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
