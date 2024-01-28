const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const URL = require('../models/url');

const isValidUrl = (url) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
  };

generateNewShortURL = async (req, res) => {
    const { url, customUrl } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      } else if (!isValidUrl(url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
      }

    if (customUrl) {
        const existingURL = await URL.findOne({ shortId: customUrl });
        if (existingURL) {
          return res.status(400).json({ error: 'Custom short link is not unique.' });
        }
      }

    const shortID = customUrl || nanoid(3) || nanoid(6);
    const rootURL = process.env.URL;
    const shortURL = rootURL + 'link/' + shortID;
    
    try {
        await URL.create({
            shortId: shortID,
            shortURL: shortURL,
            redirectURL: url,
            visitHistory: [],
        });
    } catch(err){
        res.status(400).json({message: err.message});
    }

    return res.json({ id: shortID, redirectURL: shortURL });
}

getAllURL = async (_, res) => {
    try {
        const allData = await URL.find().sort({dateCreated: 1});
        res.status(200).json(allData);
    } catch (error) {
        console.error(error);
    }
}

getAnalytics = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });
        return res.json({ 
            totalClicks: result.visitHistory.length, 
            analytics: result.visitHistory,
        });
    } catch (error) {
        console.error(error);
    }
}

deleteData = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({error: " No such data"});
    }

    try {
        const data = await URL.findOneAndDelete({_id: id});
        if(!data) {
            return res.status(400).json({error: "No such data"});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
    }
}

module.exports= { 
    generateNewShortURL,
    getAnalytics, 
    getAllURL, 
    deleteData,
}