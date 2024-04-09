# ByteBazaar

Software construction project midterm assessment

# Instructions for Use

If you want to run this repository in your local machine, you must follow the next steps

## Requirements

- Version **18.20.1** or higher of [Node.Js](https://nodejs.org/en) version is required.
- This repository uses [PostgreSQL](https://www.postgresql.org/) as Database engine. for the installation we use the default DBMS of Postgres **PgAdmin4**
- the project is developed using Angular version 17.3.2, so it is necessary to have angular/cli installed.
  you can install it using npm by executing the following command in some terminal:
  `npm install @angular/cli@17.3.2 -g`

## Installing

In case you have git installed, to clone the repository you can run:

`git clone https://github.com/Juajsia/ByteBazaar.git`

otherwise, you can download the zip file of the project.

---

### Database Creation

First connect with postgres user or another user with superuser privileges, then in Login/Group roles, create new Login/Group

![Create User](https://cdn.discordapp.com/attachments/1037567655424569344/1226744128545624094/image.png?ex=6625e180&is=66136c80&hm=e749501908eb2d94d4422fa7ec301c1c89549eabb8fc56a3f93419f3fcefc7b9&)

the user name is "ByteBazaar", in Definition put the password "1234" and configure the privileges.

![ByteBazaar User](https://cdn.discordapp.com/attachments/1037567655424569344/1227017339954921513/image.png?ex=6626dff2&is=66146af2&hm=4fd72eb7ccb04d363fcde06d8d161b3f66b30ab0603f5df309228b86ebef7d8c&)

![user Privileges](https://cdn.discordapp.com/attachments/1037567655424569344/1227017408871665775/image.png?ex=6626e003&is=66146b03&hm=624d3a076844e8a94aba883fc4bab986fc9793917e794fcf3f8e78904d7ae11d&)

once the user has been created, proceed to register a new server wiht the name "ByteBazaar"

![new server](https://cdn.discordapp.com/attachments/1037567655424569344/1226745562208927794/image.png?ex=6625e2d5&is=66136dd5&hm=bda080d1a89b9713752b625a52e21cd284075252b7c82d7080686457395ffaa1&)

![Register - Server](https://cdn.discordapp.com/attachments/1037567655424569344/1227018162654941225/image.png?ex=6626e0b6&is=66146bb6&hm=6fe9c09f642e3186f7e40682e0a53111ea1002aa11807f05fc4aa369f6bc6196&)

In connection configure the hostname, in unsername place the user previously created and the password

![connection](https://cdn.discordapp.com/attachments/1037567655424569344/1227018216065466521/image.png?ex=6626e0c3&is=66146bc3&hm=efbe0c4445aadc2dd030dbca2368862476a444c10e81cd53bf2c7c7badfa15a2&)

Finally, proceed to create a new database with the name "bytebazaarDB" in the newly created server instance

![create DB](https://cdn.discordapp.com/attachments/1037567655424569344/1226747124151226428/image.png?ex=6625e44a&is=66136f4a&hm=a073ca712996d440a775d3dc2738f51b441568b388687f92abf741fe407744b4&)

![create DB bytebazaarDB](https://cdn.discordapp.com/attachments/1037567655424569344/1227018940404863026/image.png?ex=6626e170&is=66146c70&hm=cd7fce12c181e293c15f5bf322b8c6f25f6ff00806d8ef36bd9231295e3a985d&)

---

### Sequelize synchronization

As the project is running in a local environment, it is required to manually synchronize the data used in the system, such as users, categories, products, etc.
This action only needs to be performed once!

1. First, in a terminal, located in the project's main folder, execute `npm install` to install all dependecies.

2. Located in the project's main folder, execute `npm run sync` to synchronize all models in the database and insert all used data

---

### Start Project

if you have already performed the previous steps, you can initialize the project by running `npm start` located in the project's main folder. then you can view the project with any browser by visiting http://localhost:4200/
