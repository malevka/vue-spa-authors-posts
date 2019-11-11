import Vue from 'vue'
import App from './App.vue'
import Post from './components/Post.vue'
import Posts from './components/Posts.vue'
import Authors from './components/Authors.vue'
import Author from './components/Author.vue'
import Router from 'vue-router'
import {store} from './store'
Vue.use(Router)
const router = new Router({
  routes: [
   {
      path: '/posts',
      name:'posts',
      component: Posts,
    },
   {path: '/',
      name:'authors',
      component: Authors
    },
    {path: '/author/:id',
      name:'author',
      component: Author,
      props: true,
    },
    {path: '/post/:id',
      name:'post',
      component: Post,
      props: true,
    },
  ]
 })

 router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  next();
})

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
