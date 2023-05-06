# Knex 基本用法

## 1.Knexjs简介

一个灵活的、可移植的、使用起来很有趣的`SQL`查询生成器！[官方文档](<https://knexjs.org/>)

`Knex`的主要目标环境是`Node``。您需要安装knex库，然后安装适当的数据库库:`pg用于`PostgreSQL`和Amazon Redshift`, mysql`用于`mysql`或`MariaDB`, `sqlite3`用于`sqlite3`，或者`mssql`用于`mssql`。

------

## 2.安装

```javascript
$ npm install knex --save
$ npm install pg
$ npm install sqlite3
$ npm install mysql					*
$ npm install mysql2
$ npm install oracle
$ npm install mssql
```

这里我们选择的是`mysql`数据库，所以我们需要安装 `knex`和`mysql`模块

### 初始化数据库

该`knex`模块本身就是一个函数，它接受Knex的配置对象，接受一些参数。该`client`参数是必需的，用于确定将与库一起使用的客户端适配器。

```javascript
在目录下创建connect.js文件作为连接模板
module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  debug:true,
  log: {
    warn(message) {
    },
    error(message) {
    },
    deprecate(message) {
    },
    debug(message) {
    },
  },
   acquireConnectionTimeout: 40000,
});
//注：acquireConnectionTimeout默认为60000ms，用于确定在无法获取连接时抛出超时错误之前knex应等待的时间

```

------

## 3.Knex查询生成器

`knex`查询生成器是用于构建和执行标准的`SQL`查询，如界面`select`，`insert`，`update`，`delete`。

### 主要用法：

#### 查询（select）:

创建一个select查询，为查询提供可选的列数组，如果在构建查询时没有指定，则最终默认为*。select调用的响应将使用从数据库中选择的对象数组来解析。

```javascript
用法一：
knex('books').select()		//查询`books`表中的所有列
输出：
select * from `books`


用法二：	
knex.select('title', 'author', 'year').from('books')		//查询`books`表中`title`,`author`,`year`列
输出：
select `title`, `author`, `year` from `books`


用法三：（单条件查询）
knex('users').where('id', 1)
输出：
select * from `users` where `id` = 1


用法四：（多条件查询）
knex('users').where({
  first_name: 'Test',
  last_name:  'User'
}).select('id')
输出：
select `id` from `users` where `first_name` = 'Test' and `last_name` = 'User'


用法五：（模糊查询）
knex('users').where('columnName', 'like', '%rowlikeme%')
输出：
select * from `users` where `columnName` like '%rowlikeme%'

用法五：（带算法的查询）
knex('users').where('votes', '>', 100)
输出：
select * from `users` where `votes` > 100

用法六：（连表查询）
.join(table, first, [operator], second)
knex('users')
  .join('contacts', 'users.id', '=', 'contacts.user_id')
  .select()
输出：
select * from `users` inner join `contacts` on `users`.`id` = `contacts`.`user_id`

用法七：（限制调试的查询）
knex.select('*').from('users').limit(10).offset(30)
Outputs:
select * from `users` limit 10 offset 30		//offset:从第几条开始（0为第一条）limit：取几条数据

```

------



#### 插入（insert）：

创建一个插入查询，将要插入到行中的属性的哈希值或插入数组作为单个插入命令执行。

```javascript
用法一：
knex('books').insert({title: 'knex',author: 'admin'})
输出：
insert into `books` (`title`,`author`) values ('knex','admin')
```

------

#### 更新（update）：

创建更新查询，根据其他查询约束更新属性哈希值或键/值对。

```javascript
用法一：
knex('books').update('title', 'knex').where({ id: 42 })
输出：
update `books` set `title` = 'knex'  where `id` = 42
```

------

#### 删除（del）：

别名为del，因为删除是JavaScript中的保留字，此方法根据查询中指定的其他条件删除一行或多行。

```javascript
用法一：
knex('accounts')
  .where('activated', false)
  .del()
输出：
delete from `accounts` where `activated` = false
```
