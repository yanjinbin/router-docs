import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const [distDir = 'dist', baseArg = '/'] = process.argv.slice(2)
const base = `/${baseArg.replace(/^\/|\/$/g, '')}/`.replace(/^\/\/$/, '/')
const baseName = base.replace(/^\/|\/$/g, '')

if (!baseName) {
  process.exit(0)
}

const attrPattern = new RegExp(`\\b(href|src|action)=(["'])/(?!/|${escapeRegExp(baseName)}(?:/|["']))`, 'g')
const urlPattern = new RegExp(`url\\((["']?)/(?!/|${escapeRegExp(baseName)}(?:/|["')]))`, 'g')

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? walk(path) : path
  }))
  return files.flat()
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

for (const file of await walk(distDir)) {
  if (!/\.(html|css)$/.test(file)) {
    continue
  }

  const original = await readFile(file, 'utf8')
  const rebased = original
    .replace(attrPattern, `$1=$2${base}`)
    .replace(urlPattern, `url($1${base}`)

  if (rebased !== original) {
    await writeFile(file, rebased)
  }
}
