const { Token } = require("../util/auth");
const admin = require('../modules/admin/model');

const jwt_decoder = async (req, res, next) => {
    let auth = req.header('Authorization');
    if (!auth)
        return next();
    auth = auth.split('Bearer ');
    if (auth.length != 2)
        return next();
    auth = auth[1];
    const token = Token.decode(auth);
    if (!token)
        return next();
    req.auth = token;
    next();
}

const client = async (req, res, next) => {
    const { auth } = req;
    if (!auth)
        return next();
    const { _id,type} = auth;
    if (!_id)
        return next();
    let _client = null;
    if(type == 'admin')
    _client = await admin.findById(_id);
    if (!_client)
        return next();
    if(_client.active == false)
        return next();
    req._client = _client;
    req._client_type = type;
    return next();
}

const auth_allow = (rules)=>{
    return async (req, res, next) => {
        const { _client,_client_type,method,body,query,locale} = req;
        let params = method == "POST" ? body : query;
        if (!_client)
            return res.status(401).send(locale("requires_login"));
        if(!rules[_client_type])
            return res.status(403).send(locale("unauthorized"));
        if(rules[_client_type] === true)
            return next();
        if(rules[_client_type] === "self" && params._id+`` ===  _client._id+``)
            return next();
        return res.status(403).send(locale("unauthorized"));
    }
}


module.exports =  {jwt_decoder,auth_allow,client};