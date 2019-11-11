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
            <li class="list-item" v-for="post in postsByAuthor" v-bind:class="{ viewed: isViewed(post.id)}"> 
            <router-link               
                  tag="div"
                  :to="{ name: 'post', params: { id: post.id } }">
                  <h3>{{ post.title }}</h3>
                  <span class="post__description">{{post.body.substr(0, 255)}}</span>
            </router-link>
            </li>
          </ul>
        </div> 
        <div v-else class="no_posts">{{ noPostsMessage }}</div>
      </div>
    </div>
  </div>
  
</template>
<script>
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
    } 
  }
</script>

<style lang="scss">
  
  .author__header {
      font-size: 24px;
      //font-family: 'PT Serif', Georgia, 'Times New Roman', Times, serif;
      color: #151515;
      line-height: 26px;
      font-weight: normal;    
      background: #f5f5f5;
  }

  .author__posts {
    padding: 0px 10px 10px;
  }

  .no_posts {
    padding: 25px;
  }
  
  .author__username {
      font-size: 11px;
      margin: 0px 5px;
      background: #f5f5f5;
  }

  .author__title {
    text-align: left;
    margin: 0;
    font-size: 25px;
    background: #f5f5f5;
    font-weight: bold;
    padding: 5px;
  }

  .author__name {
    margin: 0 5px;
  }
</style>
