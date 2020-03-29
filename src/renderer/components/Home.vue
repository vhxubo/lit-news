<template>
  <div class="pane-group">
    <div class="pane pane-sm sidebar">
      <Sider />
    </div>
    <div class="pane">
      <Post />
    </div>
  </div>
</template>
<script>
  import Sider from './Sider'
  import Post from './Post'
  export default {
    components: {
      Sider,
      Post
    }
  }
</script>