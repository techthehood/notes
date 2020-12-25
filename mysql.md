# MYSQL Notes

### move all the data in one column to another column based on criteria (where)
**create tables**
- title_data
- url_data
```
  ALTER TABLE `nfojm_arc_my_data` ADD `title_data` TEXT NOT NULL DEFAULT '';
  ALTER TABLE `nfojm_arc_my_data` ADD `url_data` TEXT NOT NULL DEFAULT '';
```
[move column hint](https://stackoverflow.com/questions/7435309/need-to-move-data-from-one-field-to-another-within-the-same-table)

**move core_data to url_data in links**
```
UPDATE
  `uavz2_psmod`
SET
  url_data = core_data, core_data = ''
WHERE
  data_type = 'link'
AND
  core_data != '';
```
**move desc_data to title_data in links,activity,text,folder,tab**
```
UPDATE
  `uavz2_psmod`
SET
  title_data = desc_data, desc_data = ''
WHERE
  data_type = 'tab'
AND
  desc_data != '';
```

**move desc_data to title_data in links,activity,text,folder,tab**
```
UPDATE
  `uavz2_psmod`
SET
  title_data = desc_data, desc_data = ''
WHERE
  type = 'group'
AND
  category = 'name'
AND
  desc_data != '';

UPDATE
  `uavz2_psmod`
SET
  title_data = core_data, core_data = ''
WHERE
  type = 'info'
AND
  category = 'social%20community'
AND
  core_data != '';
```

update group
```
UPDATE
  `uavz2_psmod`
SET
  title_data = desc_data, desc_data = ''
WHERE
  type = 'group'
AND
  desc_data != '';
```


/*******************************   MySQL Section ********************************/

Alter TABLE `uavz2_psmod` ADD `data` TEXT NOT NULL DEFAULT '',
Alter TABLE `uavz2_psmod` ADD `options` TEXT NOT NULL DEFAULT '';
Alter TABLE `uavz2_psmod` ADD `module_id` INT(10) NOT NULL DEFAULT '0';

UPDATES all rows
UPDATE mytable SET table_column = 'test';
UPDATE `uavz2_arc_my_data` SET `data_type` = 'anchor' WHERE `type` = "media" AND `admin` = 1;

INSERT INTO `uavz2_ali_pair_grp_info` (`host_id`, `link_id`, `owner_id`,`editor_id`)
VALUES (14, 74, 488,488);

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

"DELETE FROM `examplecom_jmln2`.`nfojm_ali_gpscnx` WHERE `nfojm_ali_gpscnx`.`id` = 441"?

DELETE FROM `#__ali_gpscnx` WHERE `expires` < 1475683716579;

ALTER TABLE `#__users` ADD `G_name` varchar(50) NOT NULL;
ALTER TABLE `#__arc_my_data` ADD  `task_data` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE `#__ali_user_params` ADD `bookmarks` TEXT NOT NULL DEFAULT '';
ALTER TABLE `#__ali_user_params` ADD `user_id` INT(16) UNIQUE UNSIGNED NOT NULL;

//SELECT * FROM `nfojm_ali_pair` WHERE `sndr_id` = `rcvr_id` AND `rcvr_id` in ('1646_NTAwNzQ2ODU1MzAuMzM3NzQ','1647_NjIxNzk0MTYzOTEuNzI5Nzc');//works

ALTER TABLE `nfojm_ali_pair` ADD `endpoint` varchar(255) NOT NULL DEFAULT '';

ALTER TABLE `nfojm_ali_pair` ADD `notify` BOOLEAN NOT NULL DEFAULT 0;

ALTER TABLE `nfojm_ali_pair` ADD `communities` varchar(255) NOT NULL DEFAULT '';
ALTER TABLE `nfojm_ali_pair` ADD `projects` varchar(255) NOT NULL DEFAULT '';
ALTER TABLE `nfojm_ali_pair` ADD `sndr` varchar(255) NOT NULL DEFAULT '';
ALTER TABLE `nfojm_ali_pair` ADD `rcvr` varchar(255) NOT NULL DEFAULT '';

ALTER TABLE `uavz2_cnx` DROP `title`, DROP `alias`;

ALTER TABLE `uavz2_cnx` ADD `params` TEXT NOT NULL DEFAULT '';
ALTER TABLE `uavz2_arc_my_info` ADD `other_data` varchar(255) NOT NULL DEFAULT '';

ALTER TABLE parent_table ENGINE=InnoDB;

RENAME TABLE `nfojm_cnx_communities` TO `nfojm_arc_communities`;

RENAME TABLE `uavz2_cnx` TO `uavz2_my_info`;

ALTER TABLE `blog` CHANGE COLUMN `read-more` `read_more` VARCHAR(255) NOT NULL;
ALTER TABLE `#__arc_my_info` CHANGE COLUMN `info_ids` `data_id` VARCHAR(255) NOT NULL;

mysql generate deleted
DELETE FROM `uavz2_arc_my_info` WHERE `uavz2_arc_my_info`.`id` = 16

mymods
DELETE FROM `#__arc_my_info` WHERE `#__arc_my_info`.`id` = 16

DROP TABLE IF EXISTS `#__arc`;
DROP TABLE IF EXISTS `nfojm_arc_my_group`;

CREATE TABLE IF NOT EXISTS `uavz2_ali_pair_grp_info` (
`id` INT(16) UNSIGNED NOT NULL AUTO_INCREMENT,
`host_id` INT(16) UNSIGNED NOT NULL,
`link_id` INT(16) UNSIGNED NOT NULL,
`owner_id` INT(16) UNSIGNED NOT NULL,
`editor_id` INT(16) UNSIGNED NOT NULL,
PRIMARY KEY (`id`),

CONSTRAINT UC_GRP_PAIR UNIQUE (`host_id`,`link_id`)
FOREIGN KEY (`info_id`)
REFERENCES `uavz2_arc_my_info`(`id`)
ON DELETE CASCADE,

FOREIGN KEY (`grp_id`)
REFERENCES `uavz2_arc_my_group`(`id`)
ON DELETE CASCADE
 )ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `uavz2_ali_pair_grp_info`
ADD CONSTRAINT UC_GRP_PAIR UNIQUE (`host_id`,`link_id`);

ALTER TABLE `uavz2_ali_pair_grp_info`
CONSTRAINT UC_PAIR_GRP_INFO UNIQUE (`host_id`,`link_id`)

ALTER TABLE Persons
ADD CONSTRAINT UC_Person UNIQUE (ID,LastName);

SHOW CREATE TABLE `uavz2_ali_pair_grp_info`;
SHOW CREATE TABLE table_name;

//working data transfer
INSERT INTO uavz2_arc_my_data (
       user_id,category,
       core_data,desc_data,
      other_data, tag_data,
      created,modified ,
      picture, published, extra, admin )
SELECT  user_id,category,
      core_data,desc_data,
      other_data, tag_data,
      created,modified,
      picture, published, extra, admin
FROM uavz2_arc_my_info
ORDER BY id ASC

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE uavz2_arc_my_data
SET FOREIGN_KEY_CHECKS = 1;

//this is a query to get the last entry id: $last_id = $db->insertid();


/***************************** tutorial  ***********************************/
FOREIGN KEYs
creating a table with a foreign key
   http://www.mysqltutorial.org/mysql-foreign-key/

CREATE DATABASE IF NOT EXISTS dbdemo;

USE dbdemo;

CREATE TABLE categories(
   cat_id int not null auto_increment primary key,
   cat_name varchar(255) not null,
   cat_description text
) ENGINE=InnoDB;

CREATE TABLE products(
   prd_id int not null auto_increment primary key,
   prd_name varchar(355) not null,
   prd_price decimal,
   cat_id int not null,
   FOREIGN KEY fk_cat(cat_id)
   REFERENCES categories(cat_id)
   ON UPDATE CASCADE
   ON DELETE RESTRICT
)ENGINE=InnoDB;

adding a foreign key to a table

ALTER table_name
ADD CONSTRAINT constraint_name
FOREIGN KEY foreign_key_name(columns)
REFERENCES parent_table(columns)
ON DELETE action
ON UPDATE action;

or more specifically

ALTER TABLE products
ADD FOREIGN KEY fk_vendor(vdr_id)
REFERENCES vendors(vdr_id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

	...you use the ON DELETE SET NULL action instead...
	MySQL will set the foreign key column values in the child table to NULL when the record in the parent table is deleted, with a condition that the foreign key column in the child table must accept NULL values

	... if you use ON DELETE NO ACTION or ON DELETE RESTRICT action, MySQL will reject the deletion.

	...The ON UPDATE CASCADE action allows you to perform a cross-table update, and the ON UPDATE SET NULL action resets the values in the rows in the child table to NULL values when the rows in the parent table are updated.

	...The ON UPDATE NO ACTION or UPDATE RESTRICT actions reject any updates.

Dropping mysql foreign key

ALTER TABLE table_name
DROP FOREIGN KEY constraint_name;

FULL EXAMPLE


CREATE TABLE products (
  prd_id int(11) NOT NULL AUTO_INCREMENT,
  prd_name varchar(355) NOT NULL,
  prd_price decimal(10,0) DEFAULT NULL,
  cat_id int(11) NOT NULL,
  vdr_id int(11) NOT NULL,
  PRIMARY KEY (prd_id),
  KEY fk_cat (cat_id),
  KEY fk_vendor(vdr_id),

  CONSTRAINT products_ibfk_2
  FOREIGN KEY (vdr_id)
  REFERENCES vendors (vdr_id)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,

  CONSTRAINT products_ibfk_1
  FOREIGN KEY (cat_id)
  REFERENCES categories (cat_id)
  ON UPDATE CASCADE
) ENGINE=InnoDB;

/*******************************   MySQL Section ********************************/

//oldest miliseconds
1475207387593

//oldest expires
1475639387593

//2016-09-29 22:50:17

//js/php equation

//to turn the js utc time to the php version you have to divide by 1000
//the php version stops at seconds and omits miliseconds
Math.floor(1475639387593/1000);

//to to reverse this and make the numbers compatible we have to add those 3 zeros
//so we can make accurate comparisons

//simulated php version or 10 digits
1475639387

1475639387*1000
1475639387000//results

//sample quoted db query
<title>Error: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near &#039;&#039;cqSoyM0gnAk:APA91bELsHFucul8Afo4CBeDGnLtNYWd-YYzTxk3dRjyHivDUpmspwYbpMgjHhVmXCd&#039; at line 3 SQL=INSERT INTO `#__ali_gpscnx`
(`trans_nbr`,`lattitude`,`longitude`,`accuracy`,`milliseconds`,`expires`,`duration`,`user_type`,`photo`,`text`,`public_view`,`token_endpoint`,`password`) VALUES
(&#039;OTY5MDIwOTY5Mi4zMjc4MzM&#039;,38.8200597,-77.0055418,29,1480632379014,1480632619025,&#039;4 minutes&#039;,&#039;guest&#039;,&#039;&#039;,&#039;its me&#039;,,&#039;cqSoyM0gnAk:APA91bELsHFucul8Afo4CBeDGnLtNYWd-YYzTxk3dRjyHivDUpmspwYbpMgjHhVmXCdSOI82VYhhtSAlgJDu_oUC7cEGb40ugAanWJNftIhGrB0HF2NeqjabJPifofCgx0b0AVAsajT9&#039;,&#039;&#039;)</title>


megabus cancellation policy


2.    Reservations with megabus.com may not be refunded or cancelled except where megabus.com has materially failed in its delivery of the service offered by this site.
3.     Customers wishing to change a reservation must do so at least 3 hours prior to the departure time of the existing reservation. A trade in fee ($3.00 for trade insmore than 24 hours from departure, $5.00 for trade ins 6 to 24 hours from departure, and $7.50 for trade ins 3 to 6 hours from departure) and a $2.00 new reservation fee is charged for all reservations being changed. The cost of the initial reservation will be credited against the subsequent reservation, less the applicable fees. Should the subsequent reservation be less expensive than the initial reservation, no payment or further credit will be made to the customer and all unused credit will be forfeited. If the initial amount paid is less than the cost of the subsequent reservation the customer must pay the difference when completing their new reservation.
4.    Reservations are only valid on the trip(s) stated.


//slider

	var us_msg_slider_Select = document.createElement('select');
	us_msg_slider_Select.id = "us_msg_slider_Select";
	us_msg_slider_Select.className ="us_msg_slider_Select us_Input";//
	us_msg_slider_Select.name = "us_msg_slider_Select";
	us_msg_slider_Select.dataset.role = "slider";
	//us_msg_slider_Select.setAttribute("onchange","compareSave()");
	us_msg_slider_Select.onchange = function()
	{
		compareSave();
		dataCheck("notification");
		startNotification();
	}

		var us_msg_slider_Option1 = document.createElement('option');
		us_msg_slider_Option1.id = "us_msg_slider_Option1";
		us_msg_slider_Option1.className ="us_msg_slider_Option1 msg_slider";//
		us_msg_slider_Option1.value = "deny";
		us_msg_slider_Option1.innerHTML = "deny";

		var us_msg_slider_Option2 = document.createElement('option');
		us_msg_slider_Option2.id = "us_msg_slider_Option2";
		us_msg_slider_Option2.className ="us_msg_slider_Option2 msg_slider";//
		us_msg_slider_Option2.value = "allow";
		us_msg_slider_Option2.innerHTML = "allow";

	us_msg_slider_Select.appendChild(us_msg_slider_Option1);
	us_msg_slider_Select.appendChild(us_msg_slider_Option2);
	//$('#us_msg_slider_Select').slider();

	us_msg_table_TD_PRMSN.appendChild(us_msg_slider_Select);



	var msgSel = document.getElementById("us_msg_slider_Select");
	//var msgSelOpt = document.getElementById("us_msg_slider_Option2");

	var selectedOption = document.getElementsByClassName("msg_slider")[msgSel.selectedIndex];

	userData[dynamicStr] = selectedOption.value;

	$('#us_msg_slider_Select').slider('refresh');
	$('#us_msg_slider_Select').slider('disable');


//check box

//checkbox checker
	if(document.getElementById("us_msg_pub_view_box"))
	{
	var checker = document.getElementById("us_msg_pub_view_box");
	if(checker.checked == true)
	{
		userData.public_notes = 1;
	}else{
		userData.public_notes = 0;
	}

	//i passed a dynamic function str to an attribute and created a click event
	/****  example
	options_array.push({"name":"password","icon":"eye","clkEvt":"addPwdIdentifier","dname":"codeword"});

	input_type_btn.setAttribute("onclick",options_array[i].clkEvt+"()");//works

	****/

[get size of database](http://www.uponmyshoulder.com/blog/2010/get-database-size-in-phpmyadmin/)

```
SELECT table_schema `nfojm_arc_my_data`, sum( data_length + index_length ) / 1024 / 1024 "Data Base Size in MB" FROM information_schema.TABLES GROUP BY table_schema
```

**[article on mysql timestamp](http://www.mysqltutorial.org/mysql-timestamp.aspx)**    
```
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

  vs

  ALTER TABLE categories ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

```
**ON UPDATE CURRENT_TIMESTAMP**

#### [duplicate table](https://stackoverflow.com/questions/13210429/phpmyadmin-duplicate-table)   
