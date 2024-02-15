const Input = require("../modules/userInput");
const login = require("../menu/login");

let productInfo = [];

let sql = `select * from product`;
let menu;

function getProductInfo(connection) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) return reject(error);
      else {
        return resolve(results);
      }
    });
  });
}

async function product(connection) {
  await getProductInfo(connection)
    .then(async (results) => {
      productInfo = [];
      for (data of results) {
        const obj = {};
        obj.id = data.productID;
        obj.name = data.productName;
        obj.desc = data.description;
        productInfo.push(obj);
      }
      console.log("상품을 선택하세요. (숫자 입력)");
      for (data of productInfo) {
        console.log(`${data.id}. ${data.name} - ${data.desc}`);
      }
      menu = await Input.getUserInput();

      console.log(`${productInfo[menu - 1].name}을 선택하셨습니다.`);
      console.log(`${productInfo[menu - 1].id}를 장바구니에 추가합니다.`);
      return menu;
    })

    .then(async (menu) => {
      let sql2 = `insert into bag values(null,'a',${productInfo[menu - 1].id})`;
      let sql3 = `select productName from bag,product 
  where bag.productID = product.productID`;
      connection.query(sql2, (error, results, fields) => {
        if (error) return console.error(error.message);

        connection.query(sql3, (error, results, fields) => {
          if (error) return console.error(error.message);

          console.log(`-------장바구니에 담긴 상품 리스트-------`);
          const bagList = [];

          for (data of results) {
            const obj = {};
            obj.name = data.productName;
            bagList.push(obj);
          }
          console.table(bagList);
        });
      });
    });
}

module.exports = { product };
