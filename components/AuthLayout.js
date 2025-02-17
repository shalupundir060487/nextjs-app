// components/AuthLayout.js
export default function AuthLayout({ children }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
          {children}
        </div>
      </div>
    );
  }
  