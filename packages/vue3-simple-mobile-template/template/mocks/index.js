import { resolve } from 'path'
import url from 'url'
import chokidar from 'chokidar'
import chalk from 'chalk'
import glob from 'glob'
import Mock from 'mockjs'

const flatten = arr =>
  arr.reduce((arr, val) => arr.concat(Array.isArray(val) ? flatten(val) : val), [])

const mockDir = resolve(process.cwd(), 'mocks')

let mocksForServer = []
function registerRoutes(opt = {}) {
  const mocks = flatten(glob.sync(resolve(__dirname, 'routes/**/*.js')).map(item => require(item)))
  mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response, opt)
  })
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

const responseFake = (url, type, respond, { baseURL = '' }) => {
  return {
    url: new RegExp(`${baseURL}${url}`),
    type: type || 'get',
    response(req, res) {
      return Mock.mock(respond instanceof Function ? respond(req, res) : respond)
    }
  }
}

function parseJson(req) {
  return new Promise(resolve => {
    let body = ''
    let jsonStr = ''
    req.on('data', function (chunk) {
      body += chunk
    })
    req.on('end', function () {
      try {
        jsonStr = JSON.parse(body)
      } catch (err) {
        jsonStr = ''
      }
      resolve(jsonStr)
      return
    })
  })
}

export async function requestMiddleware(opt) {
  const middleware = async (req, res, next) => {
    let queryParams = {}
    if (req.url) {
      queryParams = url.parse(req.url, true)
    }
    const reqUrl = queryParams.pathname
    const matchRequest = mocksForServer.find(mock => {
      if (mock.type.toUpperCase() !== req.method) {
        return false
      }
      return mock.url.test(reqUrl)
    })
    if (matchRequest) {
      const body = await parseJson(req)
      req.body = body
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200
      res.end(JSON.stringify(matchRequest.response(req, res)))
      return
    }
    next()
  }
  return middleware
}

export default function viteMock(opt = {}) {
  return {
    name: 'vite-mock',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      if (mocksForServer.length > 0 || resolvedConfig.command !== 'serve') return
      registerRoutes(opt)
      // 监听文件变化
      chokidar
        .watch(mockDir, {
          ignored: /index/,
          ignoreInitial: true
        })
        .on('all', (event, path) => {
          if (event === 'change' || event === 'add') {
            try {
              unregisterRoutes()
              registerRoutes()
              console.log(chalk.magentaBright(`\n > Mock Server 热更新成功! 改变的文件： ${path}`))
            } catch (error) {
              console.log(chalk.redBright(error))
            }
          }
        })
    },
    async configureServer({ middlewares }) {
      const { isDev } = opt
      if (!isDev) {
        return
      }
      const middleware = await requestMiddleware(opt)
      middlewares.use(middleware)
    }
  }
}
