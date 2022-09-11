const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = [];

app.get("/", function(req, res){
    const today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("ro-RO", options);
    res.render("list", {kindOfDay: day, itemsList: items});
    console.log(today);
    console.log(day);
})

app.post("/", function(req, res){
    var newItem = req.body.nextItem;
    items.push(newItem);
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})