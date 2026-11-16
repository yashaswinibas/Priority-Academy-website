import { Route, Routes } from 'react-router-dom'
import { useScrollManager } from './lib/hooks'
import { Footer, Header, MobileBar } from './components/Layout'
import Home from './pages/Home'
import Page from './pages/Page'
import Gallery from './pages/Gallery'

export default function App() {
  useScrollManager()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/:pid" element={<Page />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
