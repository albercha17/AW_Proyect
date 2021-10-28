
create table usuario(email VARCHAR2(100)  primary key, password VARCHAR2(100), img VARCHAR2(100));
'Teo'

create table task(id VARCHAR2(11) primary key, usuario VARCHAR2(100), text VARCHAR2(100), done VARCHAR2(1));
insert into task values('4','Teodora','Petunia 3','0');

create table tag(taskId CHAR(11) primary key, tag VARCHAR2(100) primary key);
insert into tag values('4','123456789');




select 
    "ID",
    "USUARIO",
    "TEXY",
    "DONE"
from "TASK";

select 
    "TAG",
    "TASKID"
from "TAG";


DELETE  FROM task WHERE texy='Petunia 3' AND done = '0';



SELECT  ID,USUARIO,TEXY,DONE, TAG, TASKID
FROM TASK T, TAG a
WHERE T.usuario = 'a' AND T.id=a.TASKID;