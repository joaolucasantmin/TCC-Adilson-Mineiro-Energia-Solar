import express from 'express'

const app = express()

/*Rotas precisam de:
  1- Tipo de rota / método HTTP
  2- Endereço*/


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})


//CONTINUAR A PARTIR DE DO MINUTO 13:30 DO VIDEO https://www.youtube.com/watch?v=PyrMT0GA3sE