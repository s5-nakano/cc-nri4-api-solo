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

    })
    .catch((error)=>{
        console.error("Error inserting todo" , error);
        res.status(500).json({error:"Internal Server Error"})
    })
  });


    // Get(id指定)実装
    app.get("/api/todos/:param" , (req,res)=>{
        const id = req.params.param;
        
        // 簡単なバリデート実装（id指定じゃなかったらエラーを返す）

        if(isNaN(id)){
            return res.status(400).json({error : 'IDで指定してください'})
        }

        knex(TODOS_TABLE)
          .select()
          .where({id:id})
          .then((result) => {
            if(result.length ===0){
                return res.status(404).json({ error: 'Todo not found' });
            }
            res.status(200).json(result);
            console.log("ここまで行ったよ!");
            console.log(result);
          })
          .catch((error) => {
            console.error("Error selecting todos by id:", error);
            res.status(500).send("Internal Server Error");
          });
     
      })


  return app;
}

module.exports = server;
