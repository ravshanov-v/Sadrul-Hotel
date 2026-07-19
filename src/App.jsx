import { Suspense, lazy, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Layout from "./Pages/Layout/Layout.jsx"
import BoshSahifa from "./Pages/BoshSahifa/BoshSahifa.jsx"
import NotFound from "./Pages/NotFound/NotFound.jsx"
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"
import { AuthProvider } from "./components/Auth/AuthProvider.jsx"
import { FavoritesProvider } from "./components/Favorites/FavoritesProvider.jsx"
import { ProphileProvider } from "./components/Prophile/ProphileProvider.jsx"
import { DarkModeProvider } from "./components/DarkMode/DarkModeProvider.jsx"
import { ModalProvider } from "./components/SmallWindows/Modal/ModalProvider.jsx"
import { LanguageProvider } from "./components/Language/LanguageProvider.jsx"

const Mehmonxonalar = lazy(() => import("./Pages/Mehmonxonalar/Mehmonxonalar.jsx"))
const Takliflar = lazy(() => import("./Pages/Takliflar/Takliflar.jsx"))
const BizHaqimizda = lazy(() => import("./Pages/BizHaqimizda/BizHaqimizda.jsx"))
const Taomnoma = lazy(() => import("./Pages/Taomnoma/Taomnoma.jsx"))
const TaomBatafsil = lazy(() => import("./Pages/Taomnoma/TaomBatafsil.jsx"))
const MehmonxonaDetail = lazy(() => import("./Pages/Mehmonxonalar/MehmonxonaDetail.jsx"))
const SignUp = lazy(() => import("./Pages/SignUp/SignUp.jsx"))
const BronQilish = lazy(() => import("./Pages/BizHaqimizda/BronQilish/BronQilish.jsx"))
const Ariza = lazy(() => import("./Pages/BizHaqimizda/ArizaTopshirish/Ariza.jsx"))
const Maxfiylik = lazy(() => import("./Pages/MaxfiylikSiyosati/Maxfiylik.jsx"))
const FoydalanishShartlari = lazy(() => import("./Pages/Foydalanish/FoydalanishShartlari.jsx"))

const PageLoader = () => (
  <div className="page-loader">
    <div className="page-loader-ring" />
    <div className="page-loader-brand">
      <svg viewBox="0 0 24 24" fill="none" className="page-loader-crown">
        <path d="M2 20h20M4 20V8l4 3 4-6 4 6 4-3v12" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2v2M12 6v2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span className="page-loader-text">adrul</span>
    </div>
  </div>
)

const LazyPage = ({ Component }) => {
  const [ready, setReady] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setReady(false)
    const timer = setTimeout(() => setReady(true), 200)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!ready) return <PageLoader />

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BoshSahifa />} />
            <Route path="mehmonxonalar" element={<LazyPage Component={Mehmonxonalar} />} />
            <Route path="takliflar" element={<LazyPage Component={Takliflar} />} />
            <Route path="mehmonxona/:hotelId" element={<LazyPage Component={MehmonxonaDetail} />} />
            <Route path="biz-haqimizda" element={<LazyPage Component={BizHaqimizda} />} />
            <Route path="taomnoma" element={<LazyPage Component={Taomnoma} />}>
              <Route path=":id" element={<LazyPage Component={TaomBatafsil} />} />
            </Route>
            <Route path="signup" element={<LazyPage Component={SignUp} />} />
            <Route path="bron-qilish/:hotelId" element={<LazyPage Component={BronQilish} />} />
            <Route path="ariza" element={<LazyPage Component={Ariza} />} />
            <Route path="maxfiylik-siyosati" element={<LazyPage Component={Maxfiylik} />} />
            <Route path="foydalanish-shartlari" element={<LazyPage Component={FoydalanishShartlari} />} />
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
      </BrowserRouter>
    </LanguageProvider>
  )
}
