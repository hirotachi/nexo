create table if not exists sections (
    id int auto_increment primary key,
    name varchar(255) unique
)