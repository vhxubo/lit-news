<template>
  <div @click.right="openMenu" class="content">
    <div class="content__title">{{newsPost.title}}</div>
    <div class="content__post" v-html="newsPost.post"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsPost: ''
    }
  },
  mounted() {
    this.$bus.$on('g-news-post', newsPost => {
      this.newsPost = newsPost
    })
  },
  methods: {
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
.content {
  flex-grow: 1;
  display: flex;
  font-size: 3rem;
  flex-direction: column;
  align-items: center;
  overflow: auto;

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

  &__post > p,
  &__post > span {
    padding: 0 4rem 0.5rem 4rem;
    line-height: 1.8;
    margin: 0;
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