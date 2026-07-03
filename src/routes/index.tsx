import { createFileRoute } from '@tanstack/react-router'

import HeroSection from '../components/hero-section'
import ProfilSection from '../components/profil-section'
import WisataSection from '../components/wisata-section'
import ProdukUMKMSection from '../components/produk-umkm-section'
import LemahAsriSection from '../components/lemah-asri-section'
import ArtikelSection from '../components/artikel-section'
import CTASection from '../components/cta-section'

import artikelData from '#/data/artikel.json'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <HeroSection />
      <ProfilSection />
      <WisataSection />
      <ProdukUMKMSection />
      <LemahAsriSection />
      <ArtikelSection items={artikelData} />
      <CTASection />
    </>
  )
}
