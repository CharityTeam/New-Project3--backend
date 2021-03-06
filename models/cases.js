const db = require('../db/config');
var oneCase = {};

oneCase.getAll = function(req, res, next){
    db.manyOrNone("SELECT c.id, c.name, c.details, c.city, c.email, c.phone, c.organtion_name, c.needed, c.img, SUM(d.doner_donation), COUNT(d.doner_donation) as numberOfDonors FROM cases c, donation d WHERE c.id = d.case_id GROUP BY c.id, c.name, c.details, c.city, c.email, c.phone, c.organtion_name, c.needed, c.img")
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



  oneCase.create = function (req, res, next) {
    console.log(req.body);
    db.one('INSERT INTO cases(name, details, city, email, phone, organtion_name, needed,img) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;',
          [req.body.name, req.body.details, req.body.city, req.body.email, req.body.phone, req.body.organtion_name, req.body.needed, req.body.img])
      .then(function (result) {

        console.log('\n\n\n\n\n&&&&&&&&&&&&&&&', result);
        req.case = result;
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  oneCase.createDonation = function (req, res, next) {
    console.log( '\n\n\n\n\n\n\n**********', req.case);
    db.one('INSERT INTO donation(doner_donation, case_id) VALUES ($1,$2) RETURNING *;',
          [req.body.doner_donation || 0, req.case.id])
      .then(function (result) {

        
        res.locals.case = req.case ;
        res.locals.case.donation = result ; 
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  oneCase.update = function (req, res, next) {
    db.one('UPDATE cases SET name=$1, details=$2, city=$3, email=$4, phone=$5,organtion_name=$6,needed=$7,img=$8 WHERE id=$9 RETURNING *;',
          [req.body.name, req.body.details, req.body.city, req.body.email, req.body.phone, req.body.organtion_name, req.body.needed, req.body.img, req.params.id])
      .then(function (result) {
        req.case = result;
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  oneCase.getDonation = function (req, res, next) {
    db.one('Select SUM(doner_donation) as sumdonation from donation where case_id = $1', [req.params.id])
      .then(function (result) {
        res.locals.case = req.case ;
        res.locals.case.donation = result ; 
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

  oneCase.deleteDonation = function (req, res, next) {
    db.none('DELETE FROM donation WHERE case_id=$1;', [req.params.id])
      .then(function () {
          console.log('scseefuly delete');
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
  }

  module.exports = oneCase;