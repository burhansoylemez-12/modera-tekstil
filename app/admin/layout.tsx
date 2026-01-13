'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { 
  FaHome, 
  FaBoxOpen, 
  FaList, 
  FaShoppingCart, 
  FaCog, 
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const menuItems = [
    { href: '/admin', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/products', icon: FaBoxOpen, label: 'Ürünler' },
    { href: '/admin/categories', icon: FaList, label: 'Kategoriler' },
    { href: '/admin/orders', icon: FaShoppingCart, label: 'Siparişler' },
    { href: '/admin/settings', icon: FaCog, label: 'Ayarlar' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-50`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-gray-300"
            >
              <FaBars size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-left"
            >
              <FaSignOutAlt size={20} />
              {sidebarOpen && <span>Çıkış Yap</span>}
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Yönetim Paneli</h2>
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                target="_blank"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Siteyi Görüntüle
              </Link>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
