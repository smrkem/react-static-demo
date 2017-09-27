import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'

import 'normalize.css'
import './base.css'

const Template = (props) => {
  const body = props.body
  
  return (
    <html>
      <head>
        <title>StaticYooo</title>
        {props.css.map(file => <link href={`/${file}`} rel="stylesheet" />)}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: body }} />
        {props.js.map(file => <script src={`/${file}`} async></script>)}
      </body>
    </html>
  )
}

const Home = () => (
  <div className="container">
    <h1>HomePage content all goes here...</h1>
  </div>
)

const About = () => (
  <div className="container">
    <h1>About Page content all goes here...</h1>
  </div>
)

const MyApp = ({locals}) => (
  <StaticRouter location={locals.path} context={{}}>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  </StaticRouter>
)

module.exports = locals => {
    const assets = Object.keys(locals.webpackStats.compilation.assets)
    const templateProps = {
      css: assets.filter(value => value.match(/\.css$/)),
      js: assets.filter(value => value.match(/\.js$/)),
      body: renderToString(<MyApp locals={locals} />),
    }
    return `<!DOCTYPE html>${renderToStaticMarkup(<Template {...templateProps} />)}`
}
