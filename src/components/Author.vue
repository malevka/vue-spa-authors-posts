<template lang="html">
  <div class="author">
     <div class="author__header">
      <router-link  v-if="prevRoute" 
          tag="span"           
          class="back"
          :to="{ name:  prevRoute.name , params: prevRoute.params }">
          << назад 
        </router-link>
        <div class="author__title">

          <h3 class="author__name">{{ author.name }}</h3>
          <div class="author__username">{{ author.username }}</div>    
        </div>
      </div>
      <div class="author__posts">
        <div v-if="postsByAuthor.length > 0">
          <ul>
           <post-item class="list-item" v-for="post in postsByAuthor" v-bind:class="{ viewed: isViewed(post.id)}"
                  v-bind:postTitle="post.title"
                            v-bind:postBody="post.body"
                            v-bind:key="post.id"
                            v-bind:postId="post.id">
           </post-item>
          </ul>
        </div> 
        <div v-else class="no_posts">{{ noPostsMessage }}</div>
      </div>
    </div>
  </div>
  
</template>
<script>
import PostItem from './PostItem'
   export default {
    props: ['id'],
    data() {
      return {
        noPostsMessage : 'У выбранного автора пока нет статей',
        prevRoute: null,
      }
    },    
    created() {
      this.$store.commit('setSelectedMenuItem', null);
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.prevRoute = from
      })
    },
    computed: {
      postsByAuthor() {
        return this.$store.getters.getPostsByAuthorId(this.id);
      },
      author() {
        return this.$store.getters.getAuthorById(this.id);
      },
    },  
    methods: {
      isViewed(postId) {
        return this.$store.getters.getViewedPosts.includes(postId);
      },
    },
    components: {
      'post-item' : PostItem,
    } 
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/author.scss';
</style>
