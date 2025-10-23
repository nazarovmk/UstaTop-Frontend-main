import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();

  // ⏳ AuthContext hali yuklanmoqda (localStorage tekshirilmoqda)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Yuklanmoqda...
      </div>
    );
  }

  // ❌ Agar foydalanuvchi login qilmagan bo‘lsa → login sahifasiga yo‘naltirish
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Agar login bo‘lgan bo‘lsa → sahifani ko‘rsatish
  return children;
};

export default ProtectedRoute;
