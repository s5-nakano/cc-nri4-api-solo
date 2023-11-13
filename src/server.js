const express = require('express');

const setupServer = () => {
    const app = express();
    // app.use(express.json());
    // app.use(express.text());

    app.get('/healthcheck' , (req,res)=>{
        res.sendStatus(200);
        console.log("ヘルスチェックもできているよ!")

    })

    app.get('/',(req,res)=> {
        res.sendStatus(200);
        console.log("Hello World!")
    }) 


    return app
}

module.exports = {setupServer}