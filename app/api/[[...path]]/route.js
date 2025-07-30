export async function GET(request) {
  return new Response(JSON.stringify({ message: 'This is a static site. API routes are not available.' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(request) {
  return new Response(JSON.stringify({ message: 'This is a static site. API routes are not available.' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}