Buoc 1 setup local:
+ Setup mysql: Download mysql https://www.mysql.com/downloads/ va cai dat theo huong dan tren trang chu
+ Setup database : 
-- CREATE database youguess
-- CREATE TABLE Users (
--   id INT AUTO_INCREMENT PRIMARY KEY,      -- Auto-incrementing ID for each user
--   firstName VARCHAR(32) NOT NULL,         -- First name, up to 32 characters
--   lastName VARCHAR(32) NOT NULL,          -- Last name, up to 32 characters
--   email VARCHAR(64) NOT NULL UNIQUE,      -- Email address, must be unique
--   hash VARCHAR(255) NOT NULL,             -- Hashed password (bcrypt will store hashed values here)
--   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of user creation
--   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Auto-update on changes
-- );
-- CREATE TABLE Tokens (
--   id INT AUTO_INCREMENT PRIMARY KEY,        -- Auto-incrementing ID for each token
--   userId INT NOT NULL,                      -- User ID, a foreign key referencing the Users table
--   refreshToken VARCHAR(250) NOT NULL,       -- The refresh token itself
--   expiresIn VARCHAR(64) NOT NULL,           -- Expiration time of the refresh token
--   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the refresh token was created
--   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Auto-update on changes
--   FOREIGN KEY (userId) REFERENCES Users(id)  -- Foreign key relationship to the Users table
-- );

+ Setup postman :
-- Vui long insert Auth API.postman_collection vao postman

+ Setup nodemodules: chay command line va go 'npm install'

+ Setup Nodejs: Download va cai dat Nodejs https://nodejs.org/en/download/package-manager

+Setup ket noi database: Vui long chinh sua password/username file .env

Buoc 2 run project: 
+ Run project : npm run start
+ Run test: npm run test

Buoc 3 test api :
+Test api auth bang postman sau khi insert collection 
--localhost:3000/api/sign-in : Dang nhap  
--localhost:3000/api/sign-up: Dang ky 
--localhost:3000/api/sign-out: Dang xuat
--localhost:3000/api/refresh-token: Nhan refresh token sau khi accesstoken het han

