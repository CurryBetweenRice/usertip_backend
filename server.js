const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./index');

//Stuff To do
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection success'));

//console.log(process.env);

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandler Rejection');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM Recieved, dead');
  server.close(() => {
    console.log('dead already');
  });
});
