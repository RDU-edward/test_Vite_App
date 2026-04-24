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
	IN `p_description` VARCHAR(50),
	IN `p_availability` VARCHAR(50),
	IN `p_files` LONGTEXT
)
BEGIN
  INSERT INTO node_property (manager_id, property_title, address, property_type, monthly_price, bedrooms, bathrooms,`description`, availability, files, created_at)
  VALUES (p_manager_id, p_property_title, p_address, p_property_type, p_monthly_price, p_bedrooms, p_bathrooms, p_description, p_availability, p_files, NOW() );
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.createReservation
DELIMITER //
CREATE PROCEDURE `createReservation`(
	IN `_property_id` INT,
	IN `_fullname` VARCHAR(50),
	IN `_contact_number` INT,
	IN `_email` VARCHAR(50),
	IN `_total_occupants` INT,
	IN `_movein_date` VARCHAR(50)
)
BEGIN
INSERT INTO node_customer_reservation (property_id,
        fullname,
        contact_number,
        email,
		  movein_date,
        total_occupants, created_at) VALUES ( _property_id,
        _fullname,
        _contact_number,
        _email,
        _movein_date,
        _total_occupants, NOW());
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

-- Dumping structure for procedure test_kyc.create_user
DELIMITER //
CREATE PROCEDURE `create_user`(
	IN `p_name` VARCHAR(255),
	IN `p_password` VARCHAR(255)
)
BEGIN
	 IF EXISTS (SELECT * FROM users WHERE name = p_name) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Username already exists';
    ELSE
        INSERT INTO users (name, password, is_deleted, createdAt)
        VALUES (p_name, p_password, 0, CURRENT_TIMESTAMP);
    END IF;
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

-- Dumping structure for procedure test_kyc.get_all_users
DELIMITER //
CREATE PROCEDURE `get_all_users`()
BEGIN
	SELECT * FROM users WHERE is_deleted = 0;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.get_user_by_id
DELIMITER //
CREATE PROCEDURE `get_user_by_id`(
	IN `p_id` INT
)
BEGIN
	SELECT * FROM users WHERE id = p_id AND is_deleted = 0;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.get_user_by_name
DELIMITER //
CREATE PROCEDURE `get_user_by_name`(
	IN `p_name` VARCHAR(255)
)
BEGIN
	SELECT * FROM users WHERE name = p_name AND is_deleted = 0;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.insert_attachment
DELIMITER //
CREATE PROCEDURE `insert_attachment`(
	IN `p_name` VARCHAR(255),
	IN `p_file_name` VARCHAR(255),
	IN `p_file_path` VARCHAR(255)
)
BEGIN
	INSERT INTO user_attachment (name, file_name, file_path)
    VALUES (p_name, p_file_name, p_file_path);
    
    SELECT LAST_INSERT_ID() AS id;
END//
DELIMITER ;

-- Dumping structure for table test_kyc.node_customer_reservation
CREATE TABLE IF NOT EXISTS `node_customer_reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `contact_number` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `total_occupants` int DEFAULT NULL,
  `movein_date` varchar(50) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_customer_reservation: ~3 rows (approximately)
INSERT INTO `node_customer_reservation` (`id`, `property_id`, `fullname`, `contact_number`, `email`, `total_occupants`, `movein_date`, `created_at`) VALUES
	(1, 22, 'JackAnderson', 93248383, 'jand@gmail.com', 2026, '23', '2026-04-24'),
	(2, 22, 'JackAnderson', 93248383, 'jand@gmail.com', 2026, '23', '2026-04-24'),
	(3, 22, 'JackAnderson', 93248383, 'jand@gmail.com', 2026, '23', '2026-04-24');

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
  `description` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `availability` varchar(50) DEFAULT NULL,
  `files` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_property: ~3 rows (approximately)
INSERT INTO `node_property` (`id`, `manager_id`, `property_title`, `address`, `property_type`, `monthly_price`, `bedrooms`, `bathrooms`, `description`, `availability`, `files`, `created_at`) VALUES
	(22, 23, 'Modern Family Home', '123 Main St, Anytown, Cebu City', 'apartment', '12782', 3, 2, 'A beautiful 4-bedroom family home with a spacious ', 'available', '["uploads/1776923977822.jpg","uploads/1776923977837.jpg"]', '2026-04-23'),
	(23, 23, 'Luxury Waterfront Villa', '45 Ocean Blvd, Lapu-Lapu City', 'apartment', '3213213', 10, 2, 'A luxurious 5-bedroom villa with panoramic ocean v', 'available', '["uploads/1776924202822.jpg","uploads/1776924202849.png"]', '2026-04-23'),
	(24, 23, 'Cozy Cottage Retreat', '89 Pine Ave, Tagbilaran City, Bohol', 'house', '1223212', 2, 1, 'A charming 2-bedroom cottage in a peaceful forest ', 'available', '["uploads/1776925688223.jpg","uploads/1776925688246.jpg"]', '2026-04-23');

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
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.node_user: ~6 rows (approximately)
INSERT INTO `node_user` (`id`, `firstname`, `lastname`, `email`, `password`, `contact_number`, `address`, `role`, `files`, `status`, `created_at`) VALUES
	(23, 'John', 'Doe', 'jdoe@mail.com', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 93248383, 'test', 'manager', '["uploads\\\\1776840737093.png"]', 'pending', '2026-04-22'),
	(24, 'Admin', 'Super Admin', 'admin@ihomes.com', '$2b$10$wpz0JzEQ7rgp8iHuJS57M.ceA.U8UibnGnlOlhHkcRO/x90wy1U9i', 93248383, 'test', 'admin', '["uploads\\\\1776840737093.png"]', 'active', '2026-04-22'),
	(25, 'Wii', 'Smith', 'wsmith@mail.com', '$2b$10$wpz0JzEQ7rgp8iHuJS57M.ceA.U8UibnGnlOlhHkcRO/x90wy1U9i', 93248383, 'test', 'admin', '["uploads\\\\1776840737093.png"]', 'pending', '2026-04-22'),
	(26, 'Bob', 'Brown', 'bb@mail.com', '$2b$10$wpz0JzEQ7rgp8iHuJS57M.ceA.U8UibnGnlOlhHkcRO/x90wy1U9i', 93248383, 'test', 'admin', '["uploads\\\\1776840737093.png"]', 'pending', '2026-04-22'),
	(27, 'Eve', 'Davis', 'eve@mail.com', '$2b$10$wpz0JzEQ7rgp8iHuJS57M.ceA.U8UibnGnlOlhHkcRO/x90wy1U9i', 93248383, 'test', 'admin', '["uploads\\\\1776840737093.png"]', 'pending', '2026-04-22'),
	(28, 'Jack', 'Anderson', 'jand@gmail.com', '$2b$10$Dj/E9EhH82Tl0YmfuGebi.yC4H0tN/bGEjTA0Ucr5qlBd.iUn/FXm', 93248383, 'test', 'tenant', '["uploads\\\\1776840737093.png"]', 'inactive', '2026-04-22');

-- Dumping structure for procedure test_kyc.soft_delete_user
DELIMITER //
CREATE PROCEDURE `soft_delete_user`(
	IN `p_name` VARCHAR(255)
)
BEGIN
	UPDATE users SET is_deleted = 1 WHERE name = p_name AND is_deleted = 0;
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not found or already deleted';
    END IF;
END//
DELIMITER ;

-- Dumping structure for procedure test_kyc.update_user_password
DELIMITER //
CREATE PROCEDURE `update_user_password`(
	IN `p_name` VARCHAR(255),
	IN `p_password` VARCHAR(255)
)
BEGIN
	UPDATE users SET password = p_password WHERE name = p_name AND is_deleted = 0;
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not found';
    END IF;
END//
DELIMITER ;

-- Dumping structure for table test_kyc.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.users: ~5 rows (approximately)
INSERT INTO `users` (`id`, `name`, `password`, `is_deleted`, `createdAt`) VALUES
	(49, 'test01', '$2b$10$/Y3W6h.76dLjTUUayhuUZu7CDtmWsk2VmdXJgD.g.yhO4SO1zXd7O', 0, '2026-03-12 07:23:42.000000'),
	(50, 'test2', '$2b$10$Zcn3LND64d78CY2IHR95Ru0.EqrNxgmzGrfRozic4CY4fJ1O/qbq6', 0, '2026-03-12 07:23:58.000000'),
	(52, 'test3', '$2b$10$3BsarFrtw1FhgL5v4ECyU.1PYh4Dns99GiZ1I2dQCUvQ/f36kIWnK', 0, '2026-03-13 06:42:30.000000'),
	(62, 'test', '$2b$10$nBm4aBdOxJfxviIQyCaLPOSNeveyj2ljtb9GCFKYrwZdgmMqqU./m', 0, '2026-03-13 08:37:18.000000'),
	(63, 'test21', '$2b$10$ef2/gYPDd9FMXqoy0owHdugAprs0.sXrB1uaf59wEi7LuzrY1Ma1.', 0, '2026-03-19 05:29:39.000000');

-- Dumping structure for table test_kyc.user_attachment
CREATE TABLE IF NOT EXISTS `user_attachment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- Dumping data for table test_kyc.user_attachment: ~36 rows (approximately)
INSERT INTO `user_attachment` (`id`, `name`, `file_name`, `file_path`, `created_at`) VALUES
	(1, 'Screenshot 2026-03-05 155757.png', '5e38a30d-f3df-40f7-8047-ffb9f453a399.png', 'C:\\xampp\\htdocs\\attachment\\5e38a30d-f3df-40f7-8047-ffb9f453a399.png', '2026-03-11 05:16:41.274221'),
	(2, 'test.png', 'f1b5be51-ba29-4674-9cc9-d92ee010ec7b.png', 'C:\\xampp\\htdocs\\attachment\\f1b5be51-ba29-4674-9cc9-d92ee010ec7b.png', '2026-03-11 05:31:40.223993'),
	(3, 'test.png', '9b8d65b1-1f6e-43bd-9cd4-f5e2db26b62f.png', 'C:\\xampp\\htdocs\\attachment\\9b8d65b1-1f6e-43bd-9cd4-f5e2db26b62f.png', '2026-03-11 05:34:32.232979'),
	(4, 'test.png', '12e9151a-0550-4a5b-8cf2-70d0aa453c1f.png', 'C:\\xampp\\htdocs\\attachment\\12e9151a-0550-4a5b-8cf2-70d0aa453c1f.png', '2026-03-11 05:44:12.998887'),
	(5, 'test.png', '0431e734-024c-4576-aaa3-422f869e3ab0.png', 'C:\\xampp\\htdocs\\attachment\\0431e734-024c-4576-aaa3-422f869e3ab0.png', '2026-03-11 05:54:58.737877'),
	(6, 'test.png', '6abbca10-85b3-456e-9fea-6c164f69920e.png', 'C:\\xampp\\htdocs\\attachment\\6abbca10-85b3-456e-9fea-6c164f69920e.png', '2026-03-11 05:56:10.917909'),
	(7, 'testname', '0d388795-6398-463c-9fbc-cc0d0a0f1cac.png', 'C:\\xampp\\htdocs\\attachment\\0d388795-6398-463c-9fbc-cc0d0a0f1cac.png', '2026-03-11 06:09:18.018898'),
	(8, 'testname1', 'd0cb5690-ebcb-4f80-a8bf-236a4573c560.png', 'C:\\xampp\\htdocs\\attachment\\d0cb5690-ebcb-4f80-a8bf-236a4573c560.png', '2026-03-11 06:20:31.149438'),
	(9, '', '785a482f-0601-4c67-8a9b-36956b835c37.png', 'C:\\xampp\\htdocs\\attachment\\785a482f-0601-4c67-8a9b-36956b835c37.png', '2026-03-11 06:20:36.251754'),
	(10, 'testtest', 'af71bbce-2e04-4984-bfbc-c2b91a2aa13e.png', 'C:\\xampp\\htdocs\\attachment\\af71bbce-2e04-4984-bfbc-c2b91a2aa13e.png', '2026-03-11 06:37:23.902947'),
	(11, 'test', 'f4ad03fc-62a7-4b3b-a27a-751ce8be6a0c.png', 'C:\\xampp\\htdocs\\attachment\\f4ad03fc-62a7-4b3b-a27a-751ce8be6a0c.png', '2026-03-11 06:48:43.986368'),
	(12, 'asdasdas', 'ff7ecd99-7aab-4cec-92b0-d3a45d2c883d.png', 'C:\\xampp\\htdocs\\attachment\\ff7ecd99-7aab-4cec-92b0-d3a45d2c883d.png', '2026-03-11 06:49:08.933646'),
	(13, 'asdasdas', 'eb9ac940-e1c1-4091-8c6b-fef7fce04e13.png', 'C:\\xampp\\htdocs\\attachment\\eb9ac940-e1c1-4091-8c6b-fef7fce04e13.png', '2026-03-11 06:52:51.080324'),
	(14, 'edward', '6675e63d-18a7-4898-ba69-6182e0363b89.png', 'C:\\xampp\\htdocs\\attachment\\6675e63d-18a7-4898-ba69-6182e0363b89.png', '2026-03-11 07:26:37.995428'),
	(15, 'edward', '48e9d04f-b4fd-4598-9235-130eabe04e3c.png', 'C:\\xampp\\htdocs\\attachment\\48e9d04f-b4fd-4598-9235-130eabe04e3c.png', '2026-03-11 07:44:51.756698'),
	(16, 'edward', 'ddcaa402-282e-4221-82b4-7761d4d19412.png', 'C:\\xampp\\htdocs\\attachment\\ddcaa402-282e-4221-82b4-7761d4d19412.png', '2026-03-11 07:49:50.068823'),
	(17, 'edward', '7df3229e-1ca0-4d3c-8541-bb52eaafa224.png', 'C:\\xampp\\htdocs\\attachment\\7df3229e-1ca0-4d3c-8541-bb52eaafa224.png', '2026-03-11 07:50:09.661235'),
	(18, 'edward', '82db3e5f-e390-4bb0-8bec-e8160fbff133.png', 'C:\\xampp\\htdocs\\attachment\\82db3e5f-e390-4bb0-8bec-e8160fbff133.png', '2026-03-11 07:53:16.682198'),
	(19, 'edward', '2afd781a-5e01-4868-b1e9-8c844e55e6d9.png', 'C:\\xampp\\htdocs\\attachment\\2afd781a-5e01-4868-b1e9-8c844e55e6d9.png', '2026-03-11 07:54:06.005343'),
	(20, 'edward', 'c796af20-b1c4-4f80-92fd-d7e66fda5ff1.png', 'C:\\xampp\\htdocs\\attachment\\c796af20-b1c4-4f80-92fd-d7e66fda5ff1.png', '2026-03-11 07:54:22.069860'),
	(21, 'edward', 'e482765f-7244-430a-be19-05ef952a2cde.png', 'C:\\xampp\\htdocs\\attachment\\e482765f-7244-430a-be19-05ef952a2cde.png', '2026-03-11 07:56:43.374088'),
	(22, 'edward', '1601479f-f523-4a62-9729-5ce42e800a9d.png', 'C:\\xampp\\htdocs\\attachment\\1601479f-f523-4a62-9729-5ce42e800a9d.png', '2026-03-11 07:56:57.561159'),
	(23, 'edward', 'd9a6a915-6841-464c-b28c-27f0a1792ef4.png', 'C:\\xampp\\htdocs\\attachment\\d9a6a915-6841-464c-b28c-27f0a1792ef4.png', '2026-03-11 07:59:35.079597'),
	(24, 'edward', 'ba24e046-cfef-4e85-a5a7-e876af7acc63.png', 'C:\\xampp\\htdocs\\attachment\\ba24e046-cfef-4e85-a5a7-e876af7acc63.png', '2026-03-11 08:01:54.440263'),
	(25, 'edward', '4155fed9-41e1-4b8b-a22f-1464ac610372.png', 'C:\\xampp\\htdocs\\attachment\\4155fed9-41e1-4b8b-a22f-1464ac610372.png', '2026-03-11 08:01:58.201132'),
	(26, 'edward', '83e9309b-969a-4a45-ae65-7f101fbfaa93.png', 'C:\\xampp\\htdocs\\attachment\\83e9309b-969a-4a45-ae65-7f101fbfaa93.png', '2026-03-11 08:04:03.639548'),
	(27, 'edward', '89196370-f635-47d8-a0aa-12da2e7c0d89.png', 'C:\\xampp\\htdocs\\attachment\\89196370-f635-47d8-a0aa-12da2e7c0d89.png', '2026-03-11 08:04:37.150661'),
	(28, 'asdasdas', '582b8f1b-99c3-4cfe-aa71-354705f3c31d.png', 'C:\\xampp\\htdocs\\attachment\\582b8f1b-99c3-4cfe-aa71-354705f3c31d.png', '2026-03-11 08:05:53.312876'),
	(29, 'dsfsdfsdf', 'ad800611-904e-45bf-84ee-78b885d76e63.png', 'C:\\xampp\\htdocs\\attachment\\ad800611-904e-45bf-84ee-78b885d76e63.png', '2026-03-11 08:09:50.140141'),
	(30, 'newtest', 'f257e29f-94c4-4312-871f-d91fd4b1871e.png', 'C:\\xampp\\htdocs\\attachment\\f257e29f-94c4-4312-871f-d91fd4b1871e.png', '2026-03-11 08:21:46.891315'),
	(31, 'asdasdas', '3397b014-3773-4368-8b40-1fcf2ba42d59.png', 'attachment/3397b014-3773-4368-8b40-1fcf2ba42d59.png', '2026-03-11 08:26:57.287113'),
	(32, 'newtest', 'dbcf8404-867b-40ab-9a34-0dbb996fdc15.png', 'attachment/dbcf8404-867b-40ab-9a34-0dbb996fdc15.png', '2026-03-11 08:27:12.983004'),
	(33, 'newtest', 'd24a5ae3-e0c4-4eee-ae9b-0685cbeb6fdb.png', 'attachment/d24a5ae3-e0c4-4eee-ae9b-0685cbeb6fdb.png', '2026-03-11 08:27:35.573530'),
	(34, '123123', 'c6f72471-a248-4c73-86e6-b85a25f2688e.png', 'attachment/c6f72471-a248-4c73-86e6-b85a25f2688e.png', '2026-03-13 05:53:29.754355'),
	(35, '123123', 'e79d9d16-407f-4189-9698-fbf5df4ecc9f.png', 'attachment/e79d9d16-407f-4189-9698-fbf5df4ecc9f.png', '2026-03-16 01:28:17.712763'),
	(36, 'try', '1a01f028-ae02-4a43-b449-f724e0bff826.png', 'attachment/1a01f028-ae02-4a43-b449-f724e0bff826.png', '2026-03-16 01:36:02.936757');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
