## API for Player vs Player (PvP) Game.

## How to run project 
    1. NPM Install
    2. ``npm run start``

## Feature
    1. User Auth (Register, login)
    2. Unique shark for each user
    3. Training API
    4. PVP API
    5. Leaderboard API 
    6. Some basic get and Delete user API.

## Some stuff to note
    Because i use mongo atlas as mydatabase not local machine, so when running this app going to need setting .env to my database

    Someof the code in utils like APIFeature, appError, and catchAsync i take it from my nodejs course that i learn before, but i dont think every developer using the same method, but right now thats the easiest way for me right now. 

## .ENV conf
    NODE_ENV =deveploment
    PORT = 8000
    USER = somepoeple
    DATABASE_PASSWORD=1YMOj6UTGc38rqu9
    DATABASE=mongodb+srv://wewe25:<PASSWORD>@fortesting.ve7bj.mongodb.net/sharkpvp?retryWrites=true&w=majority
    mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false


    JWT_SECRET=aBai23pqi4p9q4pihvnpa984q34upahs
    JWT_EXPIRES_IN=90d
    JWT_COOKIES_EXPIRES_IN=90

    
    Just copy and paste the to config.env
## Time to complete 
    Initial git 03/19/2022 12:11 PM Local Time , Time finished (Before push to git) 03/20/2022 12:24 AM Local Time
    with around 2 Hours break in total. 

## How to Login and Signup
    Because we need to send encrypted data when login/signup , this is how to do it with postman : 
        ```var CryptoJS = require("crypto-js");

            var secretKey = '0901cnu23013mc409123m0'

            var data = {
                "username": "User9",
                "password": "Tester1234"
            };

            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

            // Set local variables to postman
            pm.variables.set("encrypted", ciphertext); ```
    
    At pre-request script put above code and and on the body put :
        ``` {
                "encrypted": "{{encrypted}}"
            } ```
    So the data will be read as body.encrypted later at the backend. 

    Note : the secret key is just me smashing the keyboard , just make sure the secret key had the same value for both postman and node js





## Postman documentation
    Note : need to be logged in to access other API route
    Delete user : http://localhost:8000/api/v1/auth/:id DELETE
                    NOTE: I dont put any user restrict or verification, so any can use this API. 
    Get Own Shark : http://localhost:8000/api/v1/shark GET
                    NOTE : need to be logged in
    Get Shark by ID : http://localhost:8000/api/v1/shark/:id GET
    Get top 5 Sharks : http://localhost:8000/api/v1/shark/top-5-sharks GET
    Training shark : http://localhost:8000/api/v1/training 
                        body: {
                            "target": "int"
                        }
    PVP : http://localhost:8000/api/v1/pvp/ POST
            body :{
                "playerOneId": "62360f1fe69c394c6325769d",
                "playerTwoId": "62360c05d2e9814d9ce24f82"
            }
    Get battles by userId : http://localhost:8000/api/v1/pvp/:id GET
    Get own battles list : http://localhost:8000/api/v1/pvp GET



