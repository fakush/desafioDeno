//* 1- Crear un servidor que utilice el módulo http servest y genere la vista con React render.
import { createApp } from 'https://deno.land/x/servest@v1.3.1/mod.ts';
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from 'https://dev.jspm.io/react/index.js';
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server.js';

const path = Deno.cwd();
const arrayColores = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
const app = createApp();

app.handle('/', async (req) => {
  const message = (
    <html>
      <head>
        <meta charSet='utf-8' />
        <title>Desafío Deno</title>
        <link rel='stylesheet' href={`${path}/styles.css`}></link>
      </head>
      <body>
        <h1>Desafío Deno</h1>
        <br />
        <p>Ingrese un color (en inglés)</p>
        <form action='POST'>
          <input type='text' name='color' />
          <input type='submit' value='Enviar' />
        </form>
        <br />
        <p>Lista de colores</p>
        <ul style={{backgroundColor: 'black'}}>
          {arrayColores.map((color) => (
            <li key={color} style={{ color: color }}>
              {color}
            </li>
          ))}
        </ul>
      </body>
    </html>
  );

  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: ReactDOMServer.renderToString(message),
  });
});

app.handle('/POST', async (req) => {
  //Obtenemos la URL de la request
  console.log('URL ==>', req.url);
  //sacamos la query de la URL
  let query = req.url.replace(/\/POST/g, '');
  console.log('QUERY ===> ', query);
  //Sacamos el params de la query
  const params = new URLSearchParams(query);
  console.log('PARAMS ===>', params, '\n\n');
  //Sacamos el valor del parametro color
  let color = params.get('color');
  console.log(color)  

  if (color) {
    console.log('Recibido: ', color);
    arrayColores.push(color);
  }

  const message = (
    <html>
      <head>
        <meta charSet='utf-8' />
        <title>Desafío Deno</title>
        <link rel='stylesheet' href={`${path}/styles.css`}></link>
      </head>
      <body>
        <h1>Desafío Deno</h1>
        <br />
        <p>Ingrese un color (en inglés)</p>
        <form action='POST'>
          <input type='text' name='color' />
          <input type='submit' value='Enviar' />
        </form>
        <br />
        <p>Lista de colores</p>
        <ul style={{backgroundColor: 'black'}}>
          {arrayColores.map((color) => (
            <li key={color} style={{ color: color }}>
              {color}
            </li>
          ))}
        </ul>
      </body>
    </html>
  );

  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: ReactDOMServer.renderToString(message),
  });
});

app.listen({ port: 8080 });
