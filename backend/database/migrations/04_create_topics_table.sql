create table if not exists topics (
    id int auto_increment primary key,
    name varchar(255) unique
)