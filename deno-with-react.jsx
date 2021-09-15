import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";

const app = createApp();

let colores = []

app.handle("/", async (req) => {
  if (
    req.method === "POST"
  ) {
    const bodyForm = await req.formData()
    const color = bodyForm.value('color')
    if (color) {

      colores.push(color);
    }
  }
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest - Colores</title>
        </head>
        <body style={{ backgroundColor: "black" }}>
          <h1 style={{ color: "blue" }}>Servest con React - Lista de colores con POST!</h1>
          <h3 style={{ color: "purple" }}>
            Ingresa los colores en inglés:
          </h3>

          <form action="/" method="POST">
            <input type="text" id="color" name="color" />
            <input type="submit" value="Submit" />
          </form>
          <h2 style={{ color: "white" }}>Listado de colores:</h2>
          <ul>
            {colores.map(item_color => (
              <li style={{ color: item_color }}>{item_color}</li>
            ))}
          </ul>
        </body>
      </html>,
    ),
  });
});

app.listen({ port: 8899 });
