const Input = require("../modules/userInput");
const run = require("../modules/runSql");

const userInfo = [];

async function signUp(connection) {
  console.log(`-------회원가입-------`);
  console.log(`아이디를 입력해 주세요.`);
  let userID = await Input.getUserInput();
  console.log(`비밀번호를 입력해 주세요.`);
  let userPassword = await Input.getUserInput();
  console.log(`이름을 입력해 주세요.`);
  let userName = await Input.getUserInput();
  console.log(`연락처를 입력해 주세요.`);
  let userContact = await Input.getUserInput();
  console.log(`주소를 입력해 주세요.`);
  let userAddress = await Input.getUserInput();

  const obj = {};
  obj.ID = userID;
  obj.Password = userPassword;
  obj.Name = userName;
  obj.Contact = userContact;
  obj.Address = userAddress;
  userInfo.push(obj);
  console.table(userInfo);
  console.log(`입력한 내용이 맞으면 '1', 아니면 '2'를 입력해 주세요.`);
  let rep = await Input.getUserInput();
  if (rep === "1") {
    let sql = `insert into user
                values('${userID}','${userName}','${userPassword}','${userContact}','${userAddress}')`;

    run.runSql(connection, sql).then((result) => {
      console.log(result);
      console.log(`회원가입이 완료되었습니다.`);
    });
  } else if (rep === "2") {
    console.log(`취소되었습니다.`);
  } else {
    console.log(`잘못된 입력입니다.`);
  }
}

module.exports = { signUp };
