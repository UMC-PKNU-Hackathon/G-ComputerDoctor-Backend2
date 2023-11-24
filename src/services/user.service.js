import { addUser, confirmUser} from "file:///C:/UMC-Node.js/test3/src/models/user.dao.js";

export const joinUser = async (body) => {
    const joinUserData = await addUser({
        'nickname': body.nickname,
        'personal_id': body.personal_id,
        'password': body.password
    });
    if(joinUserData == -1){
        return joinUserData;
    }else{
        return joinUserData;
    }
}

 export const loginUser = async (body) => {
    const loginUserData = await confirmUser({
        'personal_id': body.personal_id,
        'password' : body.password
    });
    console.log("loginUserData: " ,loginUserData);

    if (loginUserData == -1) {
        return loginUserData;
    } else if((loginUserData == -2)){
        return loginUserData;
    } else {
        return loginUserData;
    }
 }