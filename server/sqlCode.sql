-- THIS IS THE BASE ASSUMPTION I HAD FOR MY PROCESS. to make the DATABASE
-- first download xampp
-- second launch apache and mysql
-- third you click the shell in xampp
-- fourth you run the command "mysql -u temp1 -p 'enter' password "
-- finally you exectute  from line 16-150

-- {
--         host : 'localhost',
--         user : 'root',
--         password: '' ,
-- }



CREATE DATABASE gas_sale_app;


CREATE TABLE `gas_sale_app`.`clients` (
  `clientID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR(255) NULL,
  `state` VARCHAR(255) NULL,
  `zip` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`clientID`));

  CREATE TABLE `gas_sale_app`.`transaction` (
  `transactionID` INT NOT NULL DEFAULT 100,
  `userID` INT NOT NULL,
  `gallons` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `sentTo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`transactionID`));


CREATE TABLE `gas_sale_app`.`prices` (
  `stateID` FLOAT NOT NULL AUTO_INCREMENT,
  `state` VARCHAR(255) NOT NULL,
  `pricePerGallon` INT NOT NULL,
  PRIMARY KEY (`stateID`));




INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Alaska" , 5.24);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Alabama" , 3.94);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Arkansas" , 3.96);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Arizona" , 4.69);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("California" , 5.74);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Colorado" , 4.64);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Connecticut" , 4.4);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("District of Columbia" , 4.62);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Delaware" , 4.22);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Florida" , 4.1);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Georgia" , 3.9);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Hawaii" , 5.52);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Iowa" , 4.09);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Idaho" , 5.03);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Illinois" , 4.84);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Indiana" , 4.39);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Kansas" , 4.09);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Kentucky" , 4.02);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Louisiana" , 3.96);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Massachusetts" , 4.53);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Maryland" , 4.32);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Maine" , 4.65);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Michigan" , 4.44);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Minnesota" , 4.34);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Missouri" , 4.04);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Mississippi" , 3.91);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Montana" , 4.62);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("North Carolina" , 4.04);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("North Dakota" , 4.32);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Nebraska" , 4.26);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("New Hampshire" , 4.42);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("New Jersey" , 4.47);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("New Mexico" , 4.18);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Nevada" , 5.15);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("New York" , 4.59);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Ohio" , 4.17);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Oklahoma" , 4.01);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Oregon" , 5.18);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Pennsylvania" , 4.56);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Rhode Island" , 4.5);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("South Carolina" , 3.88);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("South Dakota" , 4.38);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Tennessee" , 3.95);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Texas" , 3.87);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Utah" , 4.94);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Virginia" , 4.14);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Vermont" , 4.54);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Washington" , 5.13);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Wisconsin" , 4.07);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("West Virginia" , 4.49);
INSERT INTO `gas_sale_app`.`prices` (state,pricePerGallon)
VALUES ("Wyoming" , 4.6);