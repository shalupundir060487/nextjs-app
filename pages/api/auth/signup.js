import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Connect to the database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user
    try {
      await newUser.save();
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
