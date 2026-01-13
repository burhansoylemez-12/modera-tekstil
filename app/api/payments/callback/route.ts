import { NextRequest, NextResponse } from 'next/server';
import Iyzipay from 'iyzipay';
import Order from '@/models/Order';
import { connectDB } from '@/lib/mongodb';

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || 'demo',
  secretKey: process.env.IYZICO_SECRET_KEY || 'demo',
  uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token eksik' },
        { status: 400 }
      );
    }

    // Ödeme sonucunu al
    return new Promise((resolve) => {
      (Iyzipay as any).checkoutForm.retrieve(
        { token },
        async (err: any, result: any) => {
          if (err) {
            console.error('iyzico callback error:', err);
            resolve(
              NextResponse.json(
                { success: false, message: 'Ödeme doğrulama başarısız' },
                { status: 500 }
              )
            );
          } else {
            // Ödeme başarılı ise
            if (result.paymentStatus === 'SUCCESS') {
              try {
                await connectDB();

                // Siparişi güncelle
                const order = await Order.findOneAndUpdate(
                  { orderNumber: result.conversationId },
                  {
                    paymentStatus: 'completed',
                    paymentMethod: 'credit_card',
                    transactionId: result.paymentId,
                    status: 'confirmed',
                  },
                  { new: true }
                );

                if (order) {
                  resolve(
                    NextResponse.json({
                      success: true,
                      message: 'Ödeme başarılı',
                      order: order.orderNumber,
                    })
                  );
                } else {
                  resolve(
                    NextResponse.json(
                      { success: false, message: 'Sipariş bulunamadı' },
                      { status: 404 }
                    )
                  );
                }
              } catch (dbError) {
                console.error('Database error:', dbError);
                resolve(
                  NextResponse.json(
                    { success: false, message: 'Veritabanı hatası' },
                    { status: 500 }
                  )
                );
              }
            } else {
              resolve(
                NextResponse.json(
                  { success: false, message: 'Ödeme reddedildi' },
                  { status: 400 }
                )
              );
            }
          }
        }
      );
    });
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
