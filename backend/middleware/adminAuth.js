import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user has admin role (either hardcoded admin or database admin)
      if (decoded.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required."
        });
      }
      
      req.user = decoded;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export default adminAuth;