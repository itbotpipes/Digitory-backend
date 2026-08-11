const authService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');

class AuthController {
  /**
   * Login user
   */
  async login(req, res) {
    const { email, password } = req.body;
    
    // Call service (business logic)
    const { user, token } = await authService.login(email, password);

    // Return response
    res.status(200).json(
      new ApiResponse(200, { user, token }, 'Login successful')
    );
  }

  /**
   * Signup user
   */
  async signup(req, res) {
    const { name, email, password } = req.body;
    
    // Call service (business logic)
    const { user, token } = await authService.signup(name, email, password);

    // Return response
    res.status(201).json(
      new ApiResponse(201, { user, token }, 'Signup successful')
    );
  }

  /**
   * Get current authenticated user
   */
  async getMe(req, res) {
    const userId = req.user.id;
    
    const user = await authService.getMe(userId);

    res.status(200).json(
      new ApiResponse(200, { user }, 'User fetched successfully')
    );
  }
}

module.exports = new AuthController();
