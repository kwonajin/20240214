const Input = require("../modules/userInput");
const run = require("../modules/runSql");

// rows from location
let locationSql = `select * from location`;

let locationInfo = [];

function getLocationInfo(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) return reject(error);
      else {
        return resolve(results);
      }
    });
  });
}

async function location(connection) {
  await getLocationInfo(connection, locationSql).then(async (results) => {
    locationInfo = [];
    for (data of results) {
      const obj = {};
      obj.id = data.locationID;
      obj.name = data.locationName;
      obj.address = data.locationAddress;
      locationInfo.push(obj);
    }
    console.log("지역을 선택하세요. (숫자 입력)");

    for (let i = 0; i < locationInfo.length; i++) {
      console.log(`${i + 1}. ${locationInfo[i].name}`);
    }
    let locatoinIndex = (await Input.getUserInput()) - 1;
    console.log(`--- ${locationInfo[locatoinIndex].name} ---.`);

    console.log("1. 매장 재고 | 2. 상세 주소");
    let menu = await Input.getUserInput();

    if (menu === "1") {
      // 매장 재고 확인
      sql = `select productName from product, location where product.locationID = location.locationID and product.locationID = '${locationInfo[locatoinIndex].id}';`;

      getLocationInfo(connection, sql).then((results) => {
        console.table(results);
      });
    } else if (menu === "2") {
      console.log(locationInfo[locatoinIndex].address);
    }
  });
}

module.exports = { location };
