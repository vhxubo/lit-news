import Cheerio from 'cheerio'
import Axios from 'axios'

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
async function getNews (url) {
  let response = await Axios.get(url)
  let $ = Cheerio.load(response.data)
  // 清除教务处头条
  $('.top_box').remove()
  // 清除教务处推荐阅读
  $('.widget-container').remove()
  // 获取所有a标签
  const list = $('a').get()
  // 结果数组
  let resList = []
  await Promise.all(
    list.map(async (item) => {
      // 获取团委标题时间并删除
      let pubDate = $(item).find('span').text()
      $(item).find('span').remove()
      if (pubDate === '') {
        pubDate = $(item).prev('span').text()
        $(item).prev('span').remove()
      }
      // 获取标题
      let title = $(item).attr('title')
      if (title === undefined) {
        title = $(item).text()
      }
      // 获取链接
      let link = $(item).attr('href')
      if (link !== undefined && link.indexOf('info') === 0 && title !== undefined && title.trim() !== '') {
        const gurl = url + link
        response = await Axios.get(gurl)
        $ = Cheerio.load(response.data, {
          decodeEntities: false
        })
        if (pubDate === null || pubDate === undefined || pubDate === '') {
          pubDate = $.html().match(/([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(-|年)(((0[13578]|1[02])(-|月)(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(-|月)(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/g)
        }
        if (pubDate !== null && pubDate instanceof Array) {
          pubDate = pubDate[0].replace('年', '-').replace('月', '-')
        }
        // 提取包含‘vsb_content’的
        const post = $('div').filter(function (i, el) {
          if ($(this).attr('id') !== undefined) {
            return $(this).attr('id').indexOf('vsb_content') !== -1
          }
        })
        // 替换a标签
        post.find('a').each(function () {
          const href = $(this).attr('href')
          if (href !== undefined) {
            $(this).attr('target', '_blank')
            if (href.indexOf('http') === -1) {
              $(this).attr('href', 'https://www.lit.edu.cn' + href)
            }
          }
        })
        // 清除内联样式
        post.find('*').removeAttr('style')
        // 替换img标签
        post.find('img').each(function () {
          const src = $(this).attr('src')
          if (src !== undefined) {
            if (src.indexOf('http') === -1) {
              $(this).attr('src', 'https://www.lit.edu.cn' + src)
            }
            if (src.indexOf('gif') === -1) {
              $(this).parent('p').css('text-align', 'center')
            }
          }
        })
        // 团委标题
        if (url.indexOf('tw') !== -1) {
          title = $('h2').text() === '' ? title : $('h2').text()
        }
        resList.push({
          title: title,
          link: gurl,
          post: post.html(),
          pubDate: pubDate
        })
      }
    })
  )
  return Promise.resolve(resList)
}

export default {
  getNews
}
