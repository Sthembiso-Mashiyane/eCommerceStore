import {db, firebaseAuth} from '../../config/firebaseConfig';

const state = {
    isLoggedIn: firebaseAuth.currentUser != null,
    user: firebaseAuth.currentUser,
    userLoading: false
}

const mutations = {
    'AUTH_STATUS_CHANGE'(state) {
        state.isLoggedIn = firebaseAuth.currentUser != null;
        state.user = firebaseAuth.currentUser;
    },
    'EDIT_USER_STATE'(state, user) {
        state.user = user;
        state.userLoading = false;
    }
}

const actions = {
    getUser({commit}, uid) {
        state.userLoading = true
        return db.collection("users").doc(uid).onSnapshot(user => {
            if (user.exists) {
                const toSend = user.data();
                console.log(toSend);
                commit('EDIT_USER_STATE', toSend);
            }
            else {
                commit('EDIT_USER_STATE', null);
            }
        })
    },
    updateUser({commit}, userObject) {
        console.log(userObject);
        db.collection('users').doc(userObject.uid).update({
            displayName: userObject.displayName,
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            telNumber: userObject.telNumber,
        }).then(r => {
            console.log(r);
            commit('EDIT_USER_STATE', r);
        }).catch(error => {
            throw error
        })
    },
    editUserState({commit}, obj) {
        commit('EDIT_USER_STATE', obj);
    }
}

const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    },
    currentUser: (state) => {
        if (state && state.user) {
            return {
                email: state.user.email,
                emailVerified: state.user.emailVerified,
                uid: state.user.uid,
            } || ''
        } else {
            return {};
        }
    },
    user: (state) => {
        return state.user;
    },
    isUserLoading: (state) => {
        return state.userLoading;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
