import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

// Site ayarlarını getir
export async function GET() {
  try {
    await dbConnect();
    
    let settings = await Settings.findOne();
    
    // Eğer ayar yoksa varsayılan oluştur
    if (!settings) {
      settings = await Settings.create({
        siteName: 'Tekstil Ürünleri',
        siteDescription: 'Toptan ve Perakende Tekstil Ürünleri',
      });
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Site ayarlarını güncelle (Admin)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findOneAndUpdate(
        {},
        { ...body, updatedAt: new Date() },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
