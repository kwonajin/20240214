/* Modules */
const mysql = require("mysql");
const Input = require("./modules/userInput");
const runSql = require("./modules/runSql");

/* menu */
const signUp = require("./menu/signup");
const login = require("./menu/login");
const product = require("./menu/product");
const location = require("./menu/location");
const bag = require("./menu/bag");

/* wait */
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function main() {
  while (true) {
    console.log(
      "╔═════════════╦═══════════╦═════════╦═════════╦═════════════╦════════════════╦══════════╗"
    );
    console.log(
      "║ 0. 회원가입 ║ 1. 로그인 ║ 2. 상품 ║ 3. 매장 ║ 4. 장바구니 ║ 5. 마이페이지  ║ 6. 종료  ║"
    );
    console.log(
      "╚═════════════╩═══════════╩═════════╩═════════╩═════════════╩════════════════╩══════════╝"
    );

    let menu = await Input.getUserInput();

    if (menu === "0") {
      await signUp.signUp(connection);
      await wait(3000);
    } else if (menu === "1") {
      await login.login(connection);
      await wait(3000);
    } else if (menu === "2") {
      await product.product(connection);
      await wait(3000);
    } else if (menu === "3") {
      await location.location(connection);
      await wait(3000);
    } else if (menu === "4") {
      await bag.main();
    } else if (menu === "6") {
      console.log("이용해주셔서 감사합니다.");
      process.exit();
    }
  }
}

main();
