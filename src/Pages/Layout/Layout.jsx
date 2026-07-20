import { useEffect, useLayoutEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"

import Nav from "../../components/Navbar/Nav.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import { ModalProvider } from "../../components/SmallWindows/Modal/ModalProvider.jsx"
import { DarkModeProvider } from "../../components/DarkMode/DarkModeProvider.jsx"
import { AuthProvider } from "../../components/Auth/AuthProvider.jsx"
import { FavoritesProvider } from "../../components/Favorites/FavoritesProvider.jsx"
import { ProphileProvider } from "../../components/Prophile/ProphileProvider.jsx"
import { useModal } from "../../components/SmallWindows/Modal/useModal.js"
import Modal from "../../components/SmallWindows/Modal/Modal.jsx"
import SignUpModal from "../../components/SmallWindows/Modal/SignUpModal.jsx"
import Prophile from "../../components/Prophile/Prophile.jsx"

import "./Layout.css"

const knownRoutePrefixes = [
  "/mehmonxona/", "/bron-qilish/", "/taomnoma/"
]

const knownExact = [
  "/", "/mehmonxonalar", "/takliflar", "/biz-haqimizda",
  "/taomnoma", "/signup", "/ariza", "/maxfiylik-siyosati",
  "/foydalanish-shartlari"
]

function isNotFound(pathname) {
  if (knownExact.includes(pathname)) return false
  for (const prefix of knownRoutePrefixes) {
    if (pathname.startsWith(prefix)) return false
  }
  return pathname !== "/"
}

function LayoutContent() {
  const location = useLocation()
  const isSignup = location.pathname === "/signup"
  const hideFrame = isNotFound(location.pathname)
  const { openModal } = useModal()


  useLayoutEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: "ease-out-cubic",
      mirror: false,
      anchorPlacement: "top-bottom",
    })
  }, [])

  useLayoutEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (location.state?.openModal) {
      openModal()
      window.history.replaceState({}, document.title)
    }
  }, [location.pathname, openModal])

  return (
    <>
      {!hideFrame && <Nav />}
      {hideFrame ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <div className="container">
          <main>
            <Outlet />
          </main>
        </div>
      )}
      {!hideFrame && !isSignup && <Modal />}
      {!hideFrame && !isSignup && <SignUpModal />}
      {!hideFrame && <Prophile />}
      {!hideFrame && <Footer />}
    </>
  )
}

function Layout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ModalProvider>
          <ProphileProvider>
            <DarkModeProvider>
              <LayoutContent />
            </DarkModeProvider>
          </ProphileProvider>
        </ModalProvider>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default Layout
