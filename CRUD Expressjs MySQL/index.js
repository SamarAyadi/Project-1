const express = require("express");
const app = express();
const port = 3000;

var cors = require("cors");
// mysql2

const mysql = require("mysql2");

const query = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopping",
});
// & [1] - addProduct
// & [2] - getAllProduct
// & [3] - deleteProduct
// & [4] - updateProduct
// & [5] - search
// & [6] - getProduct

app.use(cors());
app.use(express.json());

app.post("/products", (req, res) => {
  const { name, price, desc } = req.body;
  query.execute(
    `insert into products (name, price, description) values ('${name}', '${price}', '${desc}')`
  );
  res.json({ message: "success" });
});

app.get("/products", (req, res) => {
  query.execute(`select * from products`, (err, data) => {
    if (err) {
      res.json({ message: "error", err });
    } else {
      res.json({ message: "success", data });
    }
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  //   res.json({ message: "ok" });
  query.execute(`select * from products where id=${id}`, (err, data) => {
    if (err) {
      res.json({ message: "error", err });
    } else {
      res.json({ message: "success", data });
    }
  });
});

app.delete("/products", (req, res) => {
  const { id } = req.body;

  query.execute(`delete from products where id=${id}`);
  res.json({ message: "success" });
});

app.put("/products", (req, res) => {
  const { id, name, description, price } = req.body;

  query.execute(
    `update products set name='${name}' , price='${price}' ,description='${description}' where id=${id}`
  );
  res.json({ message: "success" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
