const express = require('express');
const router = express.Router();

// import controllers 
const {localFileUpload} = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);

module.exports = router;