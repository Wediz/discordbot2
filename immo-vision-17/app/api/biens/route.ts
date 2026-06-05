import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const type = searchParams.get('type')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const minSurface = searchParams.get('minSurface')
  const hasPool = searchParams.get('hasPool')
  const hasSeaView = searchParams.get('hasSeaView')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')

  try {
    // TODO: Replace with real DB query
    // const where: Prisma.PropertyWhereInput = {
    //   status: 'AVAILABLE',
    //   ...(city && { city }),
    //   ...(type && { type: type as PropertyType }),
    //   ...(minPrice && { price: { gte: parseInt(minPrice) } }),
    //   ...(maxPrice && { price: { lte: parseInt(maxPrice) } }),
    //   ...(minSurface && { surface: { gte: parseInt(minSurface) } }),
    //   ...(hasPool === 'true' && { hasPool: true }),
    //   ...(hasSeaView === 'true' && { hasSeaView: true }),
    // }
    // const [properties, total] = await Promise.all([
    //   prisma.property.findMany({ where, skip: (page-1)*limit, take: limit, include: { images: { where: { isPrimary: true } } } }),
    //   prisma.property.count({ where }),
    // ])

    return NextResponse.json({
      success: true,
      data: [],
      meta: { page, limit, total: 0 },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // TODO: Create property with auth check (admin/agent only)
    return NextResponse.json({ success: true, data: body }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
