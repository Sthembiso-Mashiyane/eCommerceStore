import {db} from "../../config/firebaseConfig";
import * as moment from "moment";

const state = {
    isInventoryLoading: false,
    isProductLoading: false,
    isProductListLoading: true,
    isPaymentLoading: false,
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
            productType: inventoryObject.productType,
            brandName: inventoryObject.brandName,
            addedTimeStamp: inventoryObject.addedTimeStamp,
            gender: inventoryObject.gender,
            thumbnailURL: inventoryObject.thumbnailURL
        })
    },
    getProductByID({commit}, productID) {
        console.log(commit);
        state.isProductLoading = true;
        return db.collection('inventory').doc(productID).onSnapshot(res => {
            commit('SET_VIEW_PRODUCT', res.data());
        });
    },
    saveSuccessfulPayment: (state, {cart, userID, billingAddress, shippingAddress}) => {
        state.isPaymentLoading = true;
        db.collection('sales').orderBy('paymentTimestamp', "asc").limitToLast(1).get().then(lastPayment => {
            let invoiceNo = 1000
            lastPayment.forEach(payment => {
                if (payment.exists) {
                    invoiceNo = payment.data().invoiceNo + 1
                }
            })

            cart.products.foreach(prod => {
                db.collection('inventory').doc(prod.productID).get().then(res => {
                    let toUpdate = {};
                    let dontChangeThis = res.productType.sizes;

                    dontChangeThis.filter(obj => {
                        toUpdate = obj;
                    })

                    dontChangeThis.splice(dontChangeThis.findIndex(dontChangeThis), 1);

                    toUpdate.stock -= 1;

                    dontChangeThis.push(toUpdate)

                    db.collection('inventory').doc(res.id).update({
                        productType: {
                            id: res.id,
                            sizes: dontChangeThis,
                            productTypeName: res.productTypeName
                        }
                    }).then(res => {
                        console.log(res)
                        db.collection("sales").doc().set({
                            paymentTimestamp: moment().unix(),
                            cart: cart,
                            uid: userID,
                            billingAddress: billingAddress,
                            shippingAddress: shippingAddress,
                            invoiceNo: invoiceNo
                        }).then(res => {
                            console.log(res)
                            state.isPaymentLoading = false
                        }).catch(error => {
                            console.log(error)
                            state.isPaymentLoading = false
                        })
                    })
                })
            })

        })
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
