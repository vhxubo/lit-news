<template>
  <div class="main-page">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <div class="main__sidebar">
        <Sidebar />
      </div>
      <div class="main__content">
        <Content />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
export default {
  components: {
    Header,
    Sidebar,
    Content
  }
}
</script>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header {
  font-size: 3rem;
  user-select: none;
}

.main {
  display: flex;
  flex-direction: row;
  height: 100%;

  &__sidebar {
    width: 30%;
    overflow: hidden;
    border-right: 0.5px solid #b5b5b5;
    user-select: none;

    &:hover {
      overflow: overlay;
    }
  }

  &__content {
    width: 70%;
    overflow-y: auto;
  }
}
</style>