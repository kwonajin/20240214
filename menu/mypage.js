const mysql = require("mysql");
const runSql = require("../modules/runSql");

// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

let mypagesql = `select * from user where userID='qwer1234'`
let mypageInfo


async function mypage(connection) {
  runSql.runSql(connection,mypagesql).then ((result) => {
    console.log('------------------------------------------마이페이지-----------------------------------------')
    
    mypageInfo = [];
    let obj = {};
    obj.userID = result[0].userID;
    obj.userName = result[0].userName;
    obj.password = result[0].password;
    obj.contact = result[0].contact;
    obj.address = result[0].address;
    mypageInfo.push(obj);
    console.table(mypageInfo);
  })
}
module.exports = { mypage };