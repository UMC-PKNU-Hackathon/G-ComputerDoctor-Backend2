import { joinUser, loginUser } from 'file:///C:/UMC-Node.js/test3/src/services/user.service.js';
import {createToken, verifyToken, decodeToken, parseToken} from "file:///C:/UMC-Node.js/test3/src/utils/authorize.util.js";
import { StatusCodes } from "http-status-codes";
import dotenv from 'dotenv';

dotenv.config(); 

export const userSignin = async (req, res, next) => {
    const signIn = req.body;
    console.log("회원가입을 요청하였습니다!");
    console.log("body:", signIn); // 값이 잘 들어오는지 테스트
    const signIndata = await joinUser(req.body);
    
    if(signIndata == -1){
        console.log("아이디가 중복 됩니다.");
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "회원가입 실패",
          }); 
    } else{
        console.log("회원 가입 성공");
        return res.status(StatusCodes.OK).json({
            message: "회원가입 성공",
        });
    }
}

export const userLogin = async (req, res, next) => {
    const logIn = req.body;
    console.log("로그인을 요청하였습니다!");
    const loginUserData = await loginUser(req.body);


    console.log(loginUserData);

    if (loginUserData == -1) {
        console.log("존재하지 않는 유저입니다");
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "존재하지 않는 유저입니다" });
    } 
    else if((loginUserData == -2)){
        console.log("비밀번호가 틀렸습니다.");
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "비밀번호가 틀렸습니다." });
    } 
    else {
        console.log(req.body.personal_id);
        const token = createToken(req.body.personal_id);
        console.log("로그인에 성공하였습니다.");
        return res.status(StatusCodes.OK).json({message: "로그인 성공", token});
    }
}