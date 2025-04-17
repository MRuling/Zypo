const express = require('express');
const app = express();

app.get("/api/ai/get",(req, res) => {
    res.json({mesaj:'Merhaba dünya',"yaş":25});
    rs
})

app.listen(3000, () => {
    console.log('Api 3000 portunda  çalışıyor')
})