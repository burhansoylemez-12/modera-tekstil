import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Sipariş oluştur
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
    
    await connectDB();
    
    const body = await request.json();
    const { items, shippingAddress, paymentMethod, notes } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Sepet boş' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { success: false, message: 'Teslimat adresi gerekli' },
        { status: 400 }
      );
    }

    // Toplam tutar hesapla
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Sipariş oluştur
    const orderDoc = new Order({
      user: decoded.userId,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'credit_card',
      totalAmount,
      notes,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    const order = await orderDoc.save();

    return NextResponse.json({
      success: true,
      message: 'Sipariş oluşturuldu',
      order: {
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        _id: order._id,
      },
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Sipariş oluşturulamadı' },
      { status: 500 }
    );
  }
}

// Kullanıcının siparişlerini getir
export async function GET() {
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
    
    await connectDB();
    
    const orders = await Order.find({ user: decoded.userId })
      .sort({ createdAt: -1 })
      .populate('items.product');

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Siparişler getirilemedi' },
      { status: 500 }
    );
  }
}
