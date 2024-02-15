const mysql = require("mysql");
const Input = require("./userInput");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

let idInput;
let passwordInput;
let password;
let loginSql;

loginSql = `select * from user`;

function runSql(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) return reject(error);
      else {
        return resolve(results);
      }
    });
  });
}

async function loginInput() {
  process.stdout.write("아이디를 입력해 주세요: ");

  idInput = await Input.getUserInput();

  process.stdout.write("비밀번호를 입력해 주세요: ");

  passwordInput = await Input.getUserInput();
}

loginInput().then(() => {
  loginSql = `select password, userName from user where userID='${idInput}'`;
  runSql(loginSql).then((result) => {
    if (result.length === 0) {
      return console.log("존재하지 않는 유저입니다.");
    }

    password = result[0].password;

    if (passwordInput !== password) {
      console.log("비밀번호가 잘못되었습니다.");
    } else {
      console.log(`${result[0].userName}님 환영합니다!`);
    }
  });
});
