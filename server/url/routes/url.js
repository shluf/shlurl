const express = require('express');
const router = express.Router();
const { 
    generateNewShortURL, 
    getAnalytics, 
    getAllURL, 
    deleteData } = require('../controllers/url');

router.post('/new', generateNewShortURL);

router.get('/data', getAllURL);

router.delete('/:id', deleteData);

router.get('/analytics/:shortId', getAnalytics);

module.exports = router;
