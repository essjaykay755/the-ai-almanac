export default function handler(request, response) {
  const rawCountry = request.headers['x-vercel-ip-country'] || request.headers['cf-ipcountry'] || null;
  const countryValue = Array.isArray(rawCountry) ? rawCountry[0] : rawCountry;
  const country = typeof countryValue === 'string' && /^[A-Za-z]{2}$/.test(countryValue)
    ? countryValue.toUpperCase()
    : null;

  response.setHeader('Cache-Control', 'private, no-store, max-age=0');
  response.status(200).json({ country });
}
