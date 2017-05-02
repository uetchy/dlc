const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { join } = require('path')
const assert = require('assert')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const code = process.env.DLC_CODE
const filename = process.env.DLC_FILENAME
assert(code, 'DLC_CODE can not be blank')
assert(filename, 'DLC_FILENAME can not be blank')

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/download') {
      if (query.code === code) {
        res.setHeader('Content-disposition', `attachment; filename=${filename}`)
        app.serveStatic(req, res, join(__dirname, 'contents', filename))
      } else {
        app.render(req, res, '/', query)
      }
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
