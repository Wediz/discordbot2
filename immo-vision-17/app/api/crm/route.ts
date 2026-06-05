import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const dealSchema = z.object({
  title: z.string().min(2),
  stage: z.enum(['PROSPECT', 'ESTIMATION', 'VISITE', 'MANDAT', 'COMMERCIALISATION', 'COMPROMIS', 'VENDU']),
  value: z.number().optional(),
  notes: z.string().optional(),
  nextAction: z.string().optional(),
  nextActionDate: z.string().optional(),
  leadId: z.string().optional(),
  propertyId: z.string().optional(),
})

export async function GET(req: NextRequest) {
  try {
    // TODO: Auth check + DB query
    // const deals = await prisma.cRMDeal.findMany({
    //   include: { lead: true, property: { include: { images: { where: { isPrimary: true } } } }, activities: true },
    //   orderBy: [{ stage: 'asc' }, { updatedAt: 'desc' }],
    // })

    return NextResponse.json({ success: true, data: [] })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = dealSchema.parse(body)
    // TODO: Create CRM deal
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Validation error' }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, stage, order } = body
    // TODO: Update deal stage (drag & drop)
    // await prisma.cRMDeal.update({ where: { id }, data: { stage, order } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
