import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
console.log('JWT_SECRET',JWT_SECRET);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(authorization.split(' ')[1], JWT_SECRET);
      
      // Check if user is admin
      if (decodedToken.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }

      await dbConnect();
      
      // Fetch all users
      const users = await User.find({});
      
      res.status(200).json(users);
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
