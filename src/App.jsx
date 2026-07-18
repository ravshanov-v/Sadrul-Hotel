import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
import Layout from "./Pages/Layout/Layout.jsx"
import { AuthProvider } from "./components/Auth/AuthProvider.jsx"
import { FavoritesProvider } from "./components/Favorites/FavoritesProvider.jsx"
import { ProphileProvider } from "./components/Prophile/ProphileProvider.jsx"
import { DarkModeProvider } from "./components/DarkMode/DarkModeProvider.jsx"
import { ModalProvider } from "./components/SmallWindows/Modal/ModalProvider.jsx"
import { LanguageProvider } from "./components/Language/LanguageProvider.jsx"

import BoshSahifa from "./Pages/BoshSahifa/BoshSahifa.jsx"
import Mehmonxonalar from "./Pages/Mehmonxonalar/Mehmonxonalar.jsx"
import Takliflar from "./Pages/Takliflar/Takliflar.jsx"
import BizHaqimizda from "./Pages/BizHaqimizda/BizHaqimizda.jsx"
import Taomnoma from "./Pages/Taomnoma/Taomnoma.jsx"
import TaomBatafsil from "./Pages/Taomnoma/TaomBatafsil.jsx"
import MehmonxonaDetail from "./Pages/Mehmonxonalar/MehmonxonaDetail.jsx"
import SignUp from "./Pages/SignUp/SignUp.jsx"
import BronQilish from "./Pages/BizHaqimizda/BronQilish/BronQilish.jsx"
import Ariza from "./Pages/BizHaqimizda/ArizaTopshirish/Ariza.jsx"
import Maxfiylik from "./Pages/Maxfiylik siyosati/Maxfiylik.jsx"
import FoydalanishShartlari from "./Pages/Foydalanish/FoydalanishShartlari.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"
import NotFound from "./Pages/NotFound/NotFound.jsx"

function AOSInit() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: "ease-out-cubic",
      mirror: false,
      anchorPlacement: "top-bottom"
    })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  return null
}

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <AOSInit />
                <LanguageProvider>
                  <Routes>
                      <Route path="/" element={<Layout />}>
                          <Route index element={<BoshSahifa />} />
                          <Route path="mehmonxonalar" element={<Mehmonxonalar />} />
                          <Route path="takliflar" element={<Takliflar />} />
                          <Route path="mehmonxona/:hotelId" element={<MehmonxonaDetail />} />
                          <Route path="biz-haqimizda" element={<BizHaqimizda />} />
                          <Route path="taomnoma" element={<Taomnoma />}>
                              <Route path=":id" element={<TaomBatafsil />} />
                          </Route>
                          <Route path="signup" element={<SignUp />} />
                          <Route path="bron-qilish/:hotelId" element={<BronQilish />} />
                          <Route path="ariza" element={<Ariza />} />
                          <Route path="maxfiylik-siyosati" element={<Maxfiylik />} />
                          <Route path="foydalanish-shartlari" element={<FoydalanishShartlari />} />
                          <Route path="*" element={<NotFound />} />
                      </Route>
                      <Route path="/dashboard" element={
                        <AuthProvider>
                          <FavoritesProvider>
                            <ProphileProvider>
                              <DarkModeProvider>
                                <ModalProvider>
                                  <Dashboard />
                                </ModalProvider>
                              </DarkModeProvider>
                            </ProphileProvider>
                          </FavoritesProvider>
                        </AuthProvider>
                      } />
                  </Routes>
                </LanguageProvider>
            </BrowserRouter>
        </div>
    )
}
