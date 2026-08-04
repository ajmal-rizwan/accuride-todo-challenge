import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import client from '../../../utils/hygraph'
import { CREATE_USER } from '../../../utils/queries'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in Hygraph
    const data: any = await client.request(CREATE_USER, {
      email,
      password: hashedPassword,
    })

    // Publish user
    // await client.request(PUBLISH_USER, { id: data.createAppUser.id })

    return NextResponse.json({ message: 'User created successfully' })

  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}