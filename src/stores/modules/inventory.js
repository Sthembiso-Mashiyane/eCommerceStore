import {db} from "../../config/firebaseConfig";

const state = {
    isInventoryLoading: false,
    inventory: []
}

const mutations = {
    'SET_INVENTORY'(state, inventory) {
        state.inventory = inventory;
        state.isInventoryLoading = false;
    },
}

const actions = {
    getBrandDocReferenceBeforeSave() {
        return db.collection("inventory").doc();
    },
    getInventory({commit}, uid) {
        state.isInventoryLoading = true
        return db.collection("inventory").where('ownerID', '==', uid).onSnapshot(inventory => {
            const toSend = []
            inventory.forEach(function (doc) {
                const toAdd = {
                    ...doc.data()
                }
                toSend.push(toAdd);
            });
            commit('SET_INVENTORY', toSend);
        })
    },
    saveInventory({commit}, inventoryObject) {
        console.log(commit);
        console.log(inventoryObject);
        const docRef = db.collection('inventory').doc();

        db.collection("inventory").doc(docRef.id).set({
            productID: docRef.id,
            productName: inventoryObject.productName,
            ownerID: inventoryObject.ownerID,
            brandID: inventoryObject.brandID,
            verified: inventoryObject.verified,
            productDescription: inventoryObject.productDescription
        })
    },
    getBrandByID({commit}, ownerID) {
        console.log(commit);
        return db.collection("brands").where('ownerID', '==', ownerID).onSnapshot(res => {
            commit('SET_BRAND', res.docs[0].data());
        })
    }
}

const getters = {
    isInventoryLoading: (state) => {
        return state.isInventoryLoading;
    },
    inventory: (state) => {
        return state.inventory;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
