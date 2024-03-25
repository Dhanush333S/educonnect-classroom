-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: educonnect
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userType` varchar(255) DEFAULT 'admin',
  `adminID` bigint NOT NULL,
  `adminName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `mobile` bigint DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `adminID` (`adminID`),
  UNIQUE KEY `adminName` (`adminName`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin',1709269557533,'Dhanush','dha3102003@gmail.com','123456','Male','2003-03-10',20,1234567890,'Bangalore','B E','https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg'),(2,'admin',1710056221854,'Hitler','mafej17123@sfpixel.com','123456','Male','1990-12-04',33,1234567890,'Near RV ','MD BE Btech','https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doubt`
--

DROP TABLE IF EXISTS `doubt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doubt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class` varchar(255) DEFAULT NULL,
  `studentID` int DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `teacherID` int DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `studentID` (`studentID`),
  KEY `teacherID` (`teacherID`),
  CONSTRAINT `doubt_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`id`) ON DELETE CASCADE,
  CONSTRAINT `doubt_ibfk_2` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doubt`
--

LOCK TABLES `doubt` WRITE;
/*!40000 ALTER TABLE `doubt` DISABLE KEYS */;
INSERT INTO `doubt` VALUES (1,'5',1,'Physics',1,'What is H20 ?','2024-03-09 15:21:31'),(2,'5',1,'Chemistry',1,'What is Kinetic Energy ?','2024-03-09 15:27:31'),(4,'8',1,'Physics',2,'What is 4*4 ?','2024-03-10 00:00:00'),(9,'5',1,'Chemistry',1,'What is 2+2?','2024-03-11 12:14:13'),(11,'7',1,'Physics',1,'What is potential energy ?','2024-03-12 00:00:00');
/*!40000 ALTER TABLE `doubt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gradeschema`
--

DROP TABLE IF EXISTS `gradeschema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gradeschema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grade` varchar(255) NOT NULL,
  `minMarks` int NOT NULL,
  `maxMarks` int NOT NULL,
  `details` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `grade` (`grade`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gradeschema`
--

LOCK TABLES `gradeschema` WRITE;
/*!40000 ALTER TABLE `gradeschema` DISABLE KEYS */;
INSERT INTO `gradeschema` VALUES (1,'A',90,100,'Excellent'),(2,'B',80,89,'Very Good'),(3,'C',70,79,'Good'),(4,'D',60,69,'Satisfactory'),(5,'F',0,59,'Fail');
/*!40000 ALTER TABLE `gradeschema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manage`
--

DROP TABLE IF EXISTS `manage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manage` (
  `studentID` int NOT NULL,
  `teacherID` int NOT NULL,
  PRIMARY KEY (`studentID`,`teacherID`),
  KEY `teacherID` (`teacherID`),
  CONSTRAINT `manage_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`id`) ON DELETE CASCADE,
  CONSTRAINT `manage_ibfk_2` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manage`
--

LOCK TABLES `manage` WRITE;
/*!40000 ALTER TABLE `manage` DISABLE KEYS */;
INSERT INTO `manage` VALUES (1,1),(2,1),(2,2),(3,2);
/*!40000 ALTER TABLE `manage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `details` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'Due to Holi Holiday has been declared','Holiday Declaration !!','2024-03-09 11:10:02'),(2,'Due to Holi Holiday has been declared','Holiday Declaration !!','2024-03-01 06:48:14'),(3,'Due to Holi Holiday has been declared','Holiday Declaration !!','2024-03-01 00:00:00'),(4,'Need to evacuate','Gun Fire','2024-03-09 12:33:03'),(5,'Tomorrow test will be held','Test Commencement','2024-03-10 00:00:00'),(6,'Tomorrow is Internals','Alert Internals','2024-03-13 00:00:00');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionpaper`
--

DROP TABLE IF EXISTS `questionpaper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionpaper` (
  `id` int NOT NULL AUTO_INCREMENT,
  `testID` bigint NOT NULL,
  `subject` varchar(255) NOT NULL,
  `questionNumber` int NOT NULL,
  `marksAllotted` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_question` (`testID`,`questionNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionpaper`
--

LOCK TABLES `questionpaper` WRITE;
/*!40000 ALTER TABLE `questionpaper` DISABLE KEYS */;
INSERT INTO `questionpaper` VALUES (10,1234567,'Math',1,5),(11,1234567,'Math',2,5),(12,1234567,'Math',3,4),(13,1234567,'Math',5,6),(14,1234567,'Math',4,6),(15,1234567,'Math',6,4),(16,23456,'Physics',1,5),(17,23456,'Physics',3,4),(18,23456,'Physics',4,6),(19,23456,'Physics',2,5);
/*!40000 ALTER TABLE `questionpaper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solveddoubts`
--

DROP TABLE IF EXISTS `solveddoubts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solveddoubts` (
  `doubtID` int NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`doubtID`),
  CONSTRAINT `solveddoubts_ibfk_1` FOREIGN KEY (`doubtID`) REFERENCES `doubt` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solveddoubts`
--

LOCK TABLES `solveddoubts` WRITE;
/*!40000 ALTER TABLE `solveddoubts` DISABLE KEYS */;
INSERT INTO `solveddoubts` VALUES (1,'It is water\'s chemical formula'),(11,'It is energy stored in body');
/*!40000 ALTER TABLE `solveddoubts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userType` varchar(255) DEFAULT 'student',
  `studentID` bigint NOT NULL,
  `studentName` varchar(255) DEFAULT NULL,
  `mobile` bigint DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg',
  `details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `studentID` (`studentID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'student',1709299112629,'Ram',9876543210,'ssdhanush.cs21@rvce.edu.in','123456',13,'female','2010-10-31','Bengaluru','5','https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg','Brave Enthusiastic'),(2,'student',1710056325477,'Hari',123467890,'mafej17123@sfpixel.com','123456',21,'Male','2002-10-02','Near RV ','7','https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg','Bad Boy'),(3,'student',1710253028432,'Rajesh',1234567890,'dosafow737@fryshare.com','123456',20,'Male','2003-12-09','Near RV ','8','https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg','Rajesh Eat 5 star do nothing');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userType` varchar(255) DEFAULT 'teacher',
  `teacherID` bigint NOT NULL,
  `teacherName` varchar(255) DEFAULT NULL,
  `mobile` bigint DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT 'https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg',
  `details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacherID` (`teacherID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'teacher',1709300309004,'M. Visvesvaraya',9876123450,'dhanush.placements333@gmail.com','123456',41,'male','1982-12-08','Mysore','Engineering','https://img.etimg.com/thumb/msid-60528918,width-640,height-480,imgsize-61859,resizemode-4/the-father-of-indian-engineering.jpg','A great man'),(2,'teacher',1709982549957,'C V Raman',1234567890,'rvce@gmail.com','123456',41,'male','1982-12-09','Mysore','Engineering','https://akm-img-a-in.tosshub.com/indiatoday/images/story/202111/raman_647_110716100405_1200x768.jpeg?size=1200:675','A great man'),(10,'teacher',1710056445587,'Radhakrishnan',123467890,'mafej17123@sfpixel.com','123456',33,'Male','1990-10-02','Near RV ','MD BE Btech','https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg','Good Teacher');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacherassignment`
--

DROP TABLE IF EXISTS `teacherassignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacherassignment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacherID` int DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherID` (`teacherID`),
  CONSTRAINT `teacherassignment_ibfk_1` FOREIGN KEY (`teacherID`) REFERENCES `teacher` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacherassignment`
--

LOCK TABLES `teacherassignment` WRITE;
/*!40000 ALTER TABLE `teacherassignment` DISABLE KEYS */;
INSERT INTO `teacherassignment` VALUES (1,1,'5','Math'),(2,2,'5','Physics'),(3,1,'5','Science'),(8,1,'7','Physics'),(9,1,'6','General');
/*!40000 ALTER TABLE `teacherassignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testresults`
--

DROP TABLE IF EXISTS `testresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testresults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentID` bigint NOT NULL,
  `testID` bigint NOT NULL,
  `questionNumber` int NOT NULL,
  `marksObtained` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_result` (`studentID`,`testID`,`questionNumber`),
  KEY `testID` (`testID`,`questionNumber`),
  CONSTRAINT `testresults_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE CASCADE,
  CONSTRAINT `testresults_ibfk_2` FOREIGN KEY (`testID`, `questionNumber`) REFERENCES `questionpaper` (`testID`, `questionNumber`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testresults`
--

LOCK TABLES `testresults` WRITE;
/*!40000 ALTER TABLE `testresults` DISABLE KEYS */;
INSERT INTO `testresults` VALUES (7,1709299112629,1234567,1,5),(8,1709299112629,1234567,5,5),(9,1709299112629,1234567,2,5),(10,1709299112629,1234567,3,3),(11,1709299112629,1234567,4,4),(12,1709299112629,1234567,6,2),(17,1709299112629,23456,1,5),(18,1709299112629,23456,3,3),(19,1709299112629,23456,4,4),(20,1709299112629,23456,2,5);
/*!40000 ALTER TABLE `testresults` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-25 15:21:54
