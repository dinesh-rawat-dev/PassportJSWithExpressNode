# Authentication Using PassportJS in express node.js

PassportJS is a flexible Authentication middleware that allows users to login. PassportJS library is fully customizable and works well with ExpressJS.

It is flexible in the sense that it allows the user for different login strategies such as LocalStrategy (Authentication from your local database), FacebookStrategy, TwitterStrategy, GIT etc.

Please checks the strategies that you can use in passport are as follows:- 

http://passportjs.org/


Different parts in PassportJS
-------------------

Importing the module and using it passport.initialize() and passport.session()
Configuring it for atleast one Authentication strategy and setting serializeUser() and deserializeUser()
methods.
Define a route for actually authenticating the user using passport.authenticate.

Methods in PassportJS:
---------------

1. req.login() 
2. req.logout()
3. req.isAuthenticated()
4. req.isUnAuthenticated()


Starting application
-----------

node app
or
npm start

Installing dependencies
------------

npm install
