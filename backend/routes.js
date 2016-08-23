'use strict'

var router = require('express').Router();
var database = require('./c36_modules/database');

module.exports = function() {

  router.get('/', function(req,res){
    return res.render('homepage.html');
  });

  router.get('/register', function(req,res){
    return res.render('register.html');
  });
  
  router.get('/login', function(req,res){
    return res.render('login.html');
  });
  
  router.get('/about', function(req,res){
    return res.render('aboutpage.html');
  });
  
  router.get('/game', function(req,res){
    return res.render('gamingarena.html');
  });
  
  router.get('/settings', function(req,res){
    return res.render('settings.html');
  });
  
  router.get('/profile', function(req,res){
    return res.render('Playerprofile.html');
  });

  return router
}();
