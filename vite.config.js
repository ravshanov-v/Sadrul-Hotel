import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const apiDir = path.join(root, 'api')

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('invalid_json'))
      }
    })
    req.on('error', reject)
  })
}

function apiFunctions(env) {
  return {
    name: 'api-functions',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/ariza', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Allow', 'POST')
          res.end('Method Not Allowed')
          return
        }

        let body
        try {
          body = await readBody(req)
        } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ ok: false, error: 'invalid_json' }))
          return
        }

        const keys = ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID', 'TELEGRAM_API_URL']
        const saved = Object.fromEntries(keys.map((k) => [k, process.env[k]]))
        for (const k of keys) {
          if (env[k]) process.env[k] = env[k]
          else delete process.env[k]
        }
        req.body = body

        try {
          const mod = await import(/* @vite-ignore */ pathToFileURL(path.join(apiDir, 'ariza.js')).href)
          await mod.default(req, res)
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false, error: 'handler_failed', message: error.message }))
        } finally {
          for (const k of keys) {
            if (saved[k] === undefined) delete process.env[k]
            else process.env[k] = saved[k]
          }
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '')
  return {
    plugins: [react(), tailwindcss(), apiFunctions(env)],
  }
})
