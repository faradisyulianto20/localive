import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import Navbar from '../components/layout/navbar'
import Footer from '../components/layout/footer'
import { AuthProvider } from '../hooks/use-auth'

import '../lib/i18n'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Localive' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  const isLogin = pathname.startsWith('/login')
  const showShell = !isAdmin && !isLogin

  return (
    <html lang={i18n.language}>
      <head>
        <HeadContent />
      </head>
      <body>
        <AuthProvider>
          {showShell && <Navbar />}
          <main>{children}</main>
          {showShell && <Footer />}

          {showShell && (
            <a
              href="https://wa.me/6285876270545"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:scale-110 hover:shadow-xl"
              aria-label="Chat via WhatsApp"
            >
              <MessageCircle className="h-7 w-7" />
            </a>
          )}

          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
              TanStackQueryDevtools,
            ]}
          />
          <Scripts />
        </AuthProvider>
      </body>
    </html>
  )
}
