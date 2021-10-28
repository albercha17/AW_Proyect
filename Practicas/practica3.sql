
create table usuario(email VARCHAR2(100), password VARCHAR2(100), img VARCHAR2(100),PRIMARY KEY(email));
insert into usuario values('albercha@ucm.es','12345','user_img1.jpg');
insert into usuario values('albercha17@gmail.com','12345','user_img2.jpg');

create table task(id VARCHAR2(11), usuario VARCHAR2(100), text VARCHAR2(100), done VARCHAR2(1),PRIMARY KEY(id));
insert into task values('1','albercha@ucm.es','Ir al gym','0');
insert into task values('2','albercha17@gmail.es','Ir al gym','1');

create table tag(taskId CHAR(11), tag VARCHAR2(100) ,PRIMARY KEY(taskId, tag));
insert into tag values('1','deporte');
insert into tag values('1','tarde');




select 
    "ID",
    "USUARIO",
    "TEXT",
    "DONE"
from "TASK";

select 
    "TAG",
    "TASKID"
from "TAG";


DELETE  FROM task WHERE texy='Petunia 3' AND done = '0';



SELECT  ID,USUARIO,TEXT,DONE, TAG, TASKID
FROM TASK T, TAG a
WHERE T.usuario = 'albercha@ucm.es' AND T.id='1' AND a.TASKID='1';