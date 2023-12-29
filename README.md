# Node.js CRUD API 
This is a node js crud application which basically allow you to perfome crud operatins from the db
It uses the express framework and mongo DB togother with mongoose library

# Installation
To install this project you need to have node.js and npm installed on your computer
Then clone this repository to your local machine using this command

           git clone https://github.com/Francis-Yuppie/Nodejs-CRUD.git
     
Next navigate to the project folder and install the required packages using npm 

        npm install
# Usage
       To run this project use the following command
       npm run dev
       NOTE: the main entry file is newServer.js not the server js
# Documentation 
    ---
# Changes
    ---
# OtherInfo
The newServer js is the enrty file wich uses the express framework to create the server
the setver listesn on PORT 3300 you can modify this in .env file
The server.js file it contains source code for the server but not using express framework this file is jut for demo 
     
The files contains comments read them before making any changes into a particular file 
the .env files contains this Const variables 

     ACCES_TOKEN_SECRET = 'set your secret key here'
     REFRESH_TOKEN_SECRET = 'your key'
     NOTE 
For db url i have uses mongo db using Atlas to create my database and collections
Make sure you have visted mongodb.com to create your database and collections before setting this const 
 LINK
 https://cloud.mongodb.com
  
This is optional you can choose to work with your prefered Database

     DATABASE_URI = 'db url'

 
