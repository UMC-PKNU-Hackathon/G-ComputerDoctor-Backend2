export const signinResponseDTO = (user) => {
    return {
    'nickname': user[0].nickname,
    'personal_id' : user[0].personal_id,
    'password' : user[0].password,
    'gender': user[0].gender,
    'age': user[0].age,
    'name': user[0].nickname,
    'email': user[0].email,
    'coin' : user[0].coin,
    'phone': user[0].phone
    };
}

export const loginResponseDTO = (user) => {
    return {
    'nickname': user[0].nickname,
    'personal_id' : user[0].personal_id,
    'password' : user[0].password,
    'gender': user[0].gender,
    'age': user[0].age,
    'name': user[0].nickname,
    'email': user[0].email,
    'coin' : user[0].coin,
    'phone': user[0].phone
    };
}