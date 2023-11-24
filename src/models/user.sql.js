// models/user.sql.js

export const insertUserSql = "INSERT INTO users (nickname, personal_id, password) VALUES (?, ?, ?);";

export const getUserID = "SELECT * FROM users WHERE id = ?";

export const confirmId = "SELECT EXISTS(SELECT 1 FROM users WHERE personal_id = ?) as isExistId";

export const getUserPassword = "SELECT password FROM users WHERE personal_id = ?";