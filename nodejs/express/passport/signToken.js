const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('./keys');
const display_console = false;

const namespace = "https://sunzao.us/";// add to env

const signToken = user => {
  return JWT.sign({
    iss: 'sunzao.us',/*can't be a static value*/
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)// current time + 1 day ahead
  }, JWT_SECRET);
}//signToken

const signProjectToken = ({user_id, project_id}) => {
  let sign_data = {
    iss: 'sunzao.us',/*can't be a static value*/
    sub: user_id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)// current time + 1 day ahead
  };

  let project_claim = `${namespace}project_id`;

  sign_data[`${project_claim}`] = project_id;

  return JWT.sign(sign_data, JWT_SECRET);
}//signToken

const verifyToken = (token, raw = false) => {
  let verifier;
  let project_claim = `${namespace}project_id`;
  try {
    verifier = JWT.verify(token, JWT_SECRET);
    if(display_console || false) console.log(`[verifyToken] verifier`,verifier);
  } catch (e) {
    // verifier will still be undefined if error
    console.error(e);
  }

  return (raw) ? verifier : (verifier != undefined) ? { user_id: verifier.sub, project_id: verifier[`${project_claim}`] } : verifier;
}// verifyToken

module.exports = {
  signToken,
  signProjectToken,
  verifyToken
}
