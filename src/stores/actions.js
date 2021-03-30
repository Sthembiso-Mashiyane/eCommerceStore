import {firebaseAuth, db} from '../config/firebaseConfig';
import moment from "moment";
import firebase from "firebase";

export const updateCart = ({
                               commit
                           }, {item, quantity, isAdd}) => {
    // TODO: Call service
    commit('UPDATE_CART', {item, quantity, isAdd});
    if (isAdd) {
        let message_obj = {
            message: `Add ${item.productName} to cart successfully`,
            messageClass: "success",
            autoClose: true
        }
        commit('ADD_MESSAGE', message_obj);
    }
}

export const removeItemInCart = ({commit}, {item}) => {
    commit('REMOVE_CART_ITEM', {item});
}

export const registerByEmail = async ({commit}, {email, password, displayName, firstName, lastName, telNum}) => {
    console.log(commit);
    await firebaseAuth.createUserWithEmailAndPassword(email, password).then(async (res) => {
        console.log(res);
        await db.collection("users").doc(res.user.uid).set({
                displayName: displayName,
                email: email,
                firstName: firstName,
                lastName: lastName,
                telNumber: telNum,
                addedByGoogleAuth: false,
                uid: res.user.uid,
                isAdmin: false,
                isBrand: false

            }
        ).then(() => {
            return
        }).catch(error => {
            console.log(error);
            throw error
        })
    }).catch(error => {
        console.log(error.message);
        throw error;
    });
}

export const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebaseAuth.signInWithPopup(provider).then(function async(result) {
        const user = result.user;

        db.collection("users").doc(user.uid).get().then(res => {
            if (res.exists) {
                return
            } else {
                return db.collection("users").doc(user.uid).set({
                    displayName: user.displayName,
                    email: user.email,
                    telNumber: user.phoneNumber || '',
                    uid: user.uid,
                    addedByGoogleAuth: true,
                    firstName: '',
                    lastName: '',
                    isAdmin: false,
                    isBrand: false
                })
            }

        })
    }).catch(function (error) {
        console.log(error.message);
        throw error;
    });
}


export const logout = ({commit}) => {
    commit('SET_CART', []); // clear current cart
    return firebaseAuth.signOut();
}

export function loginWithEmail(_, {email, password}) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
}

export function listenToProductList({commit}) {
    return db.collection("inventory").onSnapshot(products => {
        let toSend = [];
        let totalStock = 0;
        let alternatingPrices = false;
        let alternatingPricesCounter = 0;
        let startingPrice = Number.MAX_VALUE;
        products.forEach(item => {
            const object = item.data();
            totalStock = 0;
            startingPrice = Number.MAX_VALUE;
            console.log(item.data())

            for (const type of object.productType.sizes) {
                totalStock += parseFloat(type.stock)
                if (startingPrice > type.price && type.price != 0) {
                    startingPrice = type.price;
                    alternatingPricesCounter++;
                    if (alternatingPricesCounter == 2) {
                        alternatingPrices = true
                    }
                }
            }


            toSend.push({
                ...item.data(),
                totalStock: totalStock,
                startingPrice: startingPrice,
                alternatingPrices: alternatingPrices
            })
        })
        console.log(toSend);
        commit('SET_PRODUCT_LIST', toSend);
    })
}

export function getShoppingCart({commit}, {uid, currentCart}) {
    if (uid) {
        return db.collection("cart").doc(uid).get().then((cart) => {
            console.log(cart.data());
            if (cart.data() && (!currentCart || currentCart.length == 0)) {
                commit('SET_CART', cart.data().products);
            }
        });
    } else {
        // console.log("User has not logged in");
    }
}

export function setUser({commit}, uid) {
    if (uid) {
        return db.collection("users").doc(uid).get().then((res) => {
            console.log(res.data());
            if (res.exists) {
                commit('EDIT_USER_STATE', res.data());
            } else {
                commit('EDIT_USER_STATE', null);
            }
        });
    } else {
        // console.log("User has not logged in");
    }
}

export function saveShoppingCart(_, {uid, cartItemList}) {
    // console.log("ACTIONS saveShoppingCart");
    // console.log("CART DATA", cartItemList);

    let saveObject = {
        products: cartItemList,
        timestamp: moment().unix(),
        uid: uid
    }
    return db.collection('cart').doc(uid).set(saveObject);
}

// Needs Some Thinking
export function saveToTransaction(_, {uid, cartItemList}) {
    // let newTransactionKey = moment().unix();
    // db.collection('transactions').doc(uid).collection()
    //
    // let newTransactionKey = ref.child("transactions").push().key;
    // var newTransaction = {}
    // newTransaction['/transactions/' + uid + '/' + newTransactionKey] = cartItemList;
    // return ref.update(newTransaction);

    console.log(uid);
    console.log(cartItemList);

}
