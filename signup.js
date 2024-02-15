const Input = require('./userInput');
let mysql = require('mysql')

let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})
const userInfo = [];

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


async function signUp() {
  console.log(`-------회원가입-------`)
  console.log(`아이디를 입력해 주세요.`)
  let userID = await Input.getUserInput();
  console.log(`비밀번호를 입력해 주세요.`)
  let userPassword = await Input.getUserInput();
  console.log(`이름을 입력해 주세요.`)
  let userName = await Input.getUserInput();
  console.log(`연락처를 입력해 주세요.`)
  let userContact = await Input.getUserInput();
  console.log(`주소를 입력해 주세요.`)
  let userAddress = await Input.getUserInput();

  const obj = {};
  obj.ID = userID;
  obj.Password = userPassword;
  obj.Name = userName;
  obj.Contact = userContact;
  obj.Address = userAddress;
  userInfo.push(obj);
  console.table(userInfo);
  console.log(`입력한 내용이 맞으면 '1', 아니면 '2'를 입력해 주세요.`)
  let rep = await Input.getUserInput();
  if (rep ==='1') {
    let sql = `insert into user
                values(${userID},${userName},${userPassword},${userContact},${userAddress})`
    runSql(sql).then((result) => {
      console.log(result);
      console.log(`회원가입이 완료되었습니다.`);
      process.exit();
    })
  }else if (rep ==='2'){
    console.log(`취소되었습니다.`)
    process.exit();
  }else {
    console.log(`잘못된 입력입니다.`)
    process.exit();
  }
  // process.exit();
}




// let sql = `insert into user
// values(${userID},${userName},${userPassword},${userContact},${userAddress})`

// connection.query(sql,(error, results, fields) => {
//   if(error) return reject(error);
//   else {
//     return resolve(results);
//   }
// })



signUp();
