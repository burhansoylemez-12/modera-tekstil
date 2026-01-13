import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

// Tüm kategorileri getir
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Yeni kategori ekle (Admin)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const category = await Category.create(body);

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
