<template>
  <div id="app">
    <header class="pageheader">
      <router-link tag="h2"  class="sitename" to="/" >{{ pageName }}</router-link>
    </header>
    <ul class="menu">
        <router-link tag="li" v-bind:class="{ selected: isSelectedMenu('authorsMenu')}" class="authors" to="/" >АВТОРЫ</router-link>
        <router-link tag="li"
                     v-bind:class="{ selected: isSelectedMenu('postsMenu')}" 
                     v-on:click="setSelectedMenu('postsMenu')"
                     class="posts" to="/posts" >СТАТЬИ</router-link>
    </ul>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        pageName: 'Test SPA Authors & Posts'
      }
    },
    created() {
      this.$store.dispatch('getPosts');
      this.$store.dispatch('getAuthors');
    },
    methods: {
      isSelectedMenu (menuItem) {
        return this.$store.getters.getSelectedMenuItem === menuItem;
      },
      setSelectedMenu (menuItem) {
        this.$store.commit('setSelectedMenuItem', menuItem);
      },
    }
  }
</script>

<style lang="scss">
  @import './assets/css/main.scss';
</style>
