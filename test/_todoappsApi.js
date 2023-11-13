const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const setupServer = require("../src/server");
const { expect } = chai;
const server = setupServer();

describe("todosApps API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("todosApps API basic", () => {
    it("should return 200 /healthcheck", async () => {
      const res = await request.get("/healthcheck");
      expect(res.statusCode).to.equal(200);
    });

    it("should return 200 /", async () => {
      const res = await request.get("/");
      expect(res.statusCode).to.equal(200);
    });

    it("should return allTodoItems ,if GET /api/todos",async()=>{
        // 検証用データ
        const expected = [
            { id: 1, task: "洗濯をする", status: "Todo" },
            { id: 2, task: "朝食を食べる", status: "In Progress" },
            { id: 3, task: "歯磨きをする", status: "Done" },
        ]

        // APIを呼び出す
        const res = await request.get("/api/todos");

        res.should.have.status(200);
        expect(res.body[0].task).to.equal("洗濯をする");
        expect(res.body[1].task).to.equal("朝食を食べる");
        expect(res.body[2].task).to.equal("歯磨きをする");
    })

  });


  describe("POST /api/todos", () => {
    it("todoを一つ追加することができる", async () => {
      // 準備
      const testdata = {
        task: "夜ご飯を作る",
        status: "Todo",
      };

      // 検証用データ
      const expected = [
            { id: 1, task: "洗濯をする", status: "Todo" },
            { id: 2, task: "朝食を食べる", status: "In Progress" },
            { id: 3, task: "歯磨きをする", status: "Done" },
            { id: 4, task: "夜ご飯を作る", status: "Todo",}
        ]


      //APIを呼び出す
      const res = await request.post("/api/todos").send(testdata);

      //Assertion(検証)
      request = chai.request(server);
      const afterTodos = await request.get("/api/todos")

      expect(res.statusCode).to.equal(201);
    //   JSON.parse(afterTodos.text).should.deep.equal(expected);
    });
  });



  describe("GET /api/todos:idorStatus", () => {
    it("ID指定したtodoを一つ返すことができる", async () => {
        
      //APIを呼び出す
      const res = await request.get("/api/todos/1");

      const expected = { id: 1, task: "洗濯をする", status: "Todo" }

      //Assertion(検証)

      expect(res.statusCode).to.equal(200);
      expect(res.body[0].id).to.equal(1);
      expect(res.body[0].task).to.equal("洗濯をする");
      expect(res.body[0].status).to.equal("Todo");
    });

    // it("ステータスの条件に合致するtodoを全て返すができる", async () => {
    //   });
  });


  describe("PATCH /api/todos:id", () => {
    it("todoをid指定して、削除することができる。", async () => {

      //APIを呼び出す
      const res = await request.delete("/api/todos/6");

      //Assertion(検証)
      request = chai.request(server);
      const res2 = await request.get("/api/todos/6");
      res.should.have.status(200);
      res2.text.should.be.equal('{"error":"Todo not found"}');


    });
  });



});
