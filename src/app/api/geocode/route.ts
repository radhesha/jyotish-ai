import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city    = searchParams.get("city")?.trim();
  const country = searchParams.get("country")?.trim();

  if (!city || !country) {
    return NextResponse.json({ error: "city and country are required" }, { status: 400 });
  }

  const query = encodeURIComponent(`${city}, ${country}`);
  const url   = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "AstroAI/1.0 (contact@astroai.app)" },
    });
    const data = await res.json();

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const place = data[0];
    return NextResponse.json({
      lat:     parseFloat(place.lat),
      lng:     parseFloat(place.lon),
      display: place.display_name,
    });
  } catch {
    return NextResponse.json({ error: "Geocoding failed" }, { status: 500 });
  }
}
