import { Sequelize } from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(config.database, config.user, config.pass, {
    host: config.host,
    port: config.port,
    dialect: config.dialect, // tên CSDL đang sử dụng
});

export default sequelize;
