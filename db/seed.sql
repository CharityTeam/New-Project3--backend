DROP DATABASE IF EXISTS charity_db;
CREATE DATABASE charity_db;
\c charity_db


CREATE TABLE cases(
  id serial primary key, 
  name varchar, 
  details varchar,
  city varchar,
  email varchar,
  phone varchar,
  organtion_name varchar,
  needed int,
  img url
);

CREATE TABLE donation(
    id primary key,
    doner_donation int,
    foreign key(case_id) references cases
);


INSERT INTO Cases (name, details, city, email, phone, organtion_name, needed, img )
VALUES ('abdullah ahmed', 'rent','riyadh', 'abdullahahmed@hotmail.com',0501245678, 'Bunyan Women Charity', 10000,'https://cdn.patchcdn.com/assets/layout/contribute/user-default.png');
VALUES ('ahmed abdulkarim', 'toy','jeddah', 'ahmed1234@hotmail.com',0501335678, 'Insan', 200,'https://cdn.patchcdn.com/assets/layout/contribute/user-default.png');
VALUES ('noha mohammed', 'wheelchair', 'damam', 'nohamohammed@hotmail.com',0501335678, 'Insan', 1500,'https://app.voxeet.com/images/user-placeholder.png');
VALUES ('maha ', 'books', 'riyadh', 'maha56@hotmail.com',0501333378, 'Insan', 1500,'https://app.voxeet.com/images/user-placeholder.png');

INSERT INTO donation(doner_donation, case_id)
VALUES (2000, 1);
VALUES (200, 1);
VALUES (550, 1);