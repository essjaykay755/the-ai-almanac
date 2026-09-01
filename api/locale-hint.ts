export function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country')?.trim().toUpperCase() || null;

  return Response.json(
    { country },
    {
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  );
}
