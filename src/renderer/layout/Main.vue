<template>
  <div class="main-page">
    <div class="header-box">
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

.main {
  display: flex;
  flex-direction: row;
  height: 100%;

  &__sidebar {
    width: 30%;
    overflow: hidden;
    border-right: 1.5px solid #f6f6f5;
    user-select: none;

    @media only screen and (min-width: 1300px) {
      width: 25%;
    }

    &:hover {
      overflow: overlay;
    }
  }

  &__content {
    width: 70%;
    background-color: #f9f9f9;

    @media only screen and (min-width: 1300px) {
      width: 75%;
    }
  }
}
</style>