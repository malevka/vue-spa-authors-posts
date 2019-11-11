<template lang="html">
  <div class="posts">
    <div class="section">
      <ul>      
        <li class="list-item" v-for="post in postList" v-bind:class="{ viewed: isViewed(post.id)}">           
           <router-link 
            tag="div"
            :to="{ name: 'post', params: { id: post.id } }">
            <h3 class="list-item__post__title">{{post.title}}</h3>
            <span class="post__description">{{post.body.substr(0, 255)}}</span>
          </router-link>
          <router-link 
              tag="div"
              :to="{ name: 'author', params: { id: post.userId } }">
              <div class="posts__post__author"> {{ getAuthorOfPost(post.userId).name }}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
    } 
  }
</script>

<style lang="scss">

  .posts__post__author {
    font-size: 11px;
    margin-top: 15px;
    text-decoration-line: underline;
  }
</style>
