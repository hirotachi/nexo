create table if not exists articles_topics(
    id int auto_increment primary key,
    articleId int,
    topicId int,
    foreign key (articleId) references articles(id) on delete cascade on update cascade,
    foreign key (topicId) references topics(id) on delete cascade on update cascade
)