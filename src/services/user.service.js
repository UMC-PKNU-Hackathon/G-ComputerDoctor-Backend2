// user.service.js

if(joinUserData == -1){
    // joinUserData가 -1일 때, if문에 걸려 Error를 뱉게 된다!
throw new BaseError(status.EMAIL_ALREADY_EXIST);
}