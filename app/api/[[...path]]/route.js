import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Smart GitHub Profile README Generator API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'POST endpoint ready for future features',
    timestamp: new Date().toISOString()
  })
}