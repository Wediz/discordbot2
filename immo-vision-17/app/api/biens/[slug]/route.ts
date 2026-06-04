import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // TODO: Fetch from DB and increment view count
    // const property = await prisma.property.findUnique({
    //   where: { slug: params.slug },
    //   include: { images: true, owner: true },
    // })
    // if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    // await prisma.property.update({ where: { id: property.id }, data: { viewCount: { increment: 1 } } })

    return NextResponse.json({ success: true, data: null })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
