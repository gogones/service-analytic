const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const Webhooks  = require('../models/webhooks');
const ServerlessHttp = require('serverless-http');
const store = require('store');

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

const Webhook = new Webhooks

const router = express.Router()

// route webhooks
router.post('/webhooks', async (req, res) => {
    const getStorage = store.get('data');
    if(!getStorage) {
        store.set("data", [...new Array(), req.body])
    } else {
        store.set("data", [...getStorage, req.body])
    }

    res.json(req.body)
})

router.get("/getList", (req, res) => {
    res.json(store.get('data'))
})

app.use('/.netlify/functions/api', router);

module.exports.handler = ServerlessHttp(app);