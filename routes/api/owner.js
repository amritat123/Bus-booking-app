const express = require('express');
const router = express.Router();

// routes Get api/owner
//@desc Test api
// @access public
router.get('/', (req,res) => res.send('owner route'));
module.exports = router;