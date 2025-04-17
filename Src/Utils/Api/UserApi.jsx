const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('api/kayit', (req, res) => {
    const {isim,yas} = req.body;

    if(!isim || !yas) {
        return res.status(400).json({hata:'İsim ve yaş gerekli'});

    }
    const premium = yas >= 18;

    res.json({
        mesaj:`Hoşgeldin${isim}, kayıt başarılı`,
        premium
    });
});

app.listen(3000 ,() => {
    console.log('Api 3000 portunda çalışıyo ');
})