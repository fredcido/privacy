/**
 * Module Dependencies
 */
const express = require('express');
const morgan = require('morgan');
const { renderToString } = require('./hydrate');
const data = require('./db.json');

const app = express();

app.use(morgan('dev'));
app.use('/public', express.static('dist'));

const getSettings = (id) => data.settings.find(item => item.id == id);

/**
 * Routes
 */
app.get('/settings/:id', function(req, res, next){
  const { id } = req.params;
  const settings = getSettings(id);
  res.json(settings);
});

app.use(async function(req, res) {
  const initialSettings = getSettings('7c3157c8-d724-47d9-9687-4bc2c8501d32');
  const inputHtml = `
    <html>
    <head>
      <title>Privacy Settings SSR</title>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
      <style type="text/css">

        body {
          font-family: "Open Sans";
        }
      </style>
    </head>
    <body>
      <h1>Settings configurations</h1>

      <p>Please check the source code of the page. Firstly, you are going to see the code sent by 
      the server hydrated. Once the code gets downloaded by the browser, the components
      get mounted and the request to get settings information dispatched</p>

      <h2>Hydrated in the client</h2>
      <upc-privacy-settings product-id="51d1c884-3c2f-4607-bf0d-51e72d4e8f11" base-api="/settings"></upc-privacy-settings>

      <h2>Hydrated in the server</h2>
      <upc-privacy-settings id="server-hydrated"></upc-privacy-settings>

      <script type="module" src="/public/privacy-settings/privacy-settings.esm.js"></script>
      <script nomodule src="/public/privacy-settings/privacy-settings.js"></script>

      <script type="text/javascript">
        const initialSettings = ${JSON.stringify(initialSettings)}
        document.getElementById('server-hydrated').settings = initialSettings;
      </script>
    </body>
    </html>
  `;

  const result = await renderToString(inputHtml, {
    removeBooleanAttributeQuotes: true,
    prettyHtml: true
  });
  res.send(result.html);
});

/**
 * Start Server
 */
const port = process.env.PORT || 3000;
app.listen(3000);
console.log('Express listening on port 3000...');