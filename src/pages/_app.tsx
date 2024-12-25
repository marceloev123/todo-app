import { GeistSans } from 'geist/font/sans'
import { type AppType } from 'next/app'
import { ThemeProvider } from 'next-themes'

import { api } from '@/utils/api'

import '@/styles/globals.css'
import { Toaster } from '@/components/ui/toaster'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </div>
  )
}

export default api.withTRPC(MyApp)
