import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Not Authorized. Login again." 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Set user with ID and role
    req.user = { 
      id: decoded.id, 
      role: decoded.role,
      email: decoded.email 
    };
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};