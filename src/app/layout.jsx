import "./globals.css"
import { ThemeProvider } from "../components/ui/theme-provider"


export const metadata = {
  title: "Tu Piercing Studio - Arte en tu Piel",
  description: "Estudio profesional de perforaciones corporales con los mejores servicios y productos",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}