var db = require('../db/dbconfig');
var oneCase = {};

oneCase.getAll = function(req, res, next){
    db.manyOrNone('SELECT * FROM cases;')
      .then(function(result){
          console.log(result);
        res.locals.cases = result;
        next()
      })
      .catch(function(error){
        console.log(error);
        next()
      })
  }

  oneCase.find = function (req, res, next) {
    db.one('SELECT * FROM cases WHERE id=$1;', [req.params.id])
      .then(function (result) {
        res.locals.cases = result;
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  oneCase.findByCountry = function (req, res, next) {
    db.manyOrNone("SELECT * FROM cases WHERE case_id=$1;", [req.params.id])
      .then(function (result) {
        res.locals.cases = result;
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  oneCase.create = function (req, res, next) {
    console.log(req.body);
    db.one('INSERT INTO cases(name, details, city, email, phone, organtion_name, needed,img) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING case_id;',
          [req.body.name, req.body.details, req.body.city, req.body.email, req.body.phone, req.body.organtion_name, req.body.needed, req.body.img, req.body.case_id])
      .then(function (result) {
        res.locals.caseId = result.case_id;
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  oneCase.update = function (req, res, next) {
    db.one('UPDATE cases SET name=$1, details=$2, city=$3, email=$4, phone=$5,organtion_name=$6,needed=$7,img=$8 WHERE id=$9 RETURNING case_id;'
          [req.body.name, req.body.details, req.body.city, req.body.email, req.body.phone, req.body.organtion_name, req.body.needed, req.body.img,req.params.id])
      .then(function (result) {
        res.locals.caseId = result.id;
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }


  oneCase.delete = function (req, res, next) {
    db.none('DELETE FROM cases WHERE id=$1;', [req.params.id])
      .then(function () {
          console.log('scseefuly delete');
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  module.explore = oneCase;