const express = require('express');
const router = express.Router();

// routes Get api/Booking
//@desc Test api
// @access public
router.get('/', (req,res) => res.send('Booking route'));
module.exports = router;