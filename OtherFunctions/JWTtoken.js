
var Token = [];
var rToken= [];

const setToken = (value)=>{
    Token.push(value);
}
const setRefreshToken = (value)=>{
    rToken.push(value);
}

const getToken = ()=>{
    return Token;
}
const getRefreshToken = ()=>{
    return rToken;
}

module.exports = {setToken,setRefreshToken,getToken,getRefreshToken}