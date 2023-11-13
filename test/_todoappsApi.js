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

        // res.should.have.status(200);
        JSON.parse(res.text).should.deep.equal(expected)
    })

  });


  describe("POST /api/todos", () => {
    it("todoを一つ追加することができる", async () => {
      // 準備
      const testdata = {
        task: "夜ご飯を作る",
        status: "Todo",
      };

      // 検証用データ(get未実装のため、req→resを簡易的に確認)
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
      JSON.parse(afterTodos.text).should.deep.equal(expected);
    });
  });
});
