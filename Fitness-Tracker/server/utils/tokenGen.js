const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { userId: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}

module.exports = { generateToken };