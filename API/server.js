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


//COMENTARIO DE TESTE DO GIT NA AULA DA ROSANA. COMENTARIO FEITO AS 14:16 DO DIA 26/06/26