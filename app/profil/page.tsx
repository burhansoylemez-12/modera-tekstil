'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        router.push('/giris');
      }
    } catch (err) {
      router.push('/giris');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="py-12 min-h-screen">
          <div className="container-custom text-center">
            <p>Yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="py-12 bg-gray-50 min-h-screen">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Profilim</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                <Link 
                  href="/profil"
                  className="block px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold"
                >
                  Hesap Bilgilerim
                </Link>
                <Link 
                  href="/profil/siparisler"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Siparişlerim
                </Link>
                <Link 
                  href="/profil/adresler"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Adreslerim
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-red-600"
                >
                  Çıkış Yap
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Hesap Bilgilerim</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Ad Soyad</label>
                    <p className="text-lg font-semibold">{user?.name}</p>
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Email</label>
                    <p className="text-lg font-semibold">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Telefon</label>
                    <p className="text-lg font-semibold">{user?.phone || 'Belirtilmemiş'}</p>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      Üyelik tarihi: {new Date(user?.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
