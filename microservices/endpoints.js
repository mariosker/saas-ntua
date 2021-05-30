const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// app.post('users/')
app.post('users/login')

// app.post('questions/')
app.post('questions/:question_id/:user_id/answers')
app.get('questions/')
app.get('questions/count/:from')

app.post('hashtags/get_popular')

app.listen(port, function () {
  console.log('Server started on port: ' + port)
})
