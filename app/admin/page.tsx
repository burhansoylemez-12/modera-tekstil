'use client';

import { useEffect, useState } from 'react';
import { FaBoxOpen, FaList, FaShoppingCart, FaChartLine } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    // İstatistikleri yükle
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // API'den istatistikleri çek
      const productsRes = await fetch('/api/products');
      const categoriesRes = await fetch('/api/categories');
      
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setStats({
        products: productsData.products?.length || 0,
        categories: categoriesData.categories?.length || 0,
        orders: 0,
        revenue: 0,
      });
    } catch (error) {
      console.error('İstatistik yükleme hatası:', error);
    }
  };

  const statCards = [
    { 
      title: 'Toplam Ürün', 
      value: stats.products, 
      icon: FaBoxOpen, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Kategoriler', 
      value: stats.categories, 
      icon: FaList, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Siparişler', 
      value: stats.orders, 
      icon: FaShoppingCart, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Gelir', 
      value: `₺${stats.revenue.toLocaleString()}`, 
      icon: FaChartLine, 
      color: 'bg-orange-500' 
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Hoş Geldiniz</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-full`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hızlı Aksiyonlar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Hızlı Aksiyonlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/admin/products/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center font-semibold transition-colors"
          >
            + Yeni Ürün Ekle
          </a>
          <a 
            href="/admin/categories" 
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center font-semibold transition-colors"
          >
            + Kategori Ekle
          </a>
          <a 
            href="/admin/orders" 
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center font-semibold transition-colors"
          >
            Siparişleri Görüntüle
          </a>
        </div>
      </div>
    </div>
  );
}
