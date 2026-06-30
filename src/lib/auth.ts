import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev-secret-change-in-production-minimum-32chars'
)

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME ?? 'naelvi_admin'
const MAX_AGE = 60 * 60 * 24 // 24 hours in seconds

export interface JWTPayload {
  sub: string
  username: string
  iat?: number
  exp?: number
}

/**
 * Sign a JWT token for admin session
 */
export async function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY)
}

/**
 * Verify a JWT token — returns payload or null if invalid
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

/**
 * Get the admin session from the current request cookies
 * Use in Server Components and Server Actions
 */
export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  return verifyToken(token)
}

/**
 * Get cookie name for use in API routes
 */
export function getCookieName(): string {
  return COOKIE_NAME
}

/**
 * Get cookie max age
 */
export function getCookieMaxAge(): number {
  return MAX_AGE
}
