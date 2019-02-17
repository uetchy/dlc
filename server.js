const express = require('express')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { join } = require('path')
const assert = require('assert')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const code = process.env.DLC_CODE
const filename = process.env.DLC_FILENAME
assert(code, 'DLC_CODE can not be blank')
assert(filename, 'DLC_FILENAME can not be blank')

app.prepare().then(() => {
  const server = express()

  server.get('/download', (req, res) => {
    if (req.query.code === code) {
      console.log('Serving', join(__dirname, 'contents', filename))
      res.setHeader('Content-disposition', `attachment; filename=${filename}`)
      res.sendFile(join(__dirname, 'contents', filename))
    } else {
      res.status(403).send({ error: 'invalid code' })
    }
  })

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
