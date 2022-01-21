const express = require("express");
const router = require("express").Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const { isBigInt64Array } = require("util/types");

const app = express();

//get, post, put, delete  




app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(router);
  

router.get("/", (req,res) => {
    res.send("hello there!");
});

router.get("/welcome", (req,res) => {
    res.send("welcome");
});

router.post("/api/note",(req,res) => {
    console.log(req.body)
    const data = {...req.body};
    const notes = listNotes();
    notes.push(data);
    saveNote(notes);
    res.send({message:"msg recieved"});
    
});

router.get("/api/note/get", (req,res) => {
    const data = listNotes();
    const thenote=data.filter((notes) => notes.title === req.body.title);
    console.log(thenote);
    res.send(thenote);
});

router.delete("/api/note/del", (req,res) =>  {
    const data = listNotes();
    const newnotes=data.filter((notes) => notes.title!==req.body.title);
    saveNote (newnotes);
    res.send({message:"msg is deleted"});
});

 router.put("/api/note/put", (req,res) =>  {
    const data = listNotes();
    const index =data.findIndex((notes) => notes.title===req.body.title);
    console.log(data[index]);
    data[index].body=req.body.body;
    console.log(data[index]);
    saveNote(data);
    res.send({message:"msg updated"});
 });

app.listen(8000,() =>{
    console.log("the server is running.")
})
const listNotes = () => {
    const data = JSON.parse(fs.readFileSync("./notes.json").toString());
    return data;
}

const saveNote = (notes) => {
    fs.writeFileSync("./notes.json", JSON.stringify(notes));
}