var mysql = require('mysql');
var inquirer = require('inquirer');
const {table} = require('table');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db"
});

function start() {

  connection.query('SELECT * FROM Products', function (err, res) {
    if (err) throw err;

    res.map(one => one.id);

    let data = [
      ['Item ID', 'Product Name', 'Department', 'Price', 'Stock']
    ];

    res.forEach(one => data.push([one.item_id, one.product_name, one.department_name, one.price, one.stock_quantity]));

    let output = table(data);
    console.log(output);

    console.log(' ');
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "What is the ID of the product you would like to purchase?",
        validate: function (value) {
          if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: "input",
        name: "qty",
        message: "How much would you like to purchase?",
        validate: function (value) {
          if (isNaN(value)) {
            return false;
          } else {
            return true;
          }
        }
      }
    ]).then(function (ans) {
      var whatToBuy = (ans.id) - 1;
      var howMuchToBuy = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[whatToBuy].price) * howMuchToBuy).toFixed(2));

      if (res[whatToBuy].stock_quantity >= howMuchToBuy) {

        connection.query("UPDATE Products SET ? WHERE ?", [{
            stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)
          },
          {
            item_id: ans.id
          }
        ], function (err, result) {
          if (err) throw err;
          console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
        });

      } else {
        console.log("Sorry, there's not enough in stock!");
      }

    });
  });
}

start();