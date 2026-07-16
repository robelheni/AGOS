import { NextRequest, NextResponse } from 'next/server'

// Mock endpoint. Connect email, CRM and file storage before using this for live enquiries.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { service, name, email } = body
    if (!service || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request received.',
      received: {
        source: body.source ?? 'quote',
        service,
        hasFiles: Array.isArray(body.files) && body.files.length > 0,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to process quote request' }, { status: 500 })
  }
}
