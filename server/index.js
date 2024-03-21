const express = require('express');
const { connectToMongDB } = require('./utils/connect');
const URL = require('./url/models/url');
const cors = require('cors');
const parser = require('ua-parser-js');

require('dotenv').config();

const urlRoute = require('./url/routes/url');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectToMongDB(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/url', urlRoute);

app.use('/', (req, res) => {
    res.status(200).json({"success":"api deployed"})
})

app.get('/', (req, res) => {
    res.status(200).json({"success":"get from /"})
})

app.get('/link/:shortId', async (req, res) => {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId }, 
            {
            $push: {
            visitHistory: {
                ip: req.ip,
                userAgent: parser(req.headers['user-agent']),
                timestamp: Date.now()
            }
        }
    });
res.redirect(entry.redirectURL)
});

app.listen(PORT, () => {
    console.log(`Server start at PORT: ${PORT}`);
});
