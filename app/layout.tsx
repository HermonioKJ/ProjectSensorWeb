import './globals.css'
import { inter } from '@/components/shared/fonts'
import {APP_DESCRIPTION, APP_NAME, SERVER_URL} from '@/lib/constant'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
}
export const experimental_ppr = true
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
       <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
      { children }
      {/* <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body> 
      
      for light mode or dark mode switching
      */} 
      </body>
    </html>
   
  )
}
