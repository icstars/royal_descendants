// var pg = require('pg');
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

// var client = new pg.Client(connectionString);
// client.connect();

create table if not exists users (
 id serial,
 loginname varchar(250),
 password varchar(250),
 name varchar(400),
 score integer,
 primary key(id));
 
insert into users values(1, 'gcrowder', 'abc123', 'gavin', 0); 
