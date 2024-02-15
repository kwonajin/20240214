const Input = require("../modules/userInput");
const run = require("../modules/runSql");

let idInput;
let passwordInput;
let password;
let loginSql;

loginSql = `select * from user`;

async function loginInput() {
  process.stdout.write("아이디를 입력해 주세요: ");

  idInput = await Input.getUserInput();

  process.stdout.write("비밀번호를 입력해 주세요: ");

  passwordInput = await Input.getUserInput();
}

async function login(connection) {
  await loginInput().then(() => {
    loginSql = `select password, userName from user where userID='${idInput}'`;
    run.runSql(connection, loginSql).then((result) => {
      if (result.length === 0) {
        console.log("존재하지 않는 유저입니다.");
        process.exit();
      }

      password = result[0].password;

      if (passwordInput !== password) {
        console.log("비밀번호가 잘못되었습니다.");
      } else {
        console.log(`${result[0].userName}님 환영합니다!`);
      }
    });
  });
}

module.exports = { login };
