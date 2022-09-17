const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/toDoListDB");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Mananca"
})

const item2 = new Item({
    name: "Dus"
})

const item3 = new Item({
    name: "Grind"
})

// const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function(err){
//     if (err){
//         console.log(err);
//     } else{
//         console.log("Succesfully added default items");
//     }
// })

app.get("/", function(req, res){
    Item.find({}, function(err, foundItems){
        console.log(foundItems);
        res.render("list", {kindOfDay: "Today", itemsList: foundItems});
    })
})

app.post("/", function(req, res){
    var newItem = req.body.nextItem;
    Item.insertMany({name: newItem})
    res.redirect("/");
})

app.post("/delete", function(req, res){
    var deleteItemID = req.body.deletedItem;
    Item.findByIdAndRemove(deleteItemID, function(err){
        if (!err){
            console.log("Succesfully deleted the item " + deleteItemID);
            res.redirect("/");
        }
    });
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})