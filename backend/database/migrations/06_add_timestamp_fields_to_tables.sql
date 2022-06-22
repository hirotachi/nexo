
alter table users
    add column updatedAt datetime default now();
alter table users
    add column createdAt datetime default now();


alter table articles
    add column updatedAt datetime default now();
alter table articles
    add column createdAt datetime default now();

alter table articles_topics
    add column updatedAt datetime default now();
alter table articles_topics
    add column createdAt datetime default now();

alter table topics
    add column updatedAt datetime default now();
alter table topics
    add column createdAt datetime default now();

alter table sections
    add column updatedAt datetime default now();
alter table sections
    add column createdAt datetime default now();

