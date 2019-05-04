const express = require('express');
const router = express.Router();

// @route   GET api/projects
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Project route'));

module.exports = router;