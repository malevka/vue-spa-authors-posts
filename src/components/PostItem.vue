<template lang="html">
    <li class="postItem">
            <router-link 
                  tag="div"
                  :to="{ name: 'post', params: { id: postId } }">
            <h3>{{ postTitle }}</h3>
            <span class="post__description">{{ postBody.substr(0, 255) }}</span>
            </router-link>
            <router-link  v-if="authorName != null"
                tag="div"
                :to="{ name: 'author', params: { id: authorId } }">
                <div class="posts__post__author"> {{ authorName }}</div>
            </router-link>
        </li>
</template>

<script>
   export default {
    props: ['postTitle',
            'postBody', 
            'postId', 
            'authorName', 
            'authorId']
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/post-item.scss';
</style>
