const emailChecker = (email)=>{
    const emailRegex = 
    /^[a-z|0-9|A-Z]*([_][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*([.][a-z|0-9|A-Z]+)*(([_][a-z|0-9|A-Z]+)*)?@[a-z][a-z|0-9|A-Z]*\.([a-z][a-z|0-9|A-Z]*(\.[a-z][a-z|0-9|A-Z]*)?)$/;
    return emailRegex.test(email.toLowerCase());
}
const passwordChecker = (password)=>{
    //Minimum 5 characters, at least one letter and one number:
    const passwordRegex = 
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}
const numberChecker = (number)=>{
    const numberRegex =
    /^(?:(?:\+|00)88|01)?\d{11}$/;
    return numberRegex.test(number);
}

module.exports = {emailChecker, passwordChecker,numberChecker} 