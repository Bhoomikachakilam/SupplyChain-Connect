import jwt from 'jsonwebtoken';
const authenticateUser = (req, res, next) => {
  try {
   const token = req.headers.authorization.split(' ')[1];
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export  { authenticateUser};