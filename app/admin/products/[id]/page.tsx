'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    sizes: '',
    colors: '',
    images: '',
    video: '',
    description: '',
    stock: 0,
    price: 0,
    whatsappNumber: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data?.success && data.product) {
          const p = data.product;
          setFormData({
            name: p.name || '',
            code: p.code || '',
            category: p.category || '',
            sizes: Array.isArray(p.sizes) ? p.sizes.join(', ') : (p.sizes || ''),
            colors: Array.isArray(p.colors) ? p.colors.join(', ') : (p.colors || ''),
            images: Array.isArray(p.images) ? p.images.join(', ') : (p.images || ''),
            video: p.video || '',
            description: p.description || '',
            stock: typeof p.stock === 'number' ? p.stock : parseInt(p.stock || '0'),
            price: typeof p.price === 'number' ? p.price : parseFloat(p.price || '0'),
            whatsappNumber: p.whatsappNumber || '',
            isActive: Boolean(p.isActive),
          });
        } else {
          alert(data?.error || 'Ürün getirilemedi');
          router.push('/admin/products');
        }
      } catch (e) {
        alert('Ürün yükleme sırasında hata oluştu');
        router.push('/admin/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Kategori yükleme hatası:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      const productData = {
        ...formData,
        sizes: String(formData.sizes)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        colors: String(formData.colors)
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
        images: String(formData.images)
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
        stock: Number(formData.stock) || 0,
        price: Number(formData.price) || 0,
      };

      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Ürün güncellendi');
        router.push('/admin/products');
      } else {
        alert(data.error || 'Güncelleme sırasında hata oluştu');
      }
    } catch (error) {
      alert('Güncelleme sırasında hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaArrowLeft /> Geri Dön
        </button>
        <h1 className="text-3xl font-bold">Ürün Düzenle</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Ürün Adı *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Ürün Kodu *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Kategori *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Kategori Seçin</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Fiyat (TL) *</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Stok Adedi *</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">WhatsApp Numarası</label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0544 483 2718"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Bedenler (virgülle ayırın)</label>
            <input
              type="text"
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="S, M, L, XL, XXL"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Renkler (virgülle ayırın)</label>
            <input
              type="text"
              value={formData.colors}
              onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Kırmızı, Mavi, Siyah, Beyaz"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Resim URL'leri (virgülle ayırın)</label>
            <textarea
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={3}
              placeholder="https://ornek.com/resim1.jpg, https://ornek.com/resim2.jpg"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Video URL (YouTube, Vimeo vb.)</label>
            <input
              type="text"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Ürün Açıklaması *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows={5}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-semibold">Ürün Aktif</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors disabled:bg-gray-400"
          >
            <FaSave /> {saving ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}
