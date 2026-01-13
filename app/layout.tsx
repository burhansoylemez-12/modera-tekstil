import '@/app/globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/components/cart/CartContext'

export const metadata: Metadata = {
  title: 'Modera - Tekstil Ürünleri',
  description: 'Kaliteli tekstil ürünlerinde uygun fiyatlar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
