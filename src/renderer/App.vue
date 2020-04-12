<template>
  <div class="window" id="app">
    <div class="fake-title-bar">
      <div class="handle-bar">
        <!-- 如果是windows系统 就加上模拟的操作按钮-->
        <span @click="minimizeWindow" class="icon icon-minus"></span>
        <span @click="resizeWindow" class="icon icon-resize-full"></span>
        <span @click="closeWindow" class="icon icon-cancel"></span>
      </div>
    </div>
    <Header />
    <div class="window-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: {
    Header
  },
  methods: {
    minimizeWindow() {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      window.minimize()
    },
    closeWindow() {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      window.close()
    },
    resizeWindow($event) {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      if (window.isMaximized()) {
        window.unmaximize()
        $event.currentTarget.className = 'icon icon-resize-full'
      } else {
        window.maximize()
        $event.currentTarget.className = 'icon icon-resize-small'
      }
    }
  }
}
</script>

<style scoped>
#app{
  font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","HeitiSC","WenQuanYi Micro Hei",sans-serif;
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

.toolbar {
  box-shadow: none !important;
}

span {
  margin: 0;
  padding: 0 8px;
}

.icon:hover {
  background-color: #c6c6c6;
  cursor: pointer;
}
</style>