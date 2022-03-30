const express = require('express');
const router = express.Router();

// routes Get api/users
//@desc Test api
// @access public
router.get('/', (req,res) => res.send('User route'));
module.exports = router;
