import {db} from "../../config/firebaseConfig";
import * as moment from "moment";

const state = {
    isInventoryLoading: false,
    isProductLoading: false,
    isProductListLoading: true,
    inventory: [],
    viewProduct: {},
    products: []
}

const mutations = {

    'SET_PRODUCT_LIST'(state, inventory) {
        state.products = inventory;
        state.isProductListLoading = false;

    },
    'SET_INVENTORY'(state, inventory) {
        state.inventory = inventory;
        state.isInventoryLoading = false;
    },

    'SET_VIEW_PRODUCT'(state, inventory) {
        state.viewProduct = inventory;
        state.isProductLoading = false;
    },
}

const actions = {
    getProductDocReferenceBeforeSave() {
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
        db.collection("inventory").doc(inventoryObject.docID).set({
            productID: inventoryObject.docID,
            productName: inventoryObject.productName,
            ownerID: inventoryObject.ownerID,
            brandID: inventoryObject.brandID,
            verified: inventoryObject.verified,
            productDescription: inventoryObject.productDescription,
            productType: inventoryObject.productType,
            brandName: inventoryObject.brandName,
            addedTimeStamp: moment().unix(),
            gender: inventoryObject.gender,
            thumbnailURL: inventoryObject.thumbnailURL
        })
    },
    updateInventory({commit}, inventoryObject) {
        console.log(commit);

        db.collection("inventory").doc(inventoryObject.productID).set({
            productID: inventoryObject.productID,
            productName: inventoryObject.productName,
            ownerID: inventoryObject.ownerID,
            brandID: inventoryObject.brandID,
            verified: inventoryObject.verified,
            productDescription: inventoryObject.productDescription,
            productType: inventoryObject.productType
        })
    },
    getProductByID({commit}, productID) {
        console.log(commit);
        state.isProductLoading = true;
        return db.collection('inventory').doc(productID).onSnapshot(res => {
            commit('SET_VIEW_PRODUCT', res.data());
        });
    }
}

const getters = {
    isInventoryLoading: (state) => {
        return state.isInventoryLoading;
    },
    inventory: (state) => {
        return state.inventory;
    },
    viewProduct: (state) => {
        return state.viewProduct
    },
    isProductLoading: (state) => {
        return state.isProductLoading
    },
    isProductListLoading: (state) => {
        return state.isProductListLoading
    },
    products: (state) => {
        return state.products;
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}
