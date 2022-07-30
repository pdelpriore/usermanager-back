import { DataSource } from "typeorm";
import path from "path";

export default new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, "../", "entity", "**", "*.ts")],
});
