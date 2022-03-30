const express = require('express');
const router = express.Router();

// routes Get api/auth
//@desc Test api
// @access public
router.get('/', (req,res) => res.send('auth route'));
module.exports = router;