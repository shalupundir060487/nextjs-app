import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // Fetch users only if the user is an admin
      const decodedToken = jwt.decode(token);
      if (decodedToken.role !== 'admin') {
        router.push('/profile');
      } else {
        fetchUsers();
      }
    }
  }, [router]);

  const fetchUsers = async () => {
    const response = await fetch('/api/admin/users',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
    });
    const data = await response.json();
    setUsers(data);
  };

  return (
    <div className="user-management">
      <div className="sidebar">
        <ul>
          <li>
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/admin/user-management">User Management</a>
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>User Management</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
