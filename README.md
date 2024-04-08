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

![ByteBazaar User](https://cdn.discordapp.com/attachments/1037567655424569344/1226744517621977240/image.png?ex=6625e1dc&is=66136cdc&hm=9fb0a5cb11f1e0eccfed60eb9639bec04418cffb0e47b1b468e635b70a05d909&)

![user Privileges](https://cdn.discordapp.com/attachments/1037567655424569344/1226744717446873109/image.png?ex=6625e20c&is=66136d0c&hm=807e7e9bc690dcf27d658356c0feb44535ee6e4258dc9b1df6125f8afd28ba3d&)

once the user has been created, proceed to register a new server wiht the name "ByteBazaar"

![new server](https://cdn.discordapp.com/attachments/1037567655424569344/1226745562208927794/image.png?ex=6625e2d5&is=66136dd5&hm=bda080d1a89b9713752b625a52e21cd284075252b7c82d7080686457395ffaa1&)

![Register - Server](https://cdn.discordapp.com/attachments/1037567655424569344/1226745788953137152/image.png?ex=6625e30b&is=66136e0b&hm=688f327b8f589892057a4df548036cd1f13d91df0e8a90b00f876f982784b9ae&)

In connection configure the hostname, in unsername place the user previously created and the password

![connection](https://cdn.discordapp.com/attachments/1037567655424569344/1226747097877975080/image.png?ex=6625e443&is=66136f43&hm=1b7fb3fdd9e7e22920f68466b069787eb08780fbfa98f6828589a0267a8cd63e&)

Finally, proceed to create a new database with the name "bytebazaarDB" in the newly created server instance

![create DB](https://cdn.discordapp.com/attachments/1037567655424569344/1226747124151226428/image.png?ex=6625e44a&is=66136f4a&hm=a073ca712996d440a775d3dc2738f51b441568b388687f92abf741fe407744b4&)

![create DB bytebazaarDB](https://cdn.discordapp.com/attachments/1037567655424569344/1226747479744184402/image.png?ex=6625e49f&is=66136f9f&hm=bfc842bba6417e7b5e20f713308a9a27e678c9a1482d94f032047009641ac58c&)

---

### Sequelize synchronization

As the project is running in a local environment, it is required to manually synchronize the data used in the system, such as users, categories, products, etc.
This action only needs to be performed once!

1. First, in a terminal, located in the project's main folder, execute `npm install` to install all dependecies.

2. Located in the project's main folder, execute `npm run sync` to synchronize all models in the database and insert all used data

---

### Start Project

if you have already performed the previous steps, you can initialize the project by running `npm start` located in the project's main folder. then you can view the project with any browser by visiting http://localhost:4200/
