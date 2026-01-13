'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck } from 'react-icons/fa';

export default function AddressesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
    isDefault: false,
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleOpenForm = (address?: any) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        title: address.title || '',
        fullName: address.fullName || '',
        phone: address.phone || '',
        address: address.address || '',
        city: address.city || '',
        district: address.district || '',
        zipCode: address.zipCode || '',
        isDefault: address.isDefault || false,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        title: '',
        fullName: user?.name || '',
        phone: user?.phone || '',
        address: '',
        city: '',
        district: '',
        zipCode: '',
        isDefault: false,
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAddress(null);
    setFormData({
      title: '',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      zipCode: '',
      isDefault: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingAddress 
        ? '/api/auth/addresses'
        : '/api/auth/addresses';
      
      const method = editingAddress ? 'PUT' : 'POST';
      
      const body = editingAddress
        ? { ...formData, addressId: editingAddress._id }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingAddress ? 'Adres güncellendi!' : 'Adres eklendi!');
        await fetchUser();
        handleCloseForm();
      } else {
        alert(data.message || 'İşlem başarısız');
      }
    } catch (err) {
      alert('Bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    if (!confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const res = await fetch(`/api/auth/addresses?id=${addressId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        alert('Adres silindi!');
        await fetchUser();
      } else {
        alert(data.message || 'Adres silinemedi');
      }
    } catch (err) {
      alert('Bir hata oluştu');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
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
                  className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
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
                  className="block px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold"
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Adreslerim</h2>
                  {(!user?.addresses || user.addresses.length < 3) && (
                    <button
                      onClick={() => handleOpenForm()}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                    >
                      <FaPlus /> Yeni Adres Ekle
                    </button>
                  )}
                </div>

                {/* Adres Formu */}
                {showForm && (
                  <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-red-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">
                        {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                      </h3>
                      <button
                        onClick={handleCloseForm}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Adres Başlığı *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ev, İş, Ofis vb."
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Ad Soyad *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Alıcı adı soyadı"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Telefon *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="05xx xxx xx xx"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            İl *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="İstanbul, Ankara vb."
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            İlçe
                          </label>
                          <input
                            type="text"
                            value={formData.district}
                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Kadıköy, Çankaya vb."
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Posta Kodu
                          </label>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="34000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Adres *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                          placeholder="Mahalle, sokak, bina no, daire no vb."
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isDefault}
                            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                            className="w-5 h-5"
                          />
                          <span className="text-gray-700 font-semibold">Varsayılan adres olarak ayarla</span>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          <FaCheck /> {submitting ? 'Kaydediliyor...' : (editingAddress ? 'Güncelle' : 'Kaydet')}
                        </button>
                        <button
                          type="button"
                          onClick={handleCloseForm}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                          İptal
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {!user?.addresses || user.addresses.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4 text-lg">Henüz kayıtlı adresiniz bulunmuyor</p>
                    <p className="text-sm text-gray-400 mb-6">
                      Sipariş verebilmek için en az bir adres eklemelisiniz.
                    </p>
                    <button
                      onClick={() => handleOpenForm()}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      <FaPlus /> İlk Adresinizi Ekleyin
                    </button>
                  </div>
                ) : (
                  <>
                    {user.addresses.length >= 3 && !showForm && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                        En fazla 3 adres ekleyebilirsiniz. Yeni adres eklemek için mevcut bir adresi silin.
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {user.addresses.map((addr: any, idx: number) => (
                        <div key={addr._id || idx} className="border-2 border-gray-200 rounded-lg p-5 hover:border-red-200 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <h3 className="font-bold text-lg text-gray-900">{addr.title}</h3>
                              {addr.isDefault && (
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold flex items-center gap-1">
                                  <FaCheck size={12} /> Varsayılan
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenForm(addr)}
                                className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Düzenle"
                              >
                                <FaEdit size={18} />
                              </button>
                              {user.addresses.length > 1 && (
                                <button
                                  onClick={() => handleDelete(addr._id)}
                                  className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Sil"
                                >
                                  <FaTrash size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-gray-700">
                            <p className="font-semibold">{addr.fullName}</p>
                            <p className="text-sm">{addr.phone}</p>
                            <p className="text-sm mt-2">{addr.address}</p>
                            <p className="text-sm text-gray-600">
                              {addr.district && `${addr.district}, `}{addr.city} {addr.zipCode}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
