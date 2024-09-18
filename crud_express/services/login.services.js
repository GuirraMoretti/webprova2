//const LoginModel = require("../models/login");
//criando user padrao em memoria
const user = {
  login: "web",
  senha: "nota10",
};

//criando função de login service
class LoginService {
  static login(data) {
    //se for igual os dados retorna true
    if (user.login == data.login && user.senha == data.senha) {
      return { res: "true" };
    }
    //se os dados forem falsos retorna false
    return { res: false };
  }
}
module.exports = LoginService;
