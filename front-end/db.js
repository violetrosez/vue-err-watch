const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "err_db";
const collectionName = "errList";
class Db {
  // 单例模式，解决多次实例化时候每次创建连接对象不共享的问题，实现共享连接数据库状态
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
  constructor() {
    // 属性 存放db对象
    this.dbClient = "";
    // 实例化的时候就连接数据库，增加连接数据库速度
    this.connect();
  }
  // 连接数据库
  connect() {
    return new Promise((resolve, reject) => {
      // 解决数据库多次连接的问题，要不然每次操作数据都会进行一次连接数据库的操作，比较慢
      if (!this.dbClient) {
        // 第一次的时候连接数据库
        MongoClient.connect(
          url,
          { useNewUrlParser: true, useUnifiedTopology: true },
          (err, client) => {
            if (err) {
              reject(err);
            } else {
              // 将连接数据库的状态赋值给属性，保持长连接状态
              this.dbClient = client.db(dbName);
              resolve(this.dbClient);
            }
          }
        );
      } else {
        // 第二次之后直接返回dbClient
        resolve(this.dbClient);
      }
    });
  }

  insert(json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertOne(json, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  }

  find(query = {}) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        let res = db.collection(collectionName).find(query);
        res.toArray((e, docs) => {
          if (e) {
            reject(e);
            return;
          }
          resolve(docs);
        });
      });
    });
  }
}

module.exports = Db.getInstance();
