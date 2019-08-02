import navConfig from './nav.config'
import langs from './i18n/route'

const importMap = (lang, name) => () => import(`./pages/${lang}/${name}.vue`)
const importDocs = (lang, path) => () => import(`./docs/${lang}${path}.md`)

const registerRoute = (navConfig) => {
  let route = []
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang]
    route.push({
      path: `/${lang}/component`,
      redirect: `/${lang}/component/installation`,
      component: importMap(lang, 'component'),
      children: []
    })
    navs.forEach(nav => {
      if (nav.href) return
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index)
          })
        })
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index)
        })
      } else {
        addRoute(nav, lang, index)
      }
    })
  })
  function addRoute (page, lang, index) {
    const component = importDocs(lang, page.path)
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    }

    route[index].children.push(child)
  }

  return route
}

let route = registerRoute(navConfig)

const generateMiscRoutes = function (lang) {
  let guideRoute = {
    path: `/${lang}/guide`, // 指南
    redirect: `/${lang}/guide/design`,
    component: importMap(lang, 'guide'),
    children: [{
      path: 'design', // 设计原则
      name: 'guide-design' + lang,
      meta: { lang },
      component: importMap(lang, 'design')
    }, {
      path: 'nav', // 导航
      name: 'guide-nav' + lang,
      meta: { lang },
      component: importMap(lang, 'nav')
    }]
  }

  let resourceRoute = {
    path: `/${lang}/resource`, // 资源
    meta: { lang },
    name: 'resource' + lang,
    component: importMap(lang, 'resource')
  }

  let indexRoute = {
    path: `/${lang}`, // 首页
    meta: { lang },
    name: 'home' + lang,
    redirect: `/${lang}/component/changelog`,
    component: importMap(lang, 'index')
  }

  return [guideRoute, resourceRoute, indexRoute]
}

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang))
})

let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'en-US'
let defaultPath = '/zh-CN'
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN'
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}])

export default route
