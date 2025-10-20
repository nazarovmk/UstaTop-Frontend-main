// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ElonJoylash from "./pages/ElonJoylash";
import PersonalInformation from "./pages/profile/PersonalInformation";
import Elons from "./pages/profile/Elons";
import FavoriteAds from "./pages/profile/FavoriteAds";
import Tariffs from "./pages/profile/Tariffs";
import ElonKorish from "./ElonKorish";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BizHaqimizda from "./pages/footerAbout/BizHaqimizda";
import ElonBeruvchilargaBagishlangan from "./pages/footerAbout/ElonBeruvchilargaBagishlangan";
import ElonjoylashtirishQoidalari from "./pages/footerAbout/ElonjoylashtirishQoidalari";
import HamkorlikUchun from "./pages/footerAbout/HamkorlikUchun";
import QollabQuvvatlash from "./pages/footerAbout/QollabQuvvatlash";
import Reyting from "./pages/profile/Reyting";
import TariffPurchase from "./pages/profile/TariffPurchase";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/elonjoylash",
          element: (
            <ProtectedRoute>
              <ElonJoylash />
            </ProtectedRoute>
          ),
        },
        {
          path: "/personalInformation",
          element: (
            <ProtectedRoute>
              <PersonalInformation />
            </ProtectedRoute>
          ),
        },
        {
          path: "/elons",
          element: (
            <ProtectedRoute>
              <Elons />
            </ProtectedRoute>
          ),
        },
        {
          path: "/favorites",
          element: (
            <ProtectedRoute>
              <FavoriteAds />
            </ProtectedRoute>
          ),
        },
        {
          path: "/tariffs",
          element: (
            <ProtectedRoute>
              <Tariffs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/tariffspurchase",
          element: (
            <ProtectedRoute>
              <TariffPurchase />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reyting",
          element: (
            <ProtectedRoute>
              <Reyting />
            </ProtectedRoute>
          ),
        },
        {
          path: "/ElonKorish/:id",
          element: <ElonKorish />,
        },
        {
          path: "/BizHaqimizda",
          element: <BizHaqimizda />,
        },
        {
          path: "/ElonBeruvchilargaBagishlangan",
          element: <ElonBeruvchilargaBagishlangan />,
        },
        {
          path: "/ElonJoylashtirishQoidalari",
          element: <ElonjoylashtirishQoidalari />,
        },
        {
          path: "/HamkorlikUchun",
          element: <HamkorlikUchun />,
        },
        {
          path: "/QollabQuvvatlash",
          element: <QollabQuvvatlash />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
