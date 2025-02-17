import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Connect to the database
      await dbConnect();

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the hashed password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Send token in response
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, please try again' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
