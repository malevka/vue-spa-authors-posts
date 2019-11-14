<template lang="html">
  <div class="authors">
    <div class="section">
      <ul >
        <li class="list-item" v-for="author in authorList">
        <router-link 
            tag="div"
            :to="{ name: 'author', params: { id: author.id } }">
            <span  class="authors__author__name">{{ author.name }}</span>
            <span class="authors__author__username">( {{ author.username }} )</span>
        </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
   export default {
    created() {
      this.$store.commit('setSelectedMenuItem', 'authorsMenu');
    },
    computed: {
        authorList() {
          return this.$store.getters.getAuthors;
        },
    },
    methods: {
      scrollToTop() {
         window.scrollTo(0,0);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/authors.scss';
</style>
