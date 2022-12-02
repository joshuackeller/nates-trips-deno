import {
  Database,
  DataTypes,
  Model,
  MySQLConnector,
  Relationships,
} from "https://deno.land/x/denodb@v1.1.0/mod.ts";

const connection = new MySQLConnector({
  host: "project-3db.csuto9dkhygk.us-east-1.rds.amazonaws.com",
  username: "admin",
  password: "Password1!",
  database: "nate",
});

const db = new Database(connection);

export class Destination extends Model {
  static table = "destination";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
  };

  static activities() {
    return this.hasMany(Activity);
  }
}

export class Activity extends Model {
  static table = "activity";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  };

  static destinations() {
    return this.hasOne(Destination);
  }

  static pictures() {
    return this.hasMany(Picture);
  }
}

export class Picture extends Model {
  static table = "picture";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    url: DataTypes.STRING,
  };

  static activity() {
    return this.hasOne(Activity);
  }
}

Relationships.belongsTo(Activity, Destination);
Relationships.belongsTo(Picture, Activity);

db.link([Destination, Activity, Picture]);

export default db;
