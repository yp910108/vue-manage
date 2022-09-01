const icons = require.context('./', false, /\.svg$/)
for (const key of icons.keys()) {
  icons(key)
}
