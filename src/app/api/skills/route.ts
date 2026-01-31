import { NextRequest, NextResponse } from 'next/server';

const CLAWHUB_REGISTRY = 'https://registry.clawhub.com';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sort = searchParams.get('sort') || 'newest';
  const limit = searchParams.get('limit') || '50';

  try {
    const res = await fetch(
      `${CLAWHUB_REGISTRY}/skills?sort=${sort}&limit=${limit}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error(`ClawHub API returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from ClawHub:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills', items: [] },
      { status: 500 }
    );
  }
}
