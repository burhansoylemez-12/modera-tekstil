import { NextRequest, NextResponse } from 'next/server';
import Iyzipay from 'iyzipay';

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || 'demo',
  secretKey: process.env.IYZICO_SECRET_KEY || 'demo',
  uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      totalAmount,
      buyerName,
      buyerEmail,
      buyerPhone,
      items,
      shippingAddress,
    } = body;

    if (!orderId || !totalAmount) {
      return NextResponse.json(
        { success: false, message: 'Sipariş ID ve tutar zorunludur' },
        { status: 400 }
      );
    }

    // iyzico checkout form oluştur
    const checkoutFormRequest = {
      locale: 'tr',
      conversationId: orderId,
      price: Math.ceil(totalAmount),
      basketId: orderId,
      paymentGroup: 'PRODUCT',
      buyer: {
        id: Math.random().toString(),
        name: buyerName || 'Alıcı',
        surname: '',
        gsmNumber: buyerPhone || '',
        email: buyerEmail || 'info@modera.com.tr',
        identityNumber: '12345678901',
        lastLoginDate: new Date().toISOString().split('T')[0],
        registrationDate: new Date().toISOString().split('T')[0],
        registrationAddress: shippingAddress?.address || 'Adres',
        ip: '127.0.0.1',
        city: shippingAddress?.city || '',
        country: 'Turkey',
        zipCode: shippingAddress?.zipCode || '',
      },
      shippingAddress: {
        contactName: buyerName || 'Alıcı',
        city: shippingAddress?.city || '',
        country: 'Turkey',
        address: shippingAddress?.address || 'Adres',
        zipCode: shippingAddress?.zipCode || '',
      },
      billingAddress: {
        contactName: buyerName || 'Alıcı',
        city: shippingAddress?.city || '',
        country: 'Turkey',
        address: shippingAddress?.address || 'Adres',
        zipCode: shippingAddress?.zipCode || '',
      },
      basketItems: items.map((item: any, index: number) => ({
        id: item.product || index.toString(),
        name: item.name || 'Ürün',
        category1: 'Tekstil',
        itemType: 'PHYSICAL',
        price: item.price,
        quantity: item.quantity || 1,
      })),
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/callback`,
    };

    return new Promise((resolve) => {
      (Iyzipay as any).checkoutFormInitialize.create(
        checkoutFormRequest,
        (err: any, result: any) => {
          if (err) {
            console.error('iyzico checkout form error:', err);
            resolve(
              NextResponse.json(
                { success: false, message: 'Ödeme formu oluşturulamadı' },
                { status: 500 }
              )
            );
          } else {
            console.log('Checkout form created:', result);
            resolve(
              NextResponse.json({
                success: true,
                checkoutFormContent: result.checkoutFormContent,
                token: result.token,
              })
            );
          }
        }
      );
    });
  } catch (error) {
    console.error('Payment session error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
