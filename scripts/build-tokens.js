const fs = require('fs')
const toKebabCase = (string) => { return string.replace(/([A-Z])([A-Z])/g, '$1-$2').replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase() }
const cleanLines = (string = '') => { return string.trim().replace(/^\n\n/gm, '\n') }

function transformTokens(parentKey, object) {
  const objectKeys = Object.keys(object)

  return objectKeys.reduce((transformedTokens, objectKey) => {
    const value = object[objectKey]
    const customProperty = parentKey
      ? toKebabCase(`${parentKey}-${objectKey}`)
      : toKebabCase(`${objectKey}`)

    if (Array.isArray(value)) {
      return `${transformedTokens}\n  --${customProperty}: ${value.join(', ')};`
    } else if (typeof value === 'object') {
      return `${transformedTokens}\n${transformTokens(customProperty, value)}`
    }

    const label = `--${parentKey}-${toKebabCase(objectKey)}`
    return `${transformedTokens}\n  ${label}: ${value};`
  }, '')
}

function buildTokens({ theme = 'light', selector = ':root' }) {
  const transformedDecisions = transformTokens(null, theme === 'dark' ? require('./tokens/dark-decisions') : require('./tokens/decisions'))
  const data = `${selector} {\n${cleanLines(transformedDecisions)}\n}`

  fs.writeFileSync(
    `./stories/assets/public/global.${theme}.css`,
    data,
    'utf8'
  )
}

buildTokens({ theme: 'light', selector: ':root' })
buildTokens({ theme: 'dark', selector: ':root[data-theme="dark"]' })
