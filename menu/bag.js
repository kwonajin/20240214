const Input = require('../modules/userInput');
let mysql = require('../mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// showCartMenu 함수를 정의한다.
async function showCartMenu(connection) {
  // showCartMenu 함수의 구현 내용
}

async function main(){
  console.clear();
  connection.connect();
  while(true){

    // 메인메뉴
    // console.log(`ㅣ0. 회원가입 ㅣ 1. 로그인 ㅣ 2. 상품 ㅣ 3.매장 ㅣ 4.장바구니 ㅣ 5.마이페이지 ㅣ`);

  console.log('╔═════════════╦═══════════╦═════════╦═════════╦═════════════╦════════════════╗');
  console.log('║ 0. 회원가입 ║ 1. 로그인 ║ 2. 상품 ║ 3. 매장 ║ 4. 장바구니 ║ 5. 마이페이지  ║');
  console.log('╚═════════════╩═══════════╩═════════╩═════════╩═════════════╩════════════════╝');

    let menu = await Input.getUserInput();

    // 회원가입
    if(menu==='0') {
      console.log('회원가입');
      let title = await Input.getUserInput();
      console.log('');
      let sql = `INSERT INTO todos(title,completed) VALUES(?,false)`;
      connection.query(sql,[title]);

    // 로그인 
    }else if(menu==='1'){
      console.log('로그인');

    // 상품 
    }else if(menu==='2'){   
      while(true){ 
      console.log(`1. 상품리스트 ㅣ 2. 상품선택(장바구니로) ㅣ 3.메뉴로 돌아가기`);
      let menu = await Input.getUserInput();
      if(menu==='1') {
        console.log('상품리스트');
      }else if(menu==='2'){
        console.log('상품선택(장바구니로)');
      }else if(menu==='3'){ 
        console.log('메뉴로 돌아가기');
        connection.end();
        process.exit();
      }else{ 
          console.log('메뉴를 잘못 선택하셨습니다.');
      };
      await wait(1000);
      console.clear();
    };

    // 매장
    }else if(menu==='3'){   
      while(true){ 
      console.log(`1. 매장리스트 ㅣ 2. 매장선택 ㅣ 3. 메뉴로 돌아가기`);
      let menu = await Input.getUserInput();
      if(menu==='1') {
        console.log('매장리스트');
      }else if(menu==='2'){
        console.log('매장선택');
      }else if(menu==='3'){ 
        console.log('메뉴로 돌아가기');
        connection.end();
        process.exit();
      }else{ 
          console.log('메뉴를 잘못 선택하셨습니다.');
      };
      await wait(1000);
      console.clear();
    };





    // 장바구니
    }else if(menu==='4'){   
      while(true){ 
      // await showCartMenu(connection);
      // console.log(`1. 장바구니 리스트 ㅣ 2. 주문 ㅣ 3.삭제 ㅣ 4. 메뉴로 돌아가기`);

      console.log('╔════════════════════╦═════════╦═════════╦════════════════════╗');
      console.log('║ 1. 장바구니 리스트 ║ 2. 주문 ║ 3. 삭제 ║ 4. 메뉴로 돌아가기 ║');
      console.log('╚════════════════════╩═════════╩═════════╩════════════════════╝');

      let cartmenu = await Input.getUserInput();
      if(cartmenu==='1') {
        console.log('<장바구니 리스트>');

        let connection = mysql.createConnection({
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        const sql = 'select productName from bag,product where bag.productID = product.productID'
        connection.query(sql, (error, results, fields) => {
          if (error) return console.error(error.message);
          const bagProductNames = [];
          for (data of results) {
              bagProductNames.push(data.productName);
          }
        //   console.log(bagProductNames);

          // console.table(bagProductNames);

          console.log('╔════════╦════════════════════╗');
          console.log('║  번호  ║       상품명       ║');
          console.log('╚════════╩════════════════════╝');
      
          // 각 상품명을 표에 추가
          bagProductNames.forEach((productName, index) => {
            // 번호와 상품명 출력
            const num = (index + 1).toString().padStart(6);
            const name = productName.padEnd(14);
            console.log(`║ ${num} ║ ${name} ║`);
          });
      
          // 테이블 바닥 출력
          console.log('╚════════╩════════════════════╝');
        });
        // await wait(3000);

      }else if(cartmenu==='2'){
        console.log('<장바구니 주문>');
        let connection = mysql.createConnection({
          host:process.env.DB_HOST,
          port:process.env.DB_PORT,
          user:process.env.DB_USER,
          password:process.env.DB_PASSWORD,
          database:process.env.DB_NAME
        })
        const productInfo = [];

        let sql = `select productName from bag,product where bag.productID = product.productID`;

        function getProductInfo () {
          return new Promise((resolve, reject)=>{
            connection.query(sql,(error, results, fields) => {
              if(error) return reject(error);
              else {
                return resolve(results);
              }
            })
          })
        };
        getProductInfo().then(async (results) => {
          for (data of results) {
              const index = results.indexOf(data);
              const obj = {};
              obj.name = data.productName;
              productInfo.push(obj);
          }

          console.log("[주문할 상품을 선택하세요. (숫자 입력)]");
          
          for(let i = 0; i < productInfo.length; i++) {
            console.log(`${i+1}. ${productInfo[i].name}`);
          }


          let menu = await Input.getUserInput();
          console.log(`${productInfo[menu-1].name}을 선택하셨습니다.`);
          console.log(`${productInfo[menu-1].name}의 주문이 완료되었습니다.\n`);
          console.log('주문하신 상품은 2~3일 이내로 배송될 예정입니다. 감사합니다!\n');
          // process.exit();
          await wait(5000);
        })

      }else if(cartmenu==='3'){
        console.log('[장바구니 삭제]');

        // 장바구니 리스트를 가져오는 함수
        const getCartList = () => {
          return new Promise((resolve, reject) => {
            const sql = 'SELECT p.productName FROM bag b JOIN product p ON b.productID = p.productID';
            connection.query(sql, (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                const cartList = results.map(row => row.productName);
                resolve(cartList);
              }
            });
          });
        };

        // 장바구니 리스트를 보여줌
        const cartList = await getCartList();
        console.log('╔══════╦════════════════════╗');
        console.log('║ 번호 ║       상품명       ║');
        console.log('╚══════╩════════════════════╝');
        cartList.forEach((product, index) => {
          const paddedIndex = (index + 1).toString().padStart(4, ' ');
          const paddedProduct = product.padEnd(14, ' ');
          console.log(`║ ${paddedIndex} ║ ${paddedProduct} ║`);
        });
        console.log('╚══════╩════════════════════╝');

        // 사용자에게 선택할 상품의 인덱스를 입력받음
        const selectedIndex = await Input.getUserInput("삭제할 상품의 인덱스를 입력하세요: ");

        const sql = 'SELECT productID FROM bag';
        connection.query(sql, (error, results, fields) => {
          if (error) return console.error(error.message);
          const productIDs = results.map(row => row.productID);
          if (selectedIndex >= 1 && selectedIndex <= productIDs.length) {
            const sqlDelete = `DELETE FROM bag WHERE productID = ?`;
            connection.query(sqlDelete, [productIDs[selectedIndex - 1]], (error, results, fields) => {
              if (error) return console.error(error.message);
              console.log('항목이 성공적으로 삭제되었습니다.');
              // 장바구니 메뉴를 다시 표시하고 사용자 입력을 기다림
              showCartMenu();
            });
          } else {
            console.log('올바르지 않은 인덱스입니다.');
            // 장바구니 메뉴를 다시 표시하고 사용자 입력을 기다림
            showCartMenu();
          }
        });
      
      }else if(cartmenu==='4'){ 
        console.log('메뉴로 돌아가기');
        break
      }else{ 
          console.log('메뉴를 잘못 선택하셨습니다.');
      };
      await wait(5000);
    };





    // 내정보
    }else if(menu==='5'){   
      while(true){ 
      console.log(`1. 내정보 ㅣ 2. 메뉴로 돌아가기`);
      let menu = await Input.getUserInput();
      if(menu==='1') {
        console.log('내정보');
      }else if(menu==='2'){ 
        console.log('메뉴로 돌아가기');
        connection.end();
        process.exit();
      }else{ 
          console.log('메뉴를 잘못 선택하셨습니다.');
      };
      await wait(1000);
      console.clear();
    };
        }else{ 
            console.log('메뉴를 잘못 선택하셨습니다.');
        };
        await wait(1000);
        console.clear();
      };
      
    };

main();

const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
