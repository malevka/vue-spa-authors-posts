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

<style  lang="scss">

body {
    color: black;
    font-size: 100%;
    font-family: Arial, sans-serif;
    background: #fff;
    margin: 0;
    padding: 0;
}

.pageheader {
    background-color: white;
}
.menu li.selected {
    z-index: 3;
    cursor: default;
    background: #fff;
    color: #969696;
}
.sitename {
  margin: 5px 5px 0 9px;
}
.menu {
  height: 41px;
  padding: 13px 0 0 0;
  background: #e8e8e8;
  margin: 0;
  border-bottom: 1px solid #d5d5d5;
  ul {
    padding: 0;
  }
  li {
    position: relative;
    display: inline-block;
    height: 40px;
    overflow: hidden;
    margin: 0 3px;
    vertical-align: baseline;
    border-radius: 6px 6px 0 0;
    border: 1px solid #c5c5c5;
    font-size: 15px;
    border-bottom: 0;
    color: #434343;
    background: #f6f6f6;
    box-shadow: #d5d5d5 0 0 2px;
    line-height: 40px;
    padding: 0 15px;
    font-weight: bold;
    .selected {
      background: #fff;
      color: #969696;
    }
  } 
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.section {
  padding: 0 15px;
}

.list-item {
    display: inline-block;
    padding: 12px 0;
    border-bottom: 1px solid #d5d5d5;
    position: relative;
    width: 100%;
}

.back {
    display: block;
    max-width: 100%;
    padding: 5px 7px;
    font-size: 12px;
    background: #f5f5f5;
    text-align: right;
}
</style>
