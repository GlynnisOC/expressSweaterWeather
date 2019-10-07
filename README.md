# expressSweaterWeather
Weather forecast API built on Node.js

**Introduction**

Express Sweater Weather is an Express API, utilizing Javascript and Node.js. This project was previously completed in Ruby on Rails, and included additional endpoints than those included in Express Sweater Weather. Currently, this project would be most beneficial to other new developers that are able to interact with it via Postman 3 (an API development tool).

**Initial Setup**

```git clone git@github.com:GlynnisOC/expressSweaterWeather.git```<br>
```cd expressSweaterWeather```<br>
```psql```<br>

The 'psql' command will display your postgres username, which you will need for the config.json file in the application. Open config.json and in 'development', 'test', and 'production', change the username to your postgres username. Also, be sure that 'dialect' in all three of these areas is set to 'postgres'. Next, set up your environments with:<br>

```npx sequelize db:create```<br>
```npx sequelize db:migrate```<br>

**Interaction**

In order to test the two functional POST endpoints, you will want to open Postman 3 and set up your requests with the following information. 

POST api/v1/users

Select 'Body' to input your data including an email, a password, and password_confirmation as your keys for the body. Enter values for those keys and be sure the password and it's confirmation match precisely. Hit send!

Response should look like:

```Status code: 201
{
  'apiKey': 'jlijemfodaeu239iq3remlju'
  }
```

POST api/v1/sessions

Same as before, select 'Body' to input the email and password from the previous request, with keys and values accordingly. Hit send!

Response should look like:

```Status code: 200
{
  'apiKey': 'jlijemfodaeu239iq3remlju'
  }
```

**Known Issues**

There were additional endpoints requested and one that is currently being worked on (api/v1/forecast?location=denver,co) but due to the developer's lack of experience with Javascript and Node.js, there are some missing pieces of functionality, as well as possible syntax errors. 

**Testing**

In order to test this program, you may need to comment out the forecast.js as it is currently buggy. Once you have completed this, enter

```npm test```

And feel free to add console.log(*variable name here*) in order to inspect what is currently being returned/requested within the code. You will want to begin the test suite again, after halting it with a ctrl+c and beginning it again with 

```npm test```

**Contribution**

Main contributor: Glynnis O'Connell

If you would like to contribute, please fork this repository first and then clone down to your local machine. See what endpoints you can create, submit a pull request, I'd love to see what you do!

**Schema Design**

Only a users table exists in the database, currently. A user has an ID, email, passwordDigest, and apiKey. Upon creating their user account, the password is encrypted into the passwordDigest and an apiKey is generated. 

**Tech Stack**

Express 4.16.1

Babel-Jest 24.9.0

Sequelize 5.19.1

Bcrypt 3.0.6

UUIDV4 5.0.1

