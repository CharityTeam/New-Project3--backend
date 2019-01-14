var express = require('express');
var router = express.Router();
const oneCase = require('../models/cases')

const sendCases = (req, res) => res.json(res.locals.cases);
const sendCase = (req, res) => res.json(res.locals.case);
const sendSuccess = (req, res) => res.json({ message: 'success' });

router.get('/', oneCase.getAll, sendCases);
router.get('/:id', oneCase.find, sendCase);
router.post('/', oneCase.create, sendCase);
router.put('/:id', oneCase.update, sendCase);
router.delete('/:id', oneCase.delete, sendSuccess);

// WE NEED TO ADD oneCase.find , NEED YOUR HELP

module.exports = router;