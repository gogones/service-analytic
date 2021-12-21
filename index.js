const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const store = require('store');

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


// route webhooks
app.post('/webhooks', async (req, res) => {
    const getStorage = store.get('data');
    if(!getStorage) {
        store.set("data", [...new Array(), req.body])
    } else {
        store.set("data", [...getStorage, req.body])
    }

    return res.send(req.body)
})

app.get("/", (req, res) => {
    return res.send("datangg dan pergi itu wajar")
})

app.get("/getList", (req, res) => {
    return res.send(store.get('data'))
})


app.listen(3000)
