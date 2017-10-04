import React from 'react'
import { render } from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'
import Routes from './components/Routes/Routes'
import Template from './Template'
import { paths } from './SiteConfig'
import 'normalize.css'
import './base.css'

const App = ({locals}) => (
  <StaticRouter location={locals.path} context={{}}>
    <Routes />
  </StaticRouter>
)

module.exports = locals => {
    const assets = Object.keys(locals.webpackStats.compilation.assets)
    const templateProps = {
      css: assets.filter(value => value.match(/\.css$/)),
      js: assets.filter(value => value.match(/\.js$/)),
      body: renderToString(<MyApp locals={locals} />),
      title: paths[locals.path].title,
      description: paths[locals.path].description
    }
    return `<!DOCTYPE html>${renderToStaticMarkup(<Template {...templateProps} />)}`
}

if (typeof document != 'undefined') {
  render(<App />, document.getElementById('app'))
}
