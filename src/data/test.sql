-- --------------------------------------------------------
-- Host:                         192.168.100.68
-- Server version:               8.0.37-0ubuntu0.20.04.3 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for procedure test_kyc.createProperty
DELIMITER //
CREATE PROCEDURE `createProperty`(
	IN `p_manager_id` INT,
	IN `p_property_title` VARCHAR(50),
	IN `p_address` VARCHAR(50),
	IN `p_property_type` VARCHAR(50),
	IN `p_monthly_price` INT,
	IN `p_bedrooms` INT,
	IN `p_bathrooms` INT,
	IN `p_description` LONGTEXT,
	IN `p_availability` VARCHAR(50),
	IN `p_floor_area` VARCHAR(50),
	IN `p_lot_size` VARCHAR(50),
	IN `p_year_built` VARCHAR(50),
	IN `p_amenities` VARCHAR(100),
	IN `p_files` LONGTEXT,
	IN `p_address_lat` DOUBLE,
	IN `p_address_long` DOUBLE
)
BEGIN
  INSERT INTO node_property (manager_id, property_title, address, property_type, monthly_price, bedrooms, bathrooms,`description`, availability, floor_area, lot_size, year_built, amenities, files, address_lat, address_long, created_at)
  VALUES (p_manager_id, p_property_title, p_address, p_property_type, p_monthly_price, p_bedrooms, p_bathrooms, p_description, p_availability, p_floor_area, p_lot_size, p_year_built, p_amenities, p_files, p_address_lat, p_address_long, NOW() );
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.createReservation
DELIMITER //
CREATE PROCEDURE `createReservation`(
	IN `_property_id` INT,
	IN `_manager_id` INT,
	IN `_tenant_id` INT,
	IN `_fullname` VARCHAR(50),
	IN `_contact_number` VARCHAR(50),
	IN `_email` VARCHAR(50),
	IN `_movein_date` VARCHAR(50),
	IN `_total_occupants` INT,
	IN `_amount_paid` VARCHAR(50)
)
BEGIN
START TRANSACTION;

-- Try to claim the property
UPDATE node_property
SET availability = 'unavailable'
WHERE id = _property_id
  AND availability = 'available';

-- Check if we actually got it
IF ROW_COUNT() = 0 THEN
    ROLLBACK;
    SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Property already reserved';
END IF;

-- Insert reservation only if claim succeeded
INSERT INTO node_customer_reservation (
    property_id,
    manager_id,
    tenant_id,
    fullname,
    contact_number,
    email,
    movein_date,
    total_occupants,
    amount_paid,
    payment_status,
    created_at
) VALUES (
    _property_id,
    _manager_id,
    _tenant_id,
    _fullname,
    _contact_number,
    _email,
    _movein_date,
    _total_occupants,
    _amount_paid,
    'paid',
    NOW()
);

COMMIT;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.createUser
DELIMITER //
CREATE PROCEDURE `createUser`(
	IN `p_firstname` VARCHAR(50),
	IN `p_lastname` VARCHAR(50),
	IN `p_email` VARCHAR(50),
	IN `p_password` VARCHAR(100),
	IN `p_contact_number` INT,
	IN `p_address` VARCHAR(100),
	IN `p_role` VARCHAR(50),
	IN `p_files` VARCHAR(50)
)
BEGIN

   DECLARE user_status VARCHAR(20);

    -- Conditional logic for status
    IF p_role = 'manager' THEN
        SET user_status = 'pending';
    ELSE
        SET user_status = 'active';
    END IF;

  INSERT INTO node_user (firstname, lastname, email, `password`, contact_number, address, `role`, `files`, `status`, created_at)
  VALUES (p_firstname, p_lastname, p_email, p_password, p_contact_number, p_address, p_role, p_files, user_status, NOW() );
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.getAllAvailableProperties
DELIMITER //
CREATE PROCEDURE `getAllAvailableProperties`()
BEGIN
SELECT * FROM node_property WHERE availability = "available";
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.getAllPropertyByManagerId
DELIMITER //
CREATE PROCEDURE `getAllPropertyByManagerId`(
	IN `_manager_id` INT
)
BEGIN
SELECT * FROM node_property WHERE manager_id = _manager_id;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.getPropertyById
DELIMITER //
CREATE PROCEDURE `getPropertyById`(
	IN `_id` INT
)
BEGIN
SELECT a.*, 
       b.firstname AS owner_firstname, 
       b.lastname AS owner_lastname,
       b.email AS owner_email,
       b.contact_number AS owner_mobile,
       b.address AS owner_address
FROM node_property a
LEFT JOIN node_user b ON a.manager_id = b.id
WHERE a.id = _id;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.getReservationById
DELIMITER //
CREATE PROCEDURE `getReservationById`(
	IN `_tenant_id` INT
)
BEGIN
SELECT * FROM node_customer_reservation a 
LEFT JOIN node_property b ON a.property_id = b.id
 WHERE tenant_id = _tenant_id;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.getReservationByManagerId
DELIMITER //
CREATE PROCEDURE `getReservationByManagerId`(
	IN `_manager_id` INT
)
BEGIN
SELECT * FROM node_customer_reservation a 
LEFT JOIN node_property b ON a.property_id = b.id
WHERE a.manager_id = _manager_id;
END//
DELIMITER ;

-- Dumping structure for table test_kyc.node_customer_reservation
CREATE TABLE IF NOT EXISTS `node_customer_reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `movein_date` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `total_occupants` int DEFAULT NULL,
  `amount_paid` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `payment_status` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_customer_reservation: ~7 rows (approximately)
INSERT INTO `node_customer_reservation` (`id`, `property_id`, `tenant_id`, `manager_id`, `fullname`, `contact_number`, `email`, `movein_date`, `total_occupants`, `amount_paid`, `payment_status`, `created_at`) VALUES
	(8, 22, 28, 23, 'JackAnderson', '93248383', 'jand@gmail.com', '2026-04-13', 12, '20823', 'paid', '2026-04-25'),
	(9, 22, 28, 23, 'JackAnderson', '93248383', 'jand@gmail.com', '2026-04-30', 13, '23921', 'paid', '2026-04-25'),
	(10, 22, 28, 24, 'JackAnderson', '93248383', 'jand@gmail.com', '2026-04-14', 20, '34422', 'paid', '2026-04-25'),
	(11, 22, 29, 24, 'JackAnderson', '93248383', 'jand@gmail.com', '2026-04-14', 20, '12332', 'paid', '2026-04-25'),
	(12, 22, 29, 25, 'JackAnderson', '93248383', 'jand@gmail.com', '2026-04-14', 20, '34234', 'paid', '2026-04-25'),
	(13, 26, 23, 23, 'John Doe', '93248383', 'jdoe@mail.com', '2026-04-28', 21, '121', 'paid', '2026-04-26'),
	(14, 27, 23, 23, 'John Doe', '93248383', 'jdoe@mail.com', '2026-04-29', 23, '121', 'paid', '2026-04-26');

-- Dumping structure for table test_kyc.node_property
CREATE TABLE IF NOT EXISTS `node_property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `manager_id` int DEFAULT NULL,
  `property_title` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `property_type` varchar(50) DEFAULT NULL,
  `monthly_price` varchar(50) DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `description` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `availability` varchar(50) DEFAULT NULL,
  `floor_area` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `lot_size` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `year_built` varchar(50) DEFAULT NULL,
  `amenities` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `files` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `address_lat` double DEFAULT NULL,
  `address_long` double DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_property: ~9 rows (approximately)
INSERT INTO `node_property` (`id`, `manager_id`, `property_title`, `address`, `property_type`, `monthly_price`, `bedrooms`, `bathrooms`, `description`, `availability`, `floor_area`, `lot_size`, `year_built`, `amenities`, `files`, `address_lat`, `address_long`, `created_at`) VALUES
	(22, 23, 'Modern Family Home', '123 Main St, Anytown, Cebu City', 'apartment', '12782', 3, 2, 'A beautiful 4-bedroom family home with a spacious ', 'available', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1776923977822.jpg","uploads/1776923977837.jpg"]', 123.90695205313199, 123.90695205313199, '2026-04-23'),
	(23, 23, 'Luxury Waterfront Villa', '45 Ocean Blvd, Lapu-Lapu City', 'apartment', '3213213', 10, 2, 'A luxurious 5-bedroom villa with panoramic ocean v', 'available', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1776924202822.jpg","uploads/1776924202849.png"]', 123.90695205313199, 123.90695205313199, '2026-04-23'),
	(24, 24, 'Cozy Cottage Retreat', '89 Pine Ave, Tagbilaran City, Bohol', 'house', '1223212', 2, 1, 'A charming 2-bedroom cottage in a peaceful forest ', 'available', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1776925688223.jpg","uploads/1776925688246.jpg"]', 123.90695205313199, 123.90695205313199, '2026-04-23'),
	(25, 23, 'Modern Family Home', 'Maribago Lapu-Lapu City', 'studio', '23000', 1, 23, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum quae itaque laborum non illum distinctio omnis voluptate animi error in.\r\n', 'available', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1777158670487.jpg","uploads/1777158670521.jpg","uploads/1777158670538.jpg","uploads/1777158670561.jpg","uploads/1777158670582.jpg"]', 123.90695205313199, 123.90695205313199, '2026-04-26'),
	(26, 23, 'New Tree House', 'test', 'house', '121', 2, 3, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'unavailable', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1777170079409.jpg","uploads/1777170079465.jpg","uploads/1777170079476.jpg","uploads/1777170079489.jpg","uploads/1777170079507.jpg"]', 123.90695205313199, 123.90695205313199, '2026-04-26'),
	(27, 23, 'New Tree House', 'test', 'studio', '121', 2, 3, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'unavailable', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1777170154072.jpg","uploads/1777170154135.jpg","uploads/1777170154168.jpg","uploads/1777170154175.jpg","uploads/1777170154195.jpg"]', 123.90695205313199, 123.90695205313199, '2026-04-26'),
	(28, 23, 'Town House Newly Funrnished', 'Bogo Cebu', 'house', '232322', 1, 1, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'available', '2213', '2213', '2213', 'Pool, Wifi, Parking, Pet Friendly', '["uploads/1777170332653.jpg","uploads/1777170332694.jpg","uploads/1777170332706.jpg","uploads/1777170332712.jpg","uploads/1777170332746.jpg"]', 123.90695205313199, 123.90695205313199, '2026-04-26'),
	(29, 23, 'Town House Newly Funrnishedwewqe', 'Bogo Cebu', 'studio', '232322', 1, 1, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'available', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1777170532480.jpg","uploads/1777170532519.jpg","uploads/1777170532531.jpg","uploads/1777170532550.jpg","uploads/1777170532559.jpg"]', 10.314208982388605, 123.90695205313199, '2026-04-26'),
	(30, 23, 'asdf', 'Hipodromo Village, Cebu City', 'house', '123222', 2, 3, ' A trendy 1-bedroom loft in the heart of Cebu\'s bustling city center, ideal for young professionals.\r\n', 'unavailable', '2213', '2213', '2213', 'Pool, Wifi, Parking', '["uploads/1777449711797.jpg","uploads/1777449711849.jpg","uploads/1777449711862.jpg","uploads/1777449711869.jpg","uploads/1777449711882.jpg"]', 10.314208982388605, 123.90695205313199, '2026-04-29'),
	(31, 23, 'Town House Newly Funrnishedwewqe', '123 Main St, Anytown, Cebu City', 'house', '1323', 12, 2, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'available', '2213', '22', '213', 'Pool, Wifi, Parking, Laundry, Pet Friendly', '["uploads/1777522075415.jpg","uploads/1777522075441.jpg","uploads/1777522075504.png","uploads/1777522075517.jpg","uploads/1777522075529.jpg"]', 10.315716902747281, 123.90266052034525, '2026-04-30');

-- Dumping structure for table test_kyc.node_user
CREATE TABLE IF NOT EXISTS `node_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `lastname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `contact_number` int NOT NULL,
  `address` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `role` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `files` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `is_deleted` int NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_user: ~6 rows (approximately)
INSERT INTO `node_user` (`id`, `firstname`, `lastname`, `email`, `password`, `contact_number`, `address`, `role`, `files`, `status`, `is_deleted`, `created_at`) VALUES
	(23, 'John', 'Doe', 'jdoe@mail.com', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 93248383, 'test', 'manager', '["uploads\\\\1776840737093.png"]', 'active', 0, '2026-04-22'),
	(24, 'Admin', 'Super Admin', 'admin@ihomes.com', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 93248383, 'test', 'admin', '["uploads\\\\1776840737093.png"]', 'active', 0, '2026-04-22'),
	(25, 'Wii', 'Smith', 'wsmith@mail.com', '$2b$10$wpz0JzEQ7rgp8iHuJS57M.ceA.U8UibnGnlOlhHkcRO/x90wy1U9i', 93248383, 'test', 'tenant', '["uploads\\\\1776840737093.png"]', 'pending', 0, '2026-04-22'),
	(26, 'Bob', 'Brown', 'bb@mail.com', '$2b$10$wpz0JzEQ7rgp8iHuJS57M.ceA.U8UibnGnlOlhHkcRO/x90wy1U9i', 93248383, 'test', 'manager', '["uploads\\\\1776840737093.png"]', 'rejected', 0, '2026-04-22'),
	(27, 'Eve', 'Davis', 'eve@mail.com', '$2b$10$wpz0JzEQ7rgp8iHuJS57M.ceA.U8UibnGnlOlhHkcRO/x90wy1U9i', 93248383, 'test', 'tenant', '["uploads\\\\1776840737093.png"]', 'pending', 0, '2026-04-22'),
	(28, 'Jack', 'Anderson', 'jand@gmail.com', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 93248383, 'test', 'tenant', '["uploads\\\\1776840737093.png"]', 'rejected', 0, '2026-04-22'),
	(29, 'sdfasdfsad', 'fasdfsadf', 'myman@mail.com', '$2b$10$2LbV2BWDJaL4sXrKWLC7zO4/xNGf8YjQtIbDQwotrHx8BrVyPwcv2', 0, 'sdfasdfsadf', 'tenant', '[]', 'active', 0, '2026-04-30');

-- Dumping structure for procedure test_kyc.updateUser
DELIMITER //
CREATE PROCEDURE `updateUser`(
	IN `_id` INT,
	IN `_status` VARCHAR(50)
)
BEGIN
UPDATE node_user SET `status` = _status WHERE id = _id;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
