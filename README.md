# Piquante secure api

This repository is a backend server.
It's a website where users share « sauces ».

## Screenshots

<div align="center">
    <img src="https://github.com/julienlechat/piquante-secure-api/blob/main/screenshots/add.png?raw=true" height="280px"</img>
    <img height="0" width="8px">
    <img src="https://github.com/julienlechat/piquante-secure-api/blob/main/screenshots/home.png?raw=true" height="280px"</img>
</div><br />
<div align="center">
  <img src="https://github.com/julienlechat/piquante-secure-api/blob/main/screenshots/login.png?raw=true" height="280px"</img>
  <img height="0" width="8px">
    <img src="https://github.com/julienlechat/piquante-secure-api/blob/main/screenshots/sauce.png?raw=true" height="280px"</img>
</div>


## Requirements

- [Node.js](https://nodejs.org/fr/download/releases/) v.14.15.1

- [Front-end](https://github.com/OpenClassrooms-Student-Center/dwj-projet6)

- MongoDB (Download or use mongoDB Atlas)


## Install

Execute

```Shell
mkdir <FOLDER_NAME>
cd <FOLDER_NAME>
git clone https://github.com/julienlechat/piquante-secure-api.git
cd piquante-secure-api
npm install
```

# Configure database

Edit the app.js file on line 9

```Shell
mongoose.connect('<ADDRESS_MONGODB_HERE>',
```

## Run

to run back-end server, execute :

```Shell
node server.js
```

now you will start front-end server

Go to `http://localhost:4200/`.

The app will automatically reload if you change any of the source files.
