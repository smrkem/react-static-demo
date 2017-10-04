import React from 'react'

const Template = (props) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>{props.title}</title>
        <meta property="og:site_name" content="React Static Demo" />
        <meta name="description" content={props.description} />
        {props.css.map(file => <link href={`/${file}`} rel="stylesheet" />)}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.js.map(file => <script src={`/${file}`} async></script>)}
      </body>
    </html>
  )
}

export default Template
