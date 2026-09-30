import { NextRequest, NextResponse } from 'next/server';
import {
  getDynamicContent,
  updateDynamicContent,
  getDynamicCompanyData,
  updateDynamicCompanyData,
} from '@/data/store';

export async function GET() {
  try {
    const content = getDynamicContent();
    const company = getDynamicCompanyData();
    return NextResponse.json({ success: true, content, company });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, company } = body;

    if (content) {
      updateDynamicContent(content);
    }

    if (company) {
      updateDynamicCompanyData(company);
    }

    return NextResponse.json({
      success: true,
      message: 'Website data & graphics settings updated successfully!',
      content: getDynamicContent(),
      company: getDynamicCompanyData(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update content' }, { status: 500 });
  }
}
