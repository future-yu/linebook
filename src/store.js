import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        listItems: [],
        max_page: 0
    },
    mutations: {
        setHomeList(state, payload) {
            state.listItems = payload.items;
            state.max_page = payload.max;
        },
        loadMoreItems(state, payload){
            state.listItems = payload;
        }
    },
    actions: {
        setHomeList(context, payload) {
            context.commit('setHomeList',payload)
        },
        loadMoreItems(context, payload){
            context.commit('loadMoreItems',payload)
        }
    }
})
