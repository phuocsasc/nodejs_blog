const express = require('express')
const app = express()
const port = 3000
// Định nghĩa tuyến đường đi
app.get('/', (req, res) => {
      var a = 15;
      var b = 16;
      var c = a +b
      res.send('Hello World!')
})
// 127.0.0.1 - localhost
app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
