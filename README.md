# ORM E-Commerce Back-End

The E-Commerce Back-End is an Express.js API that uses Sequelize to interact with a MySQL database. This project provides the fundamental architecture of e-commerce sites and is designed for businesses of all sizes.

## About The Project

The E-Commerce Back-End provides a suite of services to manage categories, products, and tags. This API can be used to create, read, update, and delete data in the database. The project uses Sequelize as an ORM to interact with the MySQL database.

## Built With
* Express.js
* Sequelize
* MySQL
* JavaScript
* Node.js

## Getting Started

To get started with the E-Commerce Back-End, follow these steps:

1. Clone this repository: git clone https://github.com/andrewbreytenbach/orm-ecommerce-backend.git
2. Change to the project directory: cd e-commerce-back-end
3. Install dependencies: npm install
4. Create a .env file and add your database name, MySQL username, and MySQL password in the following format: DB_NAME='ecommerce_db' DB_USER='root' DB_PW='your_password_here'
5. Run the database schema and seed commands: source db/schema.sql && npm run seed
6. Start the server: npm start
7. Open Insomnia Core and test the API endpoints

## Usage

Once the server is started, you can use the following API endpoints:

* /api/categories - GET, POST
* /api/categories/:id - GET, PUT, DELETE
* /api/products - GET, POST
* /api/products/:id - GET, PUT, DELETE
* /api/tags - GET, POST
* /api/tags/:id - GET, PUT, DELETE

![Image 1](/images/image-1.png)

To test the API endpoints, you can use a tool like Insomnia Core. The API endpoints return data in formatted JSON.

Here is an image displaying how to locate a single api endpoint in Insomnia Core.

![Image 2](/images/image-2.png)

Here is an image displaying how to delete an api endpoint in Insomnia Core.

![Image 2](/images/image-3.png)

## Walkthrough Video

View a video walkthrough here: [https://drive.google.com/file/d/1EdCCuNhrdmMZ69hH_AW-7AOgdEH2QhGQ/view] (E-Commerce Back-End Walkthrough)

## Contact

* [https://github.com/andrewbreytenbach] (Andrew Breytenbach)

## Acknowledgments
* [https://expressjs.com/] (Express.js)
* [https://sequelize.org/] (Sequelize)
* [https://www.mysql.com/] (MySQL)
* [https://www.npmjs.com/package/dotenv] (dotenv)
* [https://www.npmjs.com/package/mysql2] (mysql2)
* [https://www.npmjs.com/package/sequelize] (sequelize)
* [https://www.npmjs.com/package/insomnia] (Insomnia)
* [https://github.com/coding-boot-camp/fantastic-umbrella] (Starter Code)
