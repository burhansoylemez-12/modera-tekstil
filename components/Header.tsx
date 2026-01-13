"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      // Kullanıcı giriş yapmamış
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-2.5">
        <div className="container-custom flex justify-between items-center text-xs md:text-sm">
          <div className="flex gap-3 md:gap-6">
            <a href="tel:+905444832718" className="flex items-center gap-1.5 md:gap-2 hover:text-red-100 transition-colors duration-200">
              <FaPhone size={12} className="md:w-[14px] md:h-[14px]" />
              <span className="hidden sm:inline">0544 483 2718</span>
            </a>
            <a href="mailto:bese.burhan201@gmail.com" className="flex items-center gap-1.5 md:gap-2 hover:text-red-100 transition-colors duration-200">
              <FaEnvelope size={12} className="md:w-[14px] md:h-[14px]" />
              <span className="hidden sm:inline">bese.burhan201@gmail.com</span>
            </a>
          </div>
          <div className="flex gap-3 md:gap-4">
            <a href="#" className="hover:text-red-100 transition-all duration-200 hover:scale-110"><FaFacebook size={16} /></a>
            <a href="#" className="hover:text-red-100 transition-all duration-200 hover:scale-110"><FaInstagram size={16} /></a>
            <a href="#" className="hover:text-red-100 transition-all duration-200 hover:scale-110"><FaTwitter size={16} /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4 md:py-5 border-b border-gray-100">
        <div className="flex justify-between items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-90">
            <Image 
              src="/logo.png" 
              alt="Modera Logo" 
              width={400} 
              height={128}
              className="h-16 md:h-24 lg:h-32 w-auto"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-1 xl:gap-2 bg-gray-50 rounded-full px-2 py-2">
            <Link href="/" className="relative px-4 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm group">
              <span className="relative z-10">Ana Sayfa</span>
            </Link>
            <Link href="/urunler" className="relative px-4 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm group">
              <span className="relative z-10">Ürünler</span>
            </Link>
            <Link href="/kategoriler" className="relative px-4 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm group">
              <span className="relative z-10">Kategoriler</span>
            </Link>
            <Link href="/teklif-al" className="relative px-4 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm group">
              <span className="relative z-10">Teklif Al</span>
            </Link>
            <Link href="/siparis-takip" className="relative px-4 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm group">
              <span className="relative z-10">Sipariş Takip</span>
            </Link>
            <Link href="/hakkimizda" className="relative px-4 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm group">
              <span className="relative z-10">Hakkımızda</span>
            </Link>
            <Link href="/iletisim" className="relative px-4 py-2.5 text-gray-700 hover:text-red-600 font-semibold text-base transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm group">
              <span className="relative z-10">İletişim</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {user ? (
              <Link href="/profil" className="relative inline-flex items-center gap-1.5 md:gap-2 text-gray-700 hover:text-red-600 font-semibold transition-all duration-200 hover:scale-105">
                <FaUser size={20} className="md:w-[22px] md:h-[22px]" />
                <span className="hidden md:inline">{user.name}</span>
              </Link>
            ) : (
              <Link href="/giris" className="relative inline-flex items-center gap-1.5 md:gap-2 text-gray-700 hover:text-red-600 font-semibold transition-all duration-200 hover:scale-105">
                <FaUser size={20} className="md:w-[22px] md:h-[22px]" />
                <span className="hidden md:inline">Giriş</span>
              </Link>
            )}

            <Link href="/sepet" className="relative inline-flex items-center gap-1.5 md:gap-2 text-gray-700 hover:text-red-600 font-semibold transition-all duration-200 hover:scale-105">
              <FaShoppingCart size={22} className="md:w-[24px] md:h-[24px]" />
              <span className="hidden md:inline">Sepet</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 md:-right-3 bg-red-500 text-white text-xs rounded-full px-1.5 md:px-2 py-0.5 min-w-[20px] md:min-w-[22px] text-center font-bold shadow-lg animate-pulse">
                  {count}
                </span>
              )}
            </Link>

            <a 
              href="https://wa.me/905444832718" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 md:px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <FaWhatsapp size={20} className="md:w-[22px] md:h-[22px]" />
              <span className="hidden md:inline font-semibold">WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-red-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="container-custom py-4 flex flex-col space-y-1">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base py-3 px-4 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/urunler" 
              className="text-gray-700 hover:text-red-600 hover:bg-red-50 font-semibold text-base py-3 px-4 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ürünler
            </Link>
            <Link 
              href="/kategoriler" 
              className="text-gray-700 hover:text-red-600 hover:bg-red-50 font-semibold text-base py-3 px-4 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kategoriler
            </Link>
            <Link 
              href="/teklif-al" 
              className="text-gray-700 hover:text-red-600 hover:bg-red-50 font-semibold text-base py-3 px-4 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Teklif Al
            </Link>
            <Link 
              href="/siparis-takip" 
              className="text-gray-700 hover:text-red-600 hover:bg-red-50 font-semibold text-base py-3 px-4 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sipariş Takip
            </Link>
            <Link 
              href="/hakkimizda" 
              className="text-gray-700 hover:text-red-600 hover:bg-red-50 font-semibold text-base py-3 px-4 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hakkımızda
            </Link>
            <Link 
              href="/iletisim" 
              className="text-gray-700 hover:text-red-600 hover:bg-red-50 font-semibold text-base py-3 px-4 rounded-lg transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              İletişim
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
