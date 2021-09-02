const express = require("express");
const app = express();

app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

//sequelize-auto -h shadowfax1.cedjgswziywb.ap-south-1.rds.amazonaws.com -d shadowfax -u admin -x "qazwsx&*%^" --dialect mysql -o ./models
