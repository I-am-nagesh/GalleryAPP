import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'random';
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY; 

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAccessKey}`;

    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();

        return NextResponse.json(data.results);
    } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
