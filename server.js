const express = require('express');
const sequelize = require("./config/connection.js")
const app = express();
const PORT = process.env.PORT || 3000;

const {Category,Product,ProductTag,Tag} = require('./models');
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
}).catch((err)=>{
    console.log(err)
});