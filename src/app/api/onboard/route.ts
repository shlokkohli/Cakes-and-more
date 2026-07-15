import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { onboardSchema } from '@/schemas/onboard.schema'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import * as z from 'zod'

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthenticated' },
      { status: 401 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }

  const result = onboardSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: z.flattenError(result.error).fieldErrors,
      },
      { status: 400 }
    )
  }

  const fullName =
    result.data.firstName + ' ' + result.data.lastName

  try {
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        ...result.data,
        onboardingCompleted: true,
        name: fullName,
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
