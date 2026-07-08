import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import HeroSection from '../components/hero-section'
import ProfilSection from '../components/profil-section'
import WisataSection from '../components/wisata-section'
import ProdukUMKMSection from '../components/produk-umkm-section'
import LemahAsriSection from '../components/lemah-asri-section'
import ArtikelSection from '../components/artikel-section'
import CTASection from '../components/cta-section'

import artikelData from '#/data/artikel.json'
import { fetchArticles } from '../lib/api-endpoints'
import type { ArtikelItem } from '../lib/api-transformers'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [articles, setArticles] = useState<ArtikelItem[]>(artikelData as any)

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(() => { /* fallback to static */ })
  }, [])

  return (
    <>
      <HeroSection />
      <ProfilSection />
      <WisataSection />
      <ProdukUMKMSection />
      <LemahAsriSection />
      <ArtikelSection items={articles} />
      <CTASection />
    </>
  )
}
