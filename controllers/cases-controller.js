var express = require('express');
var router = express.Router();
const oneCase = require('../models/cases')

const sendCase = (req, res) => res.json(res.locals.cases);
const sendCase = (req, res) => res.json(res.locals.cases);
const sendSuccess = (req, res) => res.json(res.locals.cases);