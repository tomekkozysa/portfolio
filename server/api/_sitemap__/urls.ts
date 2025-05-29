// import { defineEventHandler } from 'h3'
// import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'
// import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {

  
  const docs = await serverQueryContent(e).find()

  const workDocs = docs.filter(d => d._path.startsWith('/work'))
  const experimentsDocs = docs.filter(d => d._path.startsWith('/experiments'))


  const posts = [...workDocs,...experimentsDocs].map((post)=>({loc:post._path, lastmod:new Date()}))
  
  return posts


  // const contentList = (await serverQueryContent(e).find()) as ParsedContent[]
  // console.log(contentList)
  // return contentList
  //   .filter(c => c._path.startsWith('work/'))
  //   .map((c) => {
  //       return asSitemapUrl({
  //       loc: `/work/${c._path.replace('_articles', '')}`,
  //       lastmod: updatedAt
  //     })
  //   })
})
