import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/data/store';

export async function GET() {
  try {
    const inquiries = getInquiries();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing inquiry ID or status' }, { status: 400 });
    }

    const updated = updateInquiryStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing inquiry ID' }, { status: 400 });
    }

    deleteInquiry(id);
    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
