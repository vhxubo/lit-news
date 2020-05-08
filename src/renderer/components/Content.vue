<template>
  <div @click.right="openMenu" @scroll="handleScroll" class="content">
    <div class="content__title" v-if="newsPost.title">{{newsPost.title}}</div>
    <div class="content__post" v-html="newsPost.post" v-if="newsPost.post"></div>
    <div class="content__help" v-else>
      <p></p>
    </div>
    <button @click="toTop" class="totop" v-if="toTopStatus">Top</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsPost: '',
      toTopStatus: false
    }
  },
  mounted() {
    this.$bus.$on('g-news-post', newsPost => {
      this.newsPost = newsPost
      this.$el.scrollTop = 0
    })
  },
  methods: {
    handleScroll(event) {
      if (event.target.scrollTop > 400) this.$data.toTopStatus = true
      else this.$data.toTopStatus = false
    },
    toTop() {
      this.$el.scrollTop = 0
    },
    openMenu() {
      const newsPost = this.newsPost
      if (newsPost !== '') {
        const remote = this.$electron.remote
        const { Menu, MenuItem } = remote
        const menu = new Menu()
        menu.append(
          new MenuItem({
            label: '复制',
            role: 'copy',
            type: 'normal'
          })
        )
        menu.append(
          new MenuItem({
            label: '分享',
            type: 'submenu',
            submenu: [
              {
                label: '链接',
                click() {
                  remote.clipboard.writeText(`${newsPost.link}`)
                  let myNotification = new Notification('LitNews', {
                    body: '文章链接已写入剪贴板'
                  })
                  myNotification.onclick = () => {
                    console.log('通知被点击')
                  }
                }
              },
              {
                label: '标题 + 链接',
                click() {
                  remote.clipboard.writeText(
                    `${newsPost.title}\n${newsPost.link}`
                  )
                  let myNotification = new Notification('LitNews', {
                    body: '文章标题 + 链接已写入剪贴板'
                  })
                  myNotification.onclick = () => {
                    console.log('通知被点击')
                  }
                }
              }
            ]
          })
        )
        menu.append(
          new MenuItem({
            label: '使用浏览器打开',
            click() {
              remote.shell.openExternal(newsPost.link)
            }
          })
        )
        menu.popup({
          window: remote.getCurrentWindow()
        })
      }
    }
  }
}
</script>
<style lang="scss">
.totop {
  font-weight: 600;
  width: 10rem;
  height: 9rem;
  position: absolute;
  bottom: 8rem;
  right: 6rem;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 0px 10px 2px #f0f2f7;

  &:hover {
    background-color: #f1f1f1;
    color: #a8a8a8;
  }
}

.content {
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 3rem;
  align-items: center;

  @media only screen and (max-width: 37.5rem) {
    display: none;
  }

  &__title {
    font-size: 3.8rem;
    font-weight: 700;
    padding-top: 4rem;
    padding-bottom: 6rem;
  }

  &__post {
    width: 100%;
  }

  table {
    padding: 3rem 5rem;
  }

  p {
    padding: 0 4rem 1.5rem 4rem;
    line-height: 1.8;
  }

  &__post > p > img.img_vsb_content {
    width: 100%;
  }

  &__footer {
    text-align: center;
    background-color: #f0f2f7;
    width: 100%;
    padding: 1rem 0;
    margin-top: 2rem;

    a {
      font-size: inherit;
    }
  }
}
</style>