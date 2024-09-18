var express = require("express");
var router = express.Router();
var LoginService = require("../services/login.services");
//importando dependencias necessarias de login

//criando rota de login
router.post("/login", (req, res, next) => {
  //chamando funcção que autentica
  let resposta = LoginService.login(req.body);
  res.json(resposta);
});

module.exports = router;
