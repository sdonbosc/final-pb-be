const jwt = require('jsonwebtoken');
const jwtKey = 'secret_key!@#$%^&*()';
const jwtExpirySeconds = '30m';

const sign = (username,userid) => {
  
    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const token = jwt.sign({ username: username, userid:userid}, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds
    })
    console.log('token:', token);
    return token;
  }

  
const verify = (req, res, next) => {
    const token=req.headers.authorization;
    console.log(token);
    // if the cookie is not set, return an unauthorized error
    if (!token) {
      return res.status(401).end("not authorised");
    }
  
    var payload
    try {
      // Parse the JWT string and store the result in `payload`.
      // Note that we are passing the key in this method as well. This method will throw an error
      // if the token is invalid (if it has expired according to the expiry time we set on sign in),
      // or if the signature does not match
      payload = jwt.verify(token, jwtKey);
      console.log("Payload ");
      console.log(payload );
      console.log("PL");
      req.body.userid=payload.userid;
      next();
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        // if the error thrown is because the JWT is unauthorized, return a 401 error
        return res.status(401).end();
      }
      // otherwise, return a bad request error
      return res.status(400).end();
    }
  }

const refresh = (req, res) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).end();
    }

    var payload
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    }
    // (END) The code uptil this point is the same as the first part of the `welcome` route
    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign({ username: payload.username, userid: payload.userid }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    });

    console.log(newToken);
    return newToken;
}
  module.exports = {sign,verify,refresh}
