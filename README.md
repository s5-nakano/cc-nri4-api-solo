# TodoタスクAPI

---

**TodoタスクAPIについて仕様を説明します**

| ホスト      | プロトコル | ポート | データ形式 |
| ----------- | ---------- | ------ | ---------- |
| `localhost` | `http`     | `3000` | `JSON`     |

下記のコードを返却します

| ステータスコード | 説明                                     |
| ---------------- | ---------------------------------------- |
| 200              | リクエスト成功                           |
| 201              | 登録成功                                 |
| 400              | 不正なリクエストパラメータを指定している |
| 404              | 存在しないURLにアクセス                  |
| 500              | 不明なエラー                             |

---

## Todoタスク登録API

### 概要

Todoタスクを一つ登録する

### パス

`/api/todos`

### メソッド

- POST
  - JSON (Req/Res)

### パラメータ

- None

#### リクエストボディ

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| task         | string | タスク名   |
| status       | string | ステータス |

#### リクエストサンプル

```JSON
{
    "task" : "掃除機をかける",
    "status":"Todo"
}


```

### レスポンス

#### 成功時

- ステータスコード: 201

#### レスポンスオブジェクト

| パラメータ名 | 型     | 内容       | 必須 |
| ------------ | ------ | ---------- | ---- |
| task         | string | タスク名   | 必須 |
| status       | string | ステータス | 必須 |

#### レスポンスサンプル

```JSON
{
    "task" : "掃除機をかける",
    "status":"Todo"
}
```

---

## TodoタスクAll取得API

### 概要

Todoタスクを全件取得する
idで昇順でソートして返す

### パス

`/api/todos`

### メソッド

- GET
  - JSON (Req/Res)

### パラメータ

- None

#### リクエストボディ

- None

#### リクエストサンプル

```JSON

```

### レスポンス

#### 成功時

- ステータスコード: 200

#### レスポンスオブジェクト

| パラメータ名 | 型   | 内容           |
| ------------ | ---- | -------------- |
|              | list | タスクのリスト |

#### レスポンスサンプル

```JSON
[
    { id: 1, task: "洗濯をする", status: "Todo" },
    { id: 2, task: "朝食を食べる", status: "In Progress" },
    { id: 3, task: "歯磨きをする", status: "Done" },
    { id: 4, task: "夜ご飯を作る", status: "Todo",}
]
```

---

## TodoタスクbyID取得API

### 概要

Todoタスクを一つ取得する

### パス

`/api/todos/:id`

### メソッド

- GET
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型  | 内容     |
| ------------ | --- | -------- |
| :id          | int | タスクID |

#### リクエストボディ

- None

#### リクエストサンプル

```JSON

```

### レスポンス

#### 成功時

- ステータスコード: 200

#### レスポンスオブジェクト

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| id           | int    | タスクID   |
| task         | string | タスク名   |
| status       | string | ステータス |

#### レスポンスサンプル

```JSON
{
    "id" : 1,
    "task" : "掃除機をかける",
    "status":"Todo"
}
```

---

## Todoタスクステータス更新API

### 概要

Todoタスクのステータスを更新する

### パス

`/api/todos/:id`

### メソッド

- Patch
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型  | 内容     |
| ------------ | --- | -------- |
| :id          | int | タスクID |

#### リクエストボディ

| パラメータ名 | 型     | 内容               |
| ------------ | ------ | ------------------ |
| status       | String | 更新後のステータス |

#### リクエストサンプル

```JSON

{
    "status":"In Progress"
}

```

### レスポンス

#### 成功時

- ステータスコード: 201

#### レスポンスオブジェクト

| パラメータ名 | 型     | 内容       |
| ------------ | ------ | ---------- |
| task         | string | タスク名   |
| status       | string | ステータス |

#### レスポンスサンプル

```JSON
{
    "task" : "掃除機をかける",
    "status":"In Progress"
}
```

---

## Todoタスク削除API

### 概要

Todoタスクを一つ削除する

### パス

`/api/todos/:id`

### メソッド

- DELETE
  - JSON (Req/Res)

### パラメータ

| パラメータ名 | 型  | 内容     |
| ------------ | --- | -------- |
| :id          | int | タスクID |

#### リクエストボディ

- None

#### リクエストサンプル

```JSON

```

### レスポンス

#### 成功時

- ステータスコード: 200

#### レスポンスオブジェクト

| パラメータ名 | 型     | 内容               |
| ------------ | ------ | ------------------ |
| message      | string | 削除完了メッセージ |

#### レスポンスサンプル

```JSON
{
    message: 'delete Completed'
}
```
