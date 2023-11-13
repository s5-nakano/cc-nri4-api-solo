const express = require("express");

//databaseへの接続
const knex = require("./knex");

const TODOS_TABLE = "todos";


function server() {
  const app = express();
  app.use(express.json());
  app.use(express.text());

  app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/", (req, res) => {
    res.sendStatus(200);
  });

  // Get(All)実装
  app.get("/api/todos" , (req,res)=>{
    knex(TODOS_TABLE)
      .select()
      .then((result) => {
        // Send the response inside the then block
        res.status(200).json(result);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        res.status(500).send("Internal Server Error");
      });
 
  })

  // Post実装
  app.post("/api/todos", (req, res) => {
    const {task,status} = req.body;


    // 簡単なバリデート実装（Insertするための）
    if(!task || !status){
        return res.status(400).json({error : '登録するための情報が不足しています。'})
    }
    // テーブルへの追加処理の実装
    knex(TODOS_TABLE).insert({task,status})
    .then((result)=>{
        res.status(201).json({
            task,
            status
        })
        console.log("ここまで行ったよ！");

    })
    .catch((error)=>{
        console.error("Error inserting todo" , error);
        res.status(500).json({error:"Internal Server Error"})
    })
  });

  return app;
}

module.exports = server;
