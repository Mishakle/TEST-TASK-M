// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    url: "mongodb://localhost:27017/",

    databaseName: "cruddb",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js"
};

module.exports = config;
