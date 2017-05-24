# trailblazer

A pragmatic implementation of TrailsJS for rapid development

Loosely based on a SailsJS workflow

## Features
* Automatic reloading
* Built in oAuth and Registration
* Automatic API documentation with swagger
* Custom responses
* Super swag error handling
* Automatic endpoint creation with footprints
* Express for the server
* Waterline for the ORM
* Super efficient docker support

## Setup

1. Install dependencies and initialize project

  ```
  npm install -g nodemon
  git clone git@github.com:jamrizzi/trails-imo.git
  cd trails-imo && npm install
  ```
    
2. Start the database

  ```
  npm run database
  ```
  
3. In another terminal start trailblazer

  ```
  npm start
  ```

## Build

```
npm run build
```
