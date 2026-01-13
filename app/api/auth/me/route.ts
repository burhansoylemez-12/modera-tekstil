import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    // Token doğrula
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    
    await dbConnect();
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Oturum geçersiz' },
      { status: 401 }
    );
  }
}
