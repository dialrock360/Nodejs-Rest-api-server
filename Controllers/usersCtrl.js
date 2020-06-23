// Imports
var bcrypt    = require('bcryptjs');
var jwtUtils  = require('../utils/jwt.utils');
var models    = require('../models');
var asyncLib  = require('async');

const CryptoJS = require("crypto-js");


 //  fonction de criptage

function cryptage(key, data) {

        return CryptoJS.AES.encrypt(data, key);
}

 //  fonction de decriptage

function decryptage(key, data) {
    
// Decrypt
var bytes  = CryptoJS.AES.decrypt(data.toString(), key);
        return bytes.toString(CryptoJS.enc.Utf8);
}

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;
const CRYPKEY  ="123";
// Routes
module.exports = {
  register: function(req, res) {
    
    // Params
    var nom    = req.body.nom;
    var email  = req.body.email;
    var tel    =  req.body.tel;
    var username = req.body.username;
    var password = req.body.password;
    var isAdmin      = req.body.isAdmin;

    if (nom == null || email == null || username == null  || tel == null || password == null) {
      var  str =  'parametre manquant = '+password+' -- '+email+' -- '+username+' -- '+nom+' -- '+tel+' -- '+isAdmin

      return res.status(400).json({ 'error': str });
    }

    if (username.length >= 13 || username.length <= 4) {
      return res.status(400).json({ 'error': 'Verifier la longeur du login (entre 5 - 12 lettre)' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email is invalide' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'password invalide (entre 4 - 8 lettre avec au moins 1 chiffre)' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['email','tel'],
          where: { 
            $or: [
              {
                email: 
                  {
                      $eq: email
                  }
              }, 
              {
                  tel: 
                  {
                    $eq: tel
                  }
              }, 
              {
                username: 
                  {
                      $eq: username
                  }
              }
          ]
          
          }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'Impossible de verifier le user' });
        });
      },
      function(userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
            done(null, userFound, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ 'error': 'Un utilisateur ayant ce numero ou cette A. email existe deja' });
        }
      },
      function(userFound, bcryptedPassword, done) {
        var newUser = models.User.create({
          nom: nom,
          email: email,
          tel: tel,
          username: username,
          password: bcryptedPassword,
          isAdmin: isAdmin,
          flag: 0
        })
        .then(function(newUser) {
          done(newUser);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'cannot add user' });
        });
      }
    ], function(newUser) {
      if (newUser) {
        return res.status(201).json({
          'userId': newUser.id
        });
      } else {
        return res.status(500).json({ 'error': 'cannot add user' });
      }
    });
  },
  login: function(req, res) {
    
    // Params
    var login    = req.body.login;
    var password = req.body.password;

    if (login == null ||  password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { 
            $or: [
              {
                email: 
                  {
                      $eq: login
                  }
              }, 
              {
                  tel: 
                  {
                      $eq: login
                  }
              }, 
              {
                username: 
                  {
                      $eq: login
                  }
              }
          ]
          }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            done(null, userFound, resBycrypt);
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function(userFound, resBycrypt, done) {
        if(resBycrypt) {
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'userId': userFound.id,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });
  },
  getUserProfile: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    models.User.findOne({
      attributes: [ 'id', 'email', 'username', 'isAdmin' ],
      where: { id: userId }
    }).then(function(user) {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'cannot fetch user' });
    });
  },
  updateUserProfile: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    
    var nom    = req.body.nom;
    var email  = req.body.email;
    var tel    =  req.body.tel;
    var username = req.body.username;
    var password = req.body.password;
    if (nom == null || email == null || username == null  || tel == null || password == null) {
      var  str =  'parametre manquant = '+password+' -- '+email+' -- '+username+' -- '+nom+' -- '+tel+' -- '

      return res.status(400).json({ 'error': str });
    }else{
      asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            attributes: ['id', 'isAdmin'],
            where: { id: userId }
          }).then(function (userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        },
        function(userFound, done) {
          if(userFound) {
            userFound.update({
              nom: (nom ? nom : userFound.nom),
              tel: (tel ? tel : userFound.tel),
              email: (email ? email : userFound.email),
              username: (username ? username : userFound.username),
              password: (password ? password : userFound.password)
            }).then(function() {
              done(userFound);
            }).catch(function(err) {
              res.status(500).json({ 'error': 'cannot update user' });
            });
          } else {
            res.status(404).json({ 'error': 'user not found' });
          }
        },
      ], function(userFound) {
        if (userFound) {
          return res.status(201).json(userFound);
        } else {
          return res.status(500).json({ 'error': 'cannot update user profile' });
        }
      });
    }

  }
}