const express = require('express');
const router = express.Router();

// routes Get api/bus
//@desc Test api
// @access public
router.get('/', (req,res) => res.send('bus route'));
module.exports = router;