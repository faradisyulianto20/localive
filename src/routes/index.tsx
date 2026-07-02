import { createFileRoute } from '@tanstack/react-router'

import HeroSection from '../components/hero-section'
import ProfilSection from '../components/profil-section'
import DestinasiSection from '../components/destinasi-section'
import PaketWisataSection from '../components/paket-wisata-section'
import HomestaySection from '../components/homestay-section'
import MapSection from '../components/map-section'
import Footer from '../components/footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <HeroSection />
      <ProfilSection />
      <DestinasiSection />
      <PaketWisataSection />
      <HomestaySection />
      <MapSection />
      <Footer />
    </>
  )
}
