# GoBarber Back-End ✂✂🧔🏻

This repository is for the Rocketseat Bootcamp GoStack 11.0 challenge 🚀.

# Proposal

This project is a study of concepts of NodeJs.
The idea is to simulate a fictitious barber shop, providing data with this API for an web and mobile application such as which barbers I can schedule to cut my hair and beard and choose an available time on barber's schedule.

# Technologies Used

NodeJs ⚛️ <br />
Typescript ⌨️ <br />
AWS SES <br />
AWS S3 <br />
Redis <br />
Docker <br />
Ethereal

# Use

To obtain this project, follow the steps:

⚠️ In order to use this project you will need the docker installed in your machine! ⚠️

1. Clone this repository using<code>git clone</code>.

2. Run the <code> yarn </code> command at the root of the cloned project folder to download the dependencies.
3. Run the code <code> docker run --name **name_database_postgres** -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres</code>
4. Install Dbeaver ou similar and create a connection so you can an UI to access the database
5. Run the code <code> docker run --name **name_database_mongodb** -p 27017:27017 -d -t mongo</code>
6. Install mongodb compass community
7. Run the code <code> docker run --name **name_database_redis** -p 6379:6379 -d -t redis alpine</code>
8. Run <code> yarn dev:server </code> at the root of the project folder to start Metro Bundler.
9. Happy Hacking! 🚀

⚠️ To send a reset password using AWS SES you will need an AWS accoiunt and generate a Token to add in your dotenv file ⚠️
