// app/api/weather/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    // Get the city from the URL search params
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    // Check if city parameter exists
    if (!city) {
      return NextResponse.json(
        { message: "City parameter is required" },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.API_KEY;

    // Construct the OpenWeatherMap API URL
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    // Fetch weather data
    const response = await axios.get(APIUrl);
    const weather = response.data;

    // Return the weather data
    return NextResponse.json(weather);

  } catch (error) {
    // Handle errors
    if (error.response?.status === 404) {
      return NextResponse.json(
        { message: "City not found" },
        { status: 404 }
      );
    }

    console.error('Weather API Error:', error);
    return NextResponse.json(
      { message: "Error, Please try again" },
      { status: 500 }
    );
  }
}

// Enable CORS
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Configure CORS headers
export async function OPTIONS(request) {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://weather.bishalmajhi1.com.np'
  ];
  
  const origin = request.headers.get('origin');
  
  // Check if the origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  return new NextResponse(null, { status: 204 });
}