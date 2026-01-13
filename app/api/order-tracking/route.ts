import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import OrderTracking from '@/models/OrderTracking';
import { sendSMS, generateTrackingCode } from '@/lib/sms';

// Sipariş takip kodu ile sorgula
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const trackingCode = searchParams.get('code');

    if (!trackingCode) {
      return NextResponse.json(
        { success: false, error: 'Takip kodu gereklidir' },
        { status: 400 }
      );
    }

    const order = await OrderTracking.findOne({ 
      trackingCode: trackingCode.toUpperCase() 
    }).populate('products.productId');

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Sipariş bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Yeni sipariş oluştur (Admin)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const trackingCode = generateTrackingCode();
    
    const order = await OrderTracking.create({
      ...body,
      trackingCode,
    });

    // SMS gönder
    if (body.customerPhone) {
      const message = `Siparişiniz alınmıştır. Takip kodunuz: ${trackingCode}. Sipariş durumunuzu web sitemizden takip edebilirsiniz.`;
      await sendSMS({
        phoneNumber: body.customerPhone,
        message,
      });
    }

    return NextResponse.json({
      success: true,
      order,
      trackingCode,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
