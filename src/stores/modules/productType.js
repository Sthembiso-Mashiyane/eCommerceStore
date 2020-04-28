import {db} from "../../config/firebaseConfig";

const state = {
}

const mutations = {

}

const actions = {
    getProductTypes() {
        return db.collection("productTypes");
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

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
