import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const url ='https://jsonplaceholder.typicode.com';

const getData = async (context, requestName, mutationName) => {
  const {data} = await axios.get(`${url}/${requestName}`);
  context.commit(mutationName, data);
};
export const store = new Vuex.Store({
  state: {
    authors: null,
    posts: null,
    viewedPosts: [],
    selectedMenuItem: null
  },
  getters: {
    getAuthors: state => {
      return state.authors;
    },
    getPosts: state => {
      return state.posts;
    },
    getViewedPosts: state => {
      return state.viewedPosts;
    },
    getAuthorById: state => id => {
      return state.authors.find(author => author.id === id);
    },
    getPostById: state => id => {
      return state.posts.find(post => post.id === id);
    },
    getPostsByAuthorId: state => id => {
      return state.posts.filter(post => post.userId === id);
    },
    getSelectedMenuItem: state => {
      return state.selectedMenuItem;
    },
  },
  mutations: {
    setAuthors: (state, payload) => {
      state.authors = payload;
    },
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setViewedPosts: (state, payload) => {
      state.viewedPosts.push(payload);
    },
    setSelectedMenuItem: (state, payload) => {
      state.selectedMenuItem = payload;
    },
  },
  actions: {
    getAuthors: async (context) => await getData(context, 'users', 'setAuthors'),
    getPosts: async (context) => await getData(context, 'posts', 'setPosts')
  },
});

