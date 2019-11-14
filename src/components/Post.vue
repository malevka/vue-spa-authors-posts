<template lang="html">
  <div class="post">
    <div class="post__header">
      <router-link  v-if="prevRoute"   
        tag="span"            
        class="back"
        :to="{ name:  prevRoute.name , params: prevRoute.params }">
        << назад
      </router-link>
      
      <div class="post__title">{{ post.title }}</div>
      <router-link 
          tag="div"
          :to="{ name: 'author', params: { id: post.userId } }">
          <div class="post__author"> {{ getAuthorOfPost(post.userId).name }}</div>
      </router-link>
    </div>
    <div class="post__body">{{ post.body }}</div>
  </div>
</template>

<script>
   export default {
     props: ['id'],
    data() {
      return {
        prevRoute: null,
      }
    },
    created() {
      this.storePostAsViewed(this.id); 
      this.$store.commit('setSelectedMenuItem', null);
    },    
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.prevRoute = from
      })
    },
    computed: {
      post() {
        return this.$store.getters.getPostById(this.id);
      },
    },
    methods: {
      getAuthorOfPost(userId) {
      return this.$store.getters.getAuthorById(userId);
      },
      storePostAsViewed(id) {
        const isViewed = this.$store.getters.getViewedPosts.includes(id);
        if (!isViewed) {
          this.$store.commit('setViewedPosts', id);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
 @import '../assets/css/post.scss';
</style>
