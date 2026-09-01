export default function handler(request, response) {
  const header = request.headers['x-vercel-ip-country'];
  const country = Array.isArray(header) ? header[0] : header;

  response.setHeader('Cache-Control', 'private, no-store');
  response.status(200).json({
    country: typeof country === 'string' ? country.toUpperCase() : null
  });
}
