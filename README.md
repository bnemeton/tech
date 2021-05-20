# Tech Blog

## Description

A CMS-style blogging site using a MySQL database, deployed on Heroku using JawsDB. Uses bcrypt, dotenv, express, express-session, express-handlebars, mysql2, and sequelize.

## Usage

The homepage displays all posts in reverse chronological order (most recent first). To view individual posts you need to sign in; you can create an account using the nav link at the top of the site. Once logged in, you should be able to view individual posts and the comments on them. From the dash, you can view your posts and edit them, as well as add new posts. From individual post pages, you should be able to comment. If it's your post you're looking at, you should be able to edit it as well. You can log out using the link in the nav bar.

## Installation

If for some reason you want to run your own instance of this site, you can clone this repository. You'll have to create a .env file with the credentials for the MySQL database you want to use. Then, you should be able to start it by running 'npm run start' in the project directory. If running it locally (rather than deployed to e.g. Heroku) it will run on port 3001.

## Deployed

You can view the deployed app at https://frozen-earth-44297.herokuapp.com/ .
