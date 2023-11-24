// models/user.dao.js

import { pool } from "file:///C:/UMC-Node.js/test3/config/db.connect.js";
import { BaseError } from "file:///C:/UMC-Node.js/test3/config/error.js";
import { status } from "file:///C:/UMC-Node.js/test3/config/response.status.js";
import {confirmId, getUserID, insertUserSql, getUserPassword } from "file:///C:/UMC-Node.js/test3/src/models/user.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmId, data.personal_id);
        
        if(confirm[0].isExistId){
            conn.release();
            return -1;
        }
        
        const result = await pool.query(insertUserSql, [data.nickname, data.personal_id, data.password]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        console.log('user: ', user); // 제대로 가져왔는지 확인

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return user;
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const confirmUser = async (data) => {
    try{
        const conn = await pool.getConnection();
        
        const [confirm] = await pool.query(confirmId, data.personal_id);
        
        if(confirm[0].isExistId == 0){
            conn.release();
            return -1;
        }
        
        const [password] = await pool.query(getUserPassword, data.personal_id);
        
        conn.release();

        if(password[0].password != data.password)
            return -2;
        else
            return 0;
        
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}