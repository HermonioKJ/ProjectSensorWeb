'use server'

import { signIn } from "@/auth"
import db from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm/sql"
import { AuthError } from "next-auth"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try{
        await signIn('credentials', formData)
    } catch (error) {
        if ( error instanceof AuthError) {
            switch (error.type){
                case 'CredentialsSignin':
                    return 'Invalid Credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

//authenticate to database
export async function getUser(email: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email as string),
    })
    if (!user) throw new Error('User not found')
    return user
  }
 