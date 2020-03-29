<template>
  <div id="app" class="window">
    <div class="fake-title-bar">
      <div class="handle-bar">
        <!-- 如果是windows系统 就加上模拟的操作按钮-->
        <span
          class="icon icon-minus"
          @mouseover="overMin($event)"
          @mouseleave="leaveMin($event)"
          @click="minimizeWindow"
        ></span>
        <span class="icon icon-resize-full" @click="resizeWindow"></span>
        <span
          class="icon icon-cancel"
          @mouseover="overClose($event)"
          @mouseleave="leaveClose($event)"
          @click="closeWindow"
        ></span>
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
    minimizeWindow () {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      window.minimize()
    },
    overMin ($event) {
      $event.currentTarget.className = 'icon icon-minus-squared'
    },
    leaveMin ($event) {
      $event.currentTarget.className = 'icon icon-minus'
    },
    closeWindow () {
      const window = this.$electron.remote.BrowserWindow.getFocusedWindow()
      window.close()
    },
    overClose ($event) {
      $event.currentTarget.className = 'icon icon-cancel-squared'
    },
    leaveClose ($event) {
      $event.currentTarget.className = 'icon icon-cancel'
    },
    resizeWindow ($event) {
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
.fake-title-bar {
  width: 100%;
  height: 16px;
  background-color: #f5f4f5;
  -webkit-app-region: drag;
}
.handle-bar {
  margin: 0;
  padding: 0;
  -webkit-app-region: no-drag;
  float: right;
  padding-right: 4px;
}

span {
  margin: 0;
  padding: 2px;
}
</style>