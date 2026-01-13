import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaTag } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    code: string;
    price: number;
    images: string[];
    stock: number;
    category: string;
    whatsappNumber?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0] || '/placeholder-product.jpg';
  const whatsappNumber = product.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP || '905444832718';
  const whatsappMessage = `Merhaba, ${product.name} (${product.code}) hakkında bilgi almak istiyorum.`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/urun/${product._id}`}>
        <div className="relative h-48 md:h-56 lg:h-64 bg-gray-100">
          {product.stock === 0 && (
            <div className="absolute top-0 left-0 bg-red-500 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-semibold z-10">
              Stokta Yok
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-semibold z-10">
              Son {product.stock} Adet
            </div>
          )}
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
      </Link>
      
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-2 gap-2">
          <Link href={`/urun/${product._id}`}>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <span className="text-xs text-gray-500 bg-gray-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded flex-shrink-0">
            {product.code}
          </span>
        </div>
        
        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{product.category}</p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="text-xl md:text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </div>
          
          <div className="flex items-center gap-1.5 md:gap-2 w-full sm:w-auto">
            <Link
              href={`/urun/${product._id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition-all flex-1 sm:flex-none text-center"
            >
              Sepete Ekle
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm transition-all flex-1 sm:flex-none"
            >
              <FaWhatsapp size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
