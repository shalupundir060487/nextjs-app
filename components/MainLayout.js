// components/MainLayout.js
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function MainLayout({ children }) {
  const router = useRouter();
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">BizFlow </Link>
        </div>
        <nav>
          <Link href="/profile" className="mr-4">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}


