import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Adres ekle
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    
    await dbConnect();
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // En fazla 3 adres kontrolü
    if (user.addresses && user.addresses.length >= 3) {
      return NextResponse.json(
        { success: false, message: 'En fazla 3 adres ekleyebilirsiniz' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, fullName, phone, address, city, district, zipCode, isDefault } = body;

    // Validasyon
    if (!title || !fullName || !phone || !address || !city) {
      return NextResponse.json(
        { success: false, message: 'Zorunlu alanları doldurun' },
        { status: 400 }
      );
    }

    // Eğer bu adres varsayılan yapılıyorsa diğerlerini kaldır
    if (isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    // İlk adres ise otomatik varsayılan yap
    const isFirstAddress = !user.addresses || user.addresses.length === 0;

    user.addresses.push({
      title,
      fullName,
      phone,
      address,
      city,
      district,
      zipCode,
      isDefault: isDefault || isFirstAddress,
    });

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Adres eklendi',
      addresses: user.addresses,
    });
  } catch (error: any) {
    console.error('Address add error:', error);
    return NextResponse.json(
      { success: false, message: 'Adres eklenemedi' },
      { status: 500 }
    );
  }
}

// Adres güncelle
export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    
    await dbConnect();
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { addressId, title, fullName, phone, address, city, district, zipCode, isDefault } = body;

    const addressIndex = user.addresses.findIndex((addr: any) => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Adres bulunamadı' },
        { status: 404 }
      );
    }

    // Eğer bu adres varsayılan yapılıyorsa diğerlerini kaldır
    if (isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      title,
      fullName,
      phone,
      address,
      city,
      district,
      zipCode,
      isDefault,
    };

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Adres güncellendi',
      addresses: user.addresses,
    });
  } catch (error: any) {
    console.error('Address update error:', error);
    return NextResponse.json(
      { success: false, message: 'Adres güncellenemedi' },
      { status: 500 }
    );
  }
}

// Adres sil
export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    
    await dbConnect();
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const addressId = searchParams.get('id');

    if (!addressId) {
      return NextResponse.json(
        { success: false, message: 'Adres ID gerekli' },
        { status: 400 }
      );
    }

    // En az 1 adres kalmalı kontrolü
    if (user.addresses.length <= 1) {
      return NextResponse.json(
        { success: false, message: 'En az 1 adresiniz olmalı. Silmek yerine düzenleyin.' },
        { status: 400 }
      );
    }

    const addressIndex = user.addresses.findIndex((addr: any) => addr._id.toString() === addressId);

    if (addressIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Adres bulunamadı' },
        { status: 404 }
      );
    }

    const wasDefault = user.addresses[addressIndex].isDefault;

    user.addresses.splice(addressIndex, 1);

    // Eğer silinen adres varsayılansa, ilk adresi varsayılan yap
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Adres silindi',
      addresses: user.addresses,
    });
  } catch (error: any) {
    console.error('Address delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Adres silinemedi' },
      { status: 500 }
    );
  }
}
