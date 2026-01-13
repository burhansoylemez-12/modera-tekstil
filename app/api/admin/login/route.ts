import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Basit admin kontrolü (.env'den)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    const token = generateToken({ username, role: 'admin' });

    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
