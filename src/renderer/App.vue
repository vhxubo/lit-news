<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei',
    'Hiragino Sans GB', 'HeitiSC', 'WenQuanYi Micro Hei', sans-serif;
  font-size: 36.5%;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  width: 100vw;
  height: 100%;
}

.fake-title-bar {
  width: 100%;
  height: 20px;
  background-color: #f5f4f5;
  -webkit-app-region: drag;
}

.handle-bar {
  margin: 0;
  padding: 0;
  -webkit-app-region: no-drag;
  float: right;
  display: flex;
}

.icon:hover {
  background-color: #c6c6c6;
  cursor: pointer;
}
</style>