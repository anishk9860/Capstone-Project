-- Schema tiffin_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tiffin_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `tiffin_db` ;

-- -----------------------------------------------------
-- Table `tiffin_db`.`city_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`city_location` (
  `City_Location_Id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key Of City Location Table',
  `City_Name` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Name of the city',
  `Country_Code` VARCHAR(5) NOT NULL COMMENT 'Code of the Location Country',
  PRIMARY KEY (`City_Location_Id`),
  UNIQUE INDEX `City_Name_UNIQUE` (`City_Name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 34
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`cuisine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`cuisine` (
  `Cuisine_Id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Cuisine table',
  `Cuisine_Name` VARCHAR(100) NOT NULL COMMENT 'Name of the cuisine',
  PRIMARY KEY (`Cuisine_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`currency`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`currency` (
  `Currency_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Currency Table',
  `Currency_Symbol` VARCHAR(5) NOT NULL COMMENT 'Symbol of currency',
  `Currency_Name` VARCHAR(30) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL COMMENT 'Name of currency',
  `Country_Code` VARCHAR(3) NULL DEFAULT NULL COMMENT 'Country Code of the currency',
  `Country_Name` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Name of the country where the currency is used',
  PRIMARY KEY (`Currency_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`merchants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`merchants` (
  `Merchant_Id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Merchant table',
  `User_Id` BIGINT NOT NULL COMMENT 'Foreign Key to the User Table',
  `Location_Id` INT NOT NULL COMMENT 'Foreign Key to the Location Table',
  `User_Type_Id` INT NOT NULL COMMENT 'Type of the User (Merchant Only)',
  `Merchant_Name` VARCHAR(100) NOT NULL COMMENT 'Name of the Merchant',
  `Merchant_Pic` BLOB NULL DEFAULT NULL COMMENT 'Image to be used for Merchant',
  `Rating_Id` BIGINT NULL DEFAULT NULL COMMENT 'Ratings of the merchant',
  `Delivery_Schedule_Id` BIGINT NULL DEFAULT NULL COMMENT 'Delivery Schedule Of the merchant',
  `entity_name` VARCHAR(255) NULL DEFAULT NULL,
  `City_Location_Id` INT NULL DEFAULT NULL COMMENT 'Foreign key to the city_location_table',
  `Cuisine_Id` INT NULL DEFAULT NULL COMMENT 'Foreign key to the Cuisine table',
  PRIMARY KEY (`Merchant_Id`),
  UNIQUE INDEX `User_Id_UNIQUE` (`User_Id` ASC) VISIBLE,
  UNIQUE INDEX `UKh9v6fyuu5mnk7p3qtlpta2947` (`User_Id` ASC) INVISIBLE,
  INDEX `Merchants_FK_3` (`City_Location_Id` ASC) VISIBLE,
  INDEX `Merchants_FK_4` (`Cuisine_Id` ASC) VISIBLE,
  CONSTRAINT `Merchants_FK_3`
    FOREIGN KEY (`City_Location_Id`)
    REFERENCES `tiffin_db`.`city_location` (`City_Location_Id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `Merchants_FK_4`
    FOREIGN KEY (`Cuisine_Id`)
    REFERENCES `tiffin_db`.`cuisine` (`Cuisine_Id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`items` (
  `Item_Id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Items table',
  `Merchant_Id` BIGINT NOT NULL COMMENT 'Foreign Key to the Merchant table',
  `Item_Name` VARCHAR(100) NOT NULL COMMENT 'Name of the Item',
  `Item_Pic` BLOB NULL DEFAULT NULL COMMENT 'Pics of the Item',
  `Cuisine_Id` INT NOT NULL COMMENT 'Foreign Key to the cuisine table',
  `Item_Cost` DOUBLE NOT NULL COMMENT 'Cost of the Item',
  `City_Location_id` INT NOT NULL COMMENT 'Foreign key to the City Location Table',
  PRIMARY KEY (`Item_Id`),
  INDEX `Items_FK` (`Merchant_Id` ASC) VISIBLE,
  INDEX `Items_FK_1` (`Cuisine_Id` ASC) INVISIBLE,
  INDEX `Items_FK_2` (`City_Location_id` ASC) INVISIBLE,
  CONSTRAINT `Items_FK`
    FOREIGN KEY (`Merchant_Id`)
    REFERENCES `tiffin_db`.`merchants` (`Merchant_Id`),
  CONSTRAINT `Items_FK_1`
    FOREIGN KEY (`Cuisine_Id`)
    REFERENCES `tiffin_db`.`cuisine` (`Cuisine_Id`),
  CONSTRAINT `Items_FK_2`
    FOREIGN KEY (`City_Location_id`)
    REFERENCES `tiffin_db`.`city_location` (`City_Location_Id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`users` (
  `User_Id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Users Table',
  `Email` VARCHAR(50) NOT NULL COMMENT 'user name of the user',
  `First_Name` VARCHAR(45) NOT NULL,
  `Last_Name` VARCHAR(45) NOT NULL,
  `User_Password` VARCHAR(150) NOT NULL COMMENT 'Password of the user',
  `Created_On` DATETIME NULL DEFAULT NULL COMMENT 'Date and time the user was created',
  `Entity_Name` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Name of the Customer/Merchant',
  `User_Type_Id` INT NULL DEFAULT NULL COMMENT 'Type of the user (Customer/Merchant)',
  PRIMARY KEY (`User_Id`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `UK6dotkott2kjsp8vw4d0m25fb7` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`location` (
  `Location_Id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Location table',
  `City_Location_Id` INT NOT NULL COMMENT 'Foreign key of the City_Location table',
  `Zip_Code` VARCHAR(10) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL COMMENT 'Zip Code/Pin code of the location',
  `Currency_Id` INT NULL DEFAULT '4' COMMENT 'Foreign key to the Currency table',
  `User_ID` BIGINT NOT NULL COMMENT 'Foreign key of the Users table',
  PRIMARY KEY (`Location_Id`),
  INDEX `Location_FK` (`City_Location_Id` ASC) VISIBLE,
  INDEX `Location_FK_1` (`Currency_Id` ASC) VISIBLE,
  INDEX `Location_FK_2_idx` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `Location_FK`
    FOREIGN KEY (`City_Location_Id`)
    REFERENCES `tiffin_db`.`city_location` (`City_Location_Id`),
  CONSTRAINT `Location_FK_1`
    FOREIGN KEY (`Currency_Id`)
    REFERENCES `tiffin_db`.`currency` (`Currency_id`),
  CONSTRAINT `Location_FK_2`
    FOREIGN KEY (`User_ID`)
    REFERENCES `tiffin_db`.`users` (`User_Id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`order_status` (
  `Order_Status_Id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Order Status Table',
  `Order_Status_Name` VARCHAR(20) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL COMMENT 'Name of the Order Status',
  PRIMARY KEY (`Order_Status_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`order_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`order_items` (
  `Order_Items_Id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Order Items Table',
  `Item_Id` BIGINT NOT NULL COMMENT 'Foreign Key of the Item Ordered',
  `Item_Count` INT NOT NULL COMMENT 'Count of Item Ordered',
  `User_Id` BIGINT NOT NULL COMMENT 'Primary Key of the Customer User ID',
  `Order_Status_Id` INT NULL DEFAULT NULL COMMENT 'Foreign key to Order Status Table',
  PRIMARY KEY (`Order_Items_Id`),
  INDEX `Order_Items_FK` (`User_Id` ASC) VISIBLE,
  INDEX `Order_Items_FK1` (`Order_Status_Id` ASC) INVISIBLE,
  CONSTRAINT `Order_Items_FK`
    FOREIGN KEY (`User_Id`)
    REFERENCES `tiffin_db`.`users` (`User_Id`),
  CONSTRAINT `Order_Items_FK1`
    FOREIGN KEY (`Order_Status_Id`)
    REFERENCES `tiffin_db`.`order_status` (`Order_Status_Id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`transactions` (
  `Transaction_Id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Transactions table',
  `Merchant_Id` BIGINT NOT NULL COMMENT 'Foreign key to the Merchants table',
  `Customer_Id` BIGINT NOT NULL COMMENT 'User Id of the customer',
  `Order_Status_Id` INT NOT NULL COMMENT 'Foreign key to the Order Status table',
  `Delivery_Type` VARCHAR(45) NULL DEFAULT NULL,
  `Delivery_Date` DATE NULL DEFAULT NULL,
  `Transaction_Date` DATE NULL DEFAULT NULL,
  `Total_Cost` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`Transaction_Id`),
  INDEX `Transactions_FK` (`Merchant_Id` ASC) VISIBLE,
  INDEX `Transactions_FK_1` (`Customer_Id` ASC) VISIBLE,
  INDEX `Transactions_FK_2` (`Order_Status_Id` ASC) VISIBLE,
  CONSTRAINT `Transactions_FK`
    FOREIGN KEY (`Merchant_Id`)
    REFERENCES `tiffin_db`.`merchants` (`Merchant_Id`),
  CONSTRAINT `Transactions_FK_1`
    FOREIGN KEY (`Customer_Id`)
    REFERENCES `tiffin_db`.`users` (`User_Id`),
  CONSTRAINT `Transactions_FK_2`
    FOREIGN KEY (`Order_Status_Id`)
    REFERENCES `tiffin_db`.`order_status` (`Order_Status_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`transaction_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`transaction_items` (
  `Transaction_Items_Id` INT NOT NULL AUTO_INCREMENT,
  `Item_Name` VARCHAR(100) NULL DEFAULT NULL,
  `Quantity` INT NULL DEFAULT NULL,
  `Transaction_Id` BIGINT NOT NULL COMMENT 'Foreign Key to the Transactions Table',
  PRIMARY KEY (`Transaction_Items_Id`),
  INDEX `Transaction_Items_FK1` (`Transaction_Id` ASC) INVISIBLE,
  CONSTRAINT `Transaction_Items_FK1`
    FOREIGN KEY (`Transaction_Id`)
    REFERENCES `tiffin_db`.`transactions` (`Transaction_Id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`user_type` (
  `User_Type_Id` INT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the User Type Table',
  `User_Type_Name` VARCHAR(25) NOT NULL COMMENT 'Name of the User Type',
  PRIMARY KEY (`User_Type_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tiffin_db`.`user_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tiffin_db`.`user_information` (
  `User_Info_Id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of User Info Table',
  `User_Id` BIGINT NOT NULL COMMENT 'Foreign Key to the Users table',
  `User_Type_Id` INT NOT NULL COMMENT 'Foreign key to the User type table',
  `Location_Id` INT NOT NULL COMMENT 'Foreign Key to the Location table',
  `Street_Name` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Street name of the user location',
  `House_Apt_Number` INT NULL DEFAULT NULL COMMENT 'House/Apartment Number of the user location',
  PRIMARY KEY (`User_Info_Id`),
  INDEX `User_Information_FK` (`User_Id` ASC) VISIBLE,
  INDEX `User_Information_FK_1` (`User_Type_Id` ASC) VISIBLE,
  INDEX `User_Information_FK_2` (`Location_Id` ASC) VISIBLE,
  CONSTRAINT `User_Information_FK`
    FOREIGN KEY (`User_Id`)
    REFERENCES `tiffin_db`.`users` (`User_Id`),
  CONSTRAINT `User_Information_FK_1`
    FOREIGN KEY (`User_Type_Id`)
    REFERENCES `tiffin_db`.`user_type` (`User_Type_Id`),
  CONSTRAINT `User_Information_FK_2`
    FOREIGN KEY (`Location_Id`)
    REFERENCES `tiffin_db`.`location` (`Location_Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
