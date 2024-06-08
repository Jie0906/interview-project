const app = require('./app');
const db = require('./models/index');

const startServer = async () => {
  try {
    await db.sequelize.sync();
    console.log("DB is connected.");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, "0.0.0.0", () => console.log(`Server is running on port ${PORT}.`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();