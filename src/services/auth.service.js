const userRepository = require('../repositories/User.repository');
const roleRepository = require('../repositories/Role.repository');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');

class AuthService {
  /**
   * Authenticate user and return tokens
   */
  async login(email, password) {
    // 1. Check if user exists (include password for comparison)
    const user = await userRepository.findByEmail(email, true);
    if (!user) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    // 2. Verify password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    // 3. Generate Token
    const payload = user.getJwtPayload();
    const token = this.generateToken(payload);

    // 4. Clean user object before returning (remove password manually just in case)
    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }

  /**
   * Fetch authenticated user details based on token payload
   */
  async getMe(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User no longer exists');
    }
    return user;
  }

  /**
   * Generate JWT
   * For the MVP, we are not using a DB-stored refresh token.
   * Standard stateless JWT authentication.
   */
  generateToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }
}

module.exports = new AuthService();
