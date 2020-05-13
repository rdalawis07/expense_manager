import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const appModule = {
	namespaced: true,
	state: {
        loading: false,
        user_detail: null, 
	},
	
	mutations: { //synchronous
        changeLoading(state, payload){
            state.loading = payload;
        },

        changeUserDetail(state, payload){
            state.user_detail = payload;
        },

	},

	actions: { //asynchronous
        changeLoading(state, payload){
            state.commit('changeLoading', payload);
        },

        changeUserDetail(state, payload){
            state.commit('changeUserDetail', payload);
        },
	},

	getters: {
        loading(state){
            return state.loading;
        },

        user_detail(state){
            return state.user_detail;
        }
    }

};

const store = new Vuex.Store({
    modules: {
        app: appModule,
    }
});

export default store;