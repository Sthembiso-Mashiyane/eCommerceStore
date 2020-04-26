import {db} from "../../config/firebaseConfig";

const state = {
    isAddressesLoading: true,
    addresses: []
}

const mutations = {
    'SET_USER_ADDRESSES'(state, addresses) {
        state.addresses = addresses;
        state.isAddressesLoading = false;
    },
    'SET_USER_SELECTED_USER_ADDRESS'(state, productList) {
        state.userAddress = productList;
        state.isAddressLoading = false;
    }

}

const actions = {
    getAddresses({commit}, uid) {
        state.isAddressesLoading = true
        return db.collection("users").doc(uid).collection('addresses').onSnapshot(addresses => {
            const toSend = []
            addresses.forEach(function(doc) {
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
    getAddressByAddressID({commit}, {uid, addressID}) {
        state.userLoading = true
        return db.collection("users").doc(uid).collection('addresses').doc(addressID).onSnapshot(user => {
            const toSend = user.data();
            console.log(toSend);
            commit('SET_USER_SELECTED_USER_ADDRESS', toSend);
        })
    },
    editAddressByAddressID({commit}, {uid, address}) {
        console.log(commit)
        return db.collection("users").doc(uid).collection('addresses').doc(address.id).update({
            streetAddress: address.streetAddress,
            suburb: address.suburb,
            city: address.city,
            province: address.province,
            postalCode: address.postalCode
        })
    },
    saveAddress({commit}, {uid, addressObject}) {
        console.log(commit);
        console.log(uid);
        console.log(addressObject);

        return db.collection("users").doc(uid).collection("addresses").add({
            streetAddress: addressObject.streetAddress,
            suburb: addressObject.suburb,
            city: addressObject.city,
            province: addressObject.province,
            postalCode: addressObject.postalCode,

        })
    },
    deleteAddress({commit},{uid, address}) {
        db.collection("users").doc(uid).collection("addresses").doc(address.id).delete().then(function() {
            console.log(commit);
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            throw error
        });
    }
}

const getters = {
    addresses: (state) => {
        return state.addresses;
    },
    isAddressesLoading: (state) => {
        return state.isAddressesLoading;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
