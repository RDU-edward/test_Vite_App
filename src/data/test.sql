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
	IN `_manager_email` VARCHAR(50),
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
    manager_email,
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
    _manager_email,
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
  `manager_email` varchar(50) DEFAULT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `movein_date` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `total_occupants` int DEFAULT NULL,
  `amount_paid` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `payment_status` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_customer_reservation: ~0 rows (approximately)
INSERT INTO `node_customer_reservation` (`id`, `property_id`, `tenant_id`, `manager_id`, `manager_email`, `fullname`, `contact_number`, `email`, `movein_date`, `total_occupants`, `amount_paid`, `payment_status`, `created_at`) VALUES
	(15, 32, 23, 32, NULL, 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-12', 1, '210000', 'paid', '2026-05-11'),
	(16, 31, 23, 32, NULL, 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-19', 12, '926.0999999999999', 'paid', '2026-05-11'),
	(17, 31, 23, 32, NULL, 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-13', 12, '926.0999999999999', 'paid', '2026-05-11'),
	(18, 34, 23, 32, NULL, 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-11', 12, '926.0999999999999', 'paid', '2026-05-11'),
	(19, 36, 23, 32, NULL, 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-11', -3, '926.0999999999999', 'paid', '2026-05-11'),
	(20, 35, 23, 32, 'edwardcatapan@gmail.com', 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-04', 12, '926.0999999999999', 'paid', '2026-05-11'),
	(21, 35, 23, 32, 'edwardcatapan@gmail.com', 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-11', 12, '926.0999999999999', 'paid', '2026-05-11'),
	(22, 34, 23, 32, 'edwardcatapan@gmail.com', 'John Doe', '93248383', 'xdwardd@gmail.com', '2026-05-20', 12, '926.0999999999999', 'paid', '2026-05-11');

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
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_property: ~7 rows (approximately)
INSERT INTO `node_property` (`id`, `manager_id`, `property_title`, `address`, `property_type`, `monthly_price`, `bedrooms`, `bathrooms`, `description`, `availability`, `floor_area`, `lot_size`, `year_built`, `amenities`, `files`, `address_lat`, `address_long`, `created_at`, `updated_at`) VALUES
	(31, 32, 'Town House Newly Funrnish1', '123 Main St, Anytown, Cebu City', 'house', '1323.00', 12, 2, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'available', '2213', '22', '213', 'Pool,Wifi,Parking,Laundry,Pet Friendly,Spa', '["uploads/1777871162593.jpg","uploads/1777871162617.jpg","uploads/1777871162635.jpg","uploads/1777871162650.jpg","uploads/1777871162657.jpg"]', 10.312, 123.9076, '2026-04-30', '2026-05-04'),
	(32, 32, 'Luxury Waterfront Villa', '45 Ocean Blvd, Lapu-Lapu City', 'house', '300000', 4, 3, 'A luxurious 5-bedroom villa with panoramic ocean views and an infinity pool', 'available', '123', '3255', '', 'Pool,Restaurant,Pet Friendly,Air Conditioning', '["uploads/1777871546793.jpg","uploads/1777871546819.jpg","uploads/1777871546828.jpg","uploads/1777871546838.jpg","uploads/1777871546848.jpg","uploads/1777871546856.jpg"]', 10.30017757418692, 124.0045886779785, '2026-05-04', NULL),
	(33, 32, 'Urban Loft Apartment', '123 Main St, Anytown, Cebu City', 'apartment', '8500', 2, 2, 'A trendy 1-bedroom loft in the heart of Cebu\'s bustling city center, ideal for young professionals.', 'available', '232', '124', '2011', 'Gym,Air Conditioning,Wifi,Pet Friendly', '["uploads/1777871911160.jpg","uploads/1777871911187.jpg","uploads/1777871911211.jpg","uploads/1777871911218.jpg","uploads/1777871911227.jpg"]', 10.352868392376836, 123.91429479370116, '2026-05-04', NULL),
	(34, 32, 'Newly Funrnish1', '123 Main St, Anytown, Cebu City', 'house', '1323.00', 12, 2, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'unavailable', '2213', '22', '213', 'Pool,Wifi,Parking,Laundry,Pet Friendly,Spa', '["uploads/1777871162593.jpg","uploads/1777871162617.jpg","uploads/1777871162635.jpg","uploads/1777871162650.jpg","uploads/1777871162657.jpg"]', 10.312, 123.9076, '2026-04-30', '2026-05-04'),
	(35, 32, 'Town House Newly', '123 Main St, Anytown, Cebu City', 'house', '1323.00', 12, 2, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'unavailable', '2213', '22', '213', 'Pool,Wifi,Parking,Laundry,Pet Friendly,Spa', '["uploads/1777871162593.jpg","uploads/1777871162617.jpg","uploads/1777871162635.jpg","uploads/1777871162650.jpg","uploads/1777871162657.jpg"]', 10.312, 123.9076, '2026-04-30', '2026-05-04'),
	(36, 32, 'Town House N24234', '123 Main St, Anytown, Cebu City', 'house', '1323.00', 12, 2, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'available', '2213', '22', '213', 'Pool,Wifi,Parking,Laundry,Pet Friendly,Spa', '["uploads/1777871162593.jpg","uploads/1777871162617.jpg","uploads/1777871162635.jpg","uploads/1777871162650.jpg","uploads/1777871162657.jpg"]', 10.312, 123.9076, '2026-04-30', '2026-05-04'),
	(37, 32, 'Town House Newly 234', '123 Main St, Anytown, Cebu City', 'house', '1323.00', 12, 2, 'A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.', 'available', '2213', '22', '213', 'Pool,Wifi,Parking,Laundry,Pet Friendly,Spa', '["uploads/1777871162593.jpg","uploads/1777871162617.jpg","uploads/1777871162635.jpg","uploads/1777871162650.jpg","uploads/1777871162657.jpg"]', 10.312, 123.9076, '2026-04-30', '2026-05-04');

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_user: ~10 rows (approximately)
INSERT INTO `node_user` (`id`, `firstname`, `lastname`, `email`, `password`, `contact_number`, `address`, `role`, `files`, `status`, `is_deleted`, `created_at`) VALUES
	(23, 'John', 'Doe', 'xdwardd@gmail.com', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 93248383, 'test', 'tenant', '["uploads\\\\1776840737093.png"]', 'active', 0, '2026-04-22'),
	(24, 'Admin', 'Super Admin', 'xdwardd@gmail.com2', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 93248383, 'test', 'admin', '["uploads\\\\1776840737093.png"]', 'active', 0, '2026-04-22'),
	(32, 'Edward', 'Catapan', 'edwardcatapan@gmail.com', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 2147483647, 'aesdfasdfsdfa sadfasdf asadfsdf', 'manager', '[]', 'active', 0, '2026-05-05');

-- Dumping structure for procedure test_kyc.updateProperty
DELIMITER //
CREATE PROCEDURE `updateProperty`(
	IN `p_property_id` INT,
	IN `p_manager_id` INT,
	IN `p_property_title` VARCHAR(255),
	IN `p_address` VARCHAR(255),
	IN `p_property_type` VARCHAR(50),
	IN `p_monthly_price` DECIMAL(10,2),
	IN `p_bedrooms` INT,
	IN `p_bathrooms` INT,
	IN `p_description` TEXT,
	IN `p_availability` VARCHAR(20),
	IN `p_floor_area` VARCHAR(50),
	IN `p_lot_size` VARCHAR(50),
	IN `p_year_built` INT,
	IN `p_amenities` TEXT,
	IN `p_files` LONGTEXT,
	IN `p_address_lat` DOUBLE,
	IN `p_address_long` DOUBLE
)
BEGIN
    UPDATE node_property
    SET
        manager_id = p_manager_id,
        property_title = p_property_title,
        address = p_address,
        property_type = p_property_type,
        monthly_price = p_monthly_price,
        bedrooms = p_bedrooms,
        bathrooms = p_bathrooms,
        description = p_description,
        availability = p_availability,
        floor_area = p_floor_area,
        lot_size = p_lot_size,
        year_built = p_year_built,
        amenities = p_amenities,
        files = p_files,
        address_lat = p_address_lat,
        address_long = p_address_long,
        updated_at = NOW()
    WHERE id = p_property_id;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.updateUser
DELIMITER //
CREATE PROCEDURE `updateUser`(
	IN `_id` INT,
	IN `_firstname` VARCHAR(50),
	IN `_email` VARCHAR(50),
	IN `_status` VARCHAR(50)
)
BEGIN
UPDATE node_user SET `status` = _status  WHERE  firstname = _firstname AND email = _email AND id = _id;
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
