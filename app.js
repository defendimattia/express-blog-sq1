// importa express e crea l'app
const express = require("express")
const app = express()

// definisce la porta
const port = 3000

// importa il router dei post
const postsRouter = require("./routers/posts-router")
// importa middleware
const notFound = require("./middleware/not-found")
const errorsHandler = require("./middleware/errors-handler")


// middleware body-parser json
app.use(express.json())

// assegna il router dei post con la rotta "/posts"
app.use("/posts", postsRouter)


// gestisce le rotte non trovate
app.use(notFound)
// gestisce gli errori
app.use(errorsHandler)


// avvia il server e mostra il messaggio in console
app.listen(port, () => { console.log(`Listening on port ${port}`) })