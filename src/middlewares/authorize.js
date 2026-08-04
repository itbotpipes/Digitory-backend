const ApiError = require('../utils/ApiError');

const authorize = (requiredPermission) => {
  return (req, res, next) => {
    // Structure only. To be implemented fully with DB checks or JWT payload checks later.
    if (!req.user || !req.user.permissions) {
      return next(new ApiError(403, 'Forbidden', [{ field: 'permissions', message: 'No permissions found' }]));
    }
    
    if (!req.user.permissions.includes(requiredPermission)) {
      return next(new ApiError(403, 'Forbidden', [{ field: 'permissions', message: `Missing required permission: ${requiredPermission}` }]));
    }
    
    next();
  };
};

module.exports = authorize;
