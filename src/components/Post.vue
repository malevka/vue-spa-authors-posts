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

<style lang="scss">
 
  .post__title {
    font-weight: bold;
    padding: 0px 10px;
  }

  .post__header {
      font-size: 24px;
      //font-family: 'PT Serif', Georgia, 'Times New Roman', Times, serif;
      color: #151515;
      line-height: 26px;
      font-weight: normal;    
      background: #f5f5f5;
  }

  .post__body {
      padding: 22px 10px 10px;
      font-size: 14px;
      //font-family: 'PT Serif', Georgia, 'Times New Roman', Times, serif;
      color: #444;    
  }

  .post__author {
      font-size: 11px;
      margin: 0px 10px;
      text-decoration-line: underline;
  }
</style>
