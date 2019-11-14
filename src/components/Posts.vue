<template lang="html">
  <div class="posts">
    <div class="section">
      <ul>      
        <post-item class="list-item" v-for="post in postList" v-bind:class="{ viewed: isViewed(post.id)}"
                  v-bind:postTitle="post.title"
                            v-bind:postBody="post.body"
                            v-bind:postId="post.id"
                            v-bind:authorId="post.userId"
                            v-bind:key="post.id"
                            v-bind:authorName="getAuthorOfPost(post.userId).name">
        </post-item>
      </ul>
    </div>
  </div>
</template>
<script>
import PostItem from './PostItem'
export default {
    data() {
      return {
        isActive: false,
      }
    },    
    created() {
      this.$store.commit('setSelectedMenuItem', 'postsMenu');
    },
    computed: {
      postList() {
        return this.$store.getters.getPosts;
      },
    },
    methods: {
		  getAuthorOfPost(userId) {
        return this.$store.getters.getAuthorById(userId);
      },
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
</style>
