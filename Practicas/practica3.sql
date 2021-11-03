
create table user(email VARCHAR(100), password VARCHAR(100), img VARCHAR(100),PRIMARY KEY(email));
insert into user values('albercha@ucm.es','12345','user_img1.jpg');
insert into user values('inmap@ucm.es','ucm1','user_img3.jpg');
insert into user values('albercha17@gmail.com','12345','user_img2.jpg');
insert into user values('pedro@ucm.es','12345','user_img4.jpg');

create table task(id int(11), user VARCHAR(100), text text, done tinyint(1),PRIMARY KEY(id));
insert into task values('1','albercha@ucm.es','Ir al gym','0');
insert into task values('2','albercha17@gmail.es','Ir al gym','1');
insert into task values('4','albercha17@gmail.es','Ir al cine','0');
insert into task values('3','pedro@ucm.es','Ir al gym','0');
insert into task values('5','albercha@ucm.es','Ir a la compra','0');
insert into task values('6','albercha@ucm.es','Ir al cine','1');
insert into task values('7','albercha@ucm.es','Ir al super','0');



create table tag(taskId int(11), tag VARCHAR(100) ,PRIMARY KEY(taskId, tag));
insert into tag values('1','deporte');
insert into tag values('1','tarde');
insert into tag values('2','tarde');
insert into tag values('3','noche');




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