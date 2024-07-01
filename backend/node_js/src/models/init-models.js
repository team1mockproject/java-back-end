import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _account from  "./account.js";

export default function initModels(sequelize) {
  const account = _account.init(sequelize, DataTypes);


  return {
    account,
  };
}
