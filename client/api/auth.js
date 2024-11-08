import { GET_ALL_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';

export default function handler(req, res) {
  const { data } = useQuery(GET_ALL_USERS);
  const { userName, password } = req.body;

  // Find matching user
  const matchingUser = data?.users?.find(user => 
    user.userName === userName && user.password === password
  );

  if (!matchingUser) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate token using existing tokenGen utility
  const token = generateToken(matchingUser);
  
  res.status(200).json({ 
    message: 'Login successful',
    token,
    user: {
      id: matchingUser._id,
      userName: matchingUser.userName
    }
  });
}