import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // Decode the token to get user info
      const decodedToken = jwt.decode(token);
      setUser(decodedToken);
    }
  }, [router]);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
