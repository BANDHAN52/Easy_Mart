# EasyMart Ecommerce Website

This Node.js project is developed for the Web Technology course at SUST CSE Department. EasyMart is an ecommerce website built using Node.js, Express.js, MongoDB, HTML, CSS, and Bootstrap 5.

## Prerequisites

Before running this project, make sure you have the following software installed on your system:

- [Visual Studio Code](https://code.visualstudio.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)

Ensure that MongoDB is up and running.

## Getting Started

Follow these steps to set up and run the EasyMart ecommerce website:

1. Clone this repository to your local machine.

2. Open the project root folder in Visual Studio Code.

3. Open the terminal within Visual Studio Code.

4. Install project dependencies by running the following command:

   ```bash
   npm install


1. **Start the website server by running:**

    ```bash
    npm start
    ```

    This will start the server on `http://localhost:3000`.

2. A database named `easyMartDB` will be created automatically, and three default products will be inserted into it. Please note that these products cannot be modified or added from the website.

3. **Supplier login credentials are hardcoded:**
   - Email: supplier@gmail.com
   - Password: supplier

4. **Bank account information**, including bank ID, password, and balance, **cannot be inserted from the website**. You should manually insert bank account data into MongoDB.

## Bank Account Schema
To manually insert bank account information, use MongoDB Compass and click the "Insert Document" option.
for transaction , ecommerce site bankaccount number is taken as "111111", supplier account number is taken as "222222". for simplicy, every password should be "123"

The schema for bank account data in MongoDB is as follows:

```javascript
const bankSchema = mongoose.Schema({
  bankAccountNumber: Number,
  bankAccountPassword: String,
  bankAccountBalance: Number,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

