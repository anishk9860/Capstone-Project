CREATE DATABASE `Tiffin_DB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Tiffin_DB`;

-- Tiffin_DB.City_Location definition

CREATE TABLE IF NOT EXISTS `City_Location` (
  `City_Location_Id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key Of City Location Table',
  `City_Code` varchar(10) DEFAULT NULL COMMENT 'Code of city',
  `City_Name` varchar(50) DEFAULT NULL COMMENT 'Name of the city',
  `Country_Code` varchar(5) NOT NULL COMMENT 'Code of the Location Country',
  PRIMARY KEY (`City_Location_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Cuisine definition

CREATE TABLE IF NOT EXISTS `Cuisine` (
  `Cuisine_Id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Cuisine table',
  `Cuisine_Name` varchar(100) NOT NULL COMMENT 'Name of the cuisine',
  PRIMARY KEY (`Cuisine_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Currency definition

CREATE TABLE IF NOT EXISTS `Currency` (
  `Currency_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Currency Table',
  `Currency_Symbol` varchar(5) NOT NULL COMMENT 'Symbol of currency',
  `Currency_Name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Name of currency',
  `Country_Code` varchar(3) DEFAULT NULL COMMENT 'Country Code of the currency',
  `Country_Name` varchar(100) DEFAULT NULL COMMENT 'Name of the country where the currency is used',
  PRIMARY KEY (`Currency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Order_Status definition

CREATE TABLE IF NOT EXISTS `Order_Status` (
  `Order_Status_Id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Order Status Table',
  `Order_Status_Name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Name of the Order Status',
  PRIMARY KEY (`Order_Status_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Payment_Status definition

CREATE TABLE IF NOT EXISTS `Payment_Status` (
  `Payment_Status_Id` int NOT NULL COMMENT 'Primary Key of Payment Status table',
  `Payment_Status_Name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Status of Payment',
  PRIMARY KEY (`Payment_Status_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.User_Type definition

CREATE TABLE IF NOT EXISTS `User_Type` (
  `User_Type_Id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the User Type Table',
  `User_Type_Name` varchar(10) NOT NULL COMMENT 'Name of the User Type',
  PRIMARY KEY (`User_Type_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Location definition

CREATE TABLE IF NOT EXISTS `Location` (
  `Location_Id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Location table',
  `City_Location_Id` int NOT NULL COMMENT 'Foreign key of the City_Location table',
  `Zip_Code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Zip Code/Pin code of the location',
  `Currency_Id` int DEFAULT NULL COMMENT 'Foreign key to the Currency table',
  PRIMARY KEY (`Location_Id`),
  KEY `Location_FK` (`City_Location_Id`),
  KEY `Location_FK_1` (`Currency_Id`),
  CONSTRAINT `Location_FK` FOREIGN KEY (`City_Location_Id`) REFERENCES `City_Location` (`City_Location_Id`),
  CONSTRAINT `Location_FK_1` FOREIGN KEY (`Currency_Id`) REFERENCES `Currency` (`Currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Payment definition

CREATE TABLE IF NOT EXISTS `Payment` (
  `Payment_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Payment table',
  `Payment_Status_Id` int DEFAULT NULL COMMENT 'Status of the Payment',
  `Payment_Details` text COMMENT 'Details of the payments stores as JSON',
  PRIMARY KEY (`Payment_Id`),
  KEY `Payment_FK` (`Payment_Status_Id`),
  CONSTRAINT `Payment_FK` FOREIGN KEY (`Payment_Status_Id`) REFERENCES `Payment_Status` (`Payment_Status_Id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Choice_Of_Cuisine definition

CREATE TABLE IF NOT EXISTS `Choice_Of_Cuisine` (
  `User_Id` bigint NOT NULL COMMENT 'Foreign Key to the Users table',
  `Cuisine_Id` int NOT NULL COMMENT 'Cuisines prefered by user',
  PRIMARY KEY (`User_Id`,`Cuisine_Id`),
  KEY `Choice_Of_Cuisine_FK_1` (`Cuisine_Id`),
  CONSTRAINT `Choice_Of_Cuisine_FK` FOREIGN KEY (`User_Id`) REFERENCES `Users` (`User_Id`),
  CONSTRAINT `Choice_Of_Cuisine_FK_1` FOREIGN KEY (`Cuisine_Id`) REFERENCES `Cuisine` (`Cuisine_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Delivery_Schedule definition

CREATE TABLE IF NOT EXISTS `Delivery_Schedule` (
  `Delivery_Schedule_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Delivery Schedule Table',
  `Delivery_Schedule_Days` longtext NOT NULL COMMENT 'JSON of the Days of the week of delivery',
  `Merchant_Id` bigint NOT NULL COMMENT 'Foreign Key to the Merchant table',
  PRIMARY KEY (`Delivery_Schedule_Id`),
  KEY `Delivery_Schedule_FK` (`Merchant_Id`),
  CONSTRAINT `Delivery_Schedule_FK` FOREIGN KEY (`Merchant_Id`) REFERENCES `Merchants` (`Merchant_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Items definition

CREATE TABLE IF NOT EXISTS `Items` (
  `Item_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Items table',
  `Merchant_Id` bigint NOT NULL COMMENT 'Foreign Key to the Merchant table',
  `Item_Name` varchar(100) NOT NULL COMMENT 'Name of the Item',
  `Item_Pic` blob COMMENT 'Pics of the Item',
  `Cuisine_Id` int NOT NULL COMMENT 'Foreign Key to the cuisine table',
  `Item_Cost` double NOT NULL COMMENT 'Cost of the Item',
  PRIMARY KEY (`Item_Id`),
  KEY `Items_FK` (`Merchant_Id`),
  KEY `Items_FK_1` (`Cuisine_Id`),
  CONSTRAINT `Items_FK` FOREIGN KEY (`Merchant_Id`) REFERENCES `Merchants` (`Merchant_Id`),
  CONSTRAINT `Items_FK_1` FOREIGN KEY (`Cuisine_Id`) REFERENCES `Cuisine` (`Cuisine_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Merchants definition

CREATE TABLE IF NOT EXISTS `Merchants` (
  `Merchant_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Merchant table',
  `User_Id` bigint NOT NULL COMMENT 'Foreign Key to the User Table',
  `Location_Id` int NOT NULL COMMENT 'Foreign Key to the Location Table',
  `User_Type_Id` int NOT NULL COMMENT 'Type of the User (Merchant Only)',
  `Merchant_Name` varchar(100) NOT NULL COMMENT 'Name of the Merchant',
  `Merchant_Pic` blob COMMENT 'Image to be used for Merchant',
  `Rating_Id` bigint DEFAULT NULL COMMENT 'Ratings of the merchant',
  `Delivery_Schedule_Id` bigint DEFAULT NULL COMMENT 'Delivery Schedule Of the merchant',
  PRIMARY KEY (`Merchant_Id`),
  KEY `Merchants_FK` (`User_Id`),
  KEY `Merchants_FK_1` (`Location_Id`),
  KEY `Merchants_FK_2` (`User_Type_Id`),
  KEY `Merchants_FK_3` (`Delivery_Schedule_Id`),
  KEY `Merchants_FK_4` (`Rating_Id`),
  CONSTRAINT `Merchants_FK` FOREIGN KEY (`User_Id`) REFERENCES `Users` (`User_Id`),
  CONSTRAINT `Merchants_FK_1` FOREIGN KEY (`Location_Id`) REFERENCES `Location` (`Location_Id`),
  CONSTRAINT `Merchants_FK_2` FOREIGN KEY (`User_Type_Id`) REFERENCES `User_Type` (`User_Type_Id`),
  CONSTRAINT `Merchants_FK_3` FOREIGN KEY (`Delivery_Schedule_Id`) REFERENCES `Delivery_Schedule` (`Delivery_Schedule_Id`),
  CONSTRAINT `Merchants_FK_4` FOREIGN KEY (`Rating_Id`) REFERENCES `Ratings` (`Rating_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Order_Items definition

CREATE TABLE IF NOT EXISTS `Order_Items` (
  `Item_Id` bigint NOT NULL COMMENT 'Foreign Key of the Item Ordered',
  `Item_Count` int NOT NULL COMMENT 'Count of Item Ordered',
  `User_Id` bigint NOT NULL COMMENT 'Primary Key of the Customer User ID',
  KEY `Order_Items_FK` (`User_Id`),
  CONSTRAINT `Order_Items_FK` FOREIGN KEY (`User_Id`) REFERENCES `Users` (`User_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Ratings definition

CREATE TABLE IF NOT EXISTS `Ratings` (
  `Rating_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Ratings table',
  `Merchant_Id` bigint NOT NULL COMMENT 'Foreign Key to the Merchant table',
  `Five_Star_Count` int unsigned DEFAULT NULL COMMENT 'Number of 5 star ratings',
  `Four_Star_Count` int unsigned DEFAULT NULL COMMENT 'Number of 4 star ratings',
  `Three_Star_Rating` int unsigned DEFAULT NULL COMMENT 'Number of 3 star ratings',
  `Two_Star_Rating` int unsigned DEFAULT NULL COMMENT 'Number of 2 star ratings',
  `One_Star_Rating` int unsigned DEFAULT NULL COMMENT 'Number of 1 star ratings',
  `Less_Than_One_Star_Rating` int unsigned DEFAULT NULL COMMENT 'Number of <1 star ratings',
  PRIMARY KEY (`Rating_Id`),
  KEY `Ratings_FK` (`Merchant_Id`),
  CONSTRAINT `Ratings_FK` FOREIGN KEY (`Merchant_Id`) REFERENCES `Merchants` (`Merchant_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Transactions definition

CREATE TABLE IF NOT EXISTS `Transactions` (
  `Transaction_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of Transactions table',
  `Merchant_Id` bigint NOT NULL COMMENT 'Foreign key to the Merchants table',
  `Customer_Id` bigint NOT NULL COMMENT 'User Id of the customer',
  `Order_Status_Id` int NOT NULL COMMENT 'Foreign key to the Order Status table',
  `Payment_Id` bigint DEFAULT NULL COMMENT 'Foreign Key to the Payment table',
  PRIMARY KEY (`Transaction_Id`),
  KEY `Transactions_FK` (`Merchant_Id`),
  KEY `Transactions_FK_1` (`Customer_Id`),
  KEY `Transactions_FK_2` (`Order_Status_Id`),
  KEY `Transactions_FK_3` (`Payment_Id`),
  CONSTRAINT `Transactions_FK` FOREIGN KEY (`Merchant_Id`) REFERENCES `Merchants` (`Merchant_Id`),
  CONSTRAINT `Transactions_FK_1` FOREIGN KEY (`Customer_Id`) REFERENCES `Users` (`User_Id`),
  CONSTRAINT `Transactions_FK_2` FOREIGN KEY (`Order_Status_Id`) REFERENCES `Order_Status` (`Order_Status_Id`),
  CONSTRAINT `Transactions_FK_3` FOREIGN KEY (`Payment_Id`) REFERENCES `Payment` (`Payment_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.User_Information definition

CREATE TABLE IF NOT EXISTS `User_Information` (
  `User_Info_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of User Info Table',
  `User_Id` bigint NOT NULL COMMENT 'Foreign Key to the Users table',
  `User_Type_Id` int NOT NULL COMMENT 'Foreign key to the User type table',
  `Location_Id` int NOT NULL COMMENT 'Foreign Key to the Location table',
  `Street_Name` varchar(100) DEFAULT NULL COMMENT 'Street name of the user location',
  `House_Apt_Number` int DEFAULT NULL COMMENT 'House/Apartment Number of the user location',
  PRIMARY KEY (`User_Info_Id`),
  KEY `User_Information_FK` (`User_Id`),
  KEY `User_Information_FK_1` (`User_Type_Id`),
  KEY `User_Information_FK_2` (`Location_Id`),
  CONSTRAINT `User_Information_FK` FOREIGN KEY (`User_Id`) REFERENCES `Users` (`User_Id`),
  CONSTRAINT `User_Information_FK_1` FOREIGN KEY (`User_Type_Id`) REFERENCES `User_Type` (`User_Type_Id`),
  CONSTRAINT `User_Information_FK_2` FOREIGN KEY (`Location_Id`) REFERENCES `Location` (`Location_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tiffin_DB.Users definition

CREATE TABLE IF NOT EXISTS `Users` (
  `User_Id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary Key of the Users Table',
  `User_Name` varchar(50) NOT NULL COMMENT 'user name of the user',
  `Entity_Name` varchar(100) DEFAULT NULL COMMENT 'Name of the Customer/Merchant',
  `User_Password` varchar(50) NOT NULL COMMENT 'Password of the user',
  `Created_On` datetime NOT NULL COMMENT 'Date and time the user was created',
  `User_Type_Id` int NOT NULL COMMENT 'Type of the user (Customer/Merchant)',
  `Most_Recent_Transaction_Id` bigint DEFAULT NULL COMMENT 'Most recent transaction id associated',
  PRIMARY KEY (`User_Id`),
  KEY `Users_FK` (`User_Type_Id`),
  KEY `Users_FK_1` (`Most_Recent_Transaction_Id`),
  CONSTRAINT `Users_FK` FOREIGN KEY (`User_Type_Id`) REFERENCES `User_Type` (`User_Type_Id`),
  CONSTRAINT `Users_FK_1` FOREIGN KEY (`Most_Recent_Transaction_Id`) REFERENCES `Transactions` (`Transaction_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;