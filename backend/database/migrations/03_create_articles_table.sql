create table if not exists articles (
    id  int auto_increment primary key,
    title varchar(255),
    summary mediumtext,
    sectionId int,
    content longtext,
    preview varchar(255),
    authorId int,

    created_at datetime default now(),
    foreign key (authorId) references users(id) on delete cascade on update cascade,
    foreign key (sectionId) references sections(id) on delete set null on update cascade

)