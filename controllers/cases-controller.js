var express = require('express');
var router = express.Router();
const oneCase = require('../models/cases.js');

const sendCases = (req, res) => res.json(res.locals.cases);
const sendCase = (req, res) => res.json(res.locals.case);
const sendDonation = (req, res) => res.json(res.locals.donation);
const sendSuccess = (req, res) => res.json({ message: 'success' });

router.get('/', oneCase.getAll, sendCases);
router.post('/', oneCase.create,  oneCase.createDonation, sendCase);
router.post('/:id', oneCase.addDonation, sendDonation);
router.put('/:id', oneCase.update, oneCase.getDonation, sendCase);
router.delete('/:id', oneCase.deleteDonation, oneCase.delete, sendSuccess);



module.exports = router;