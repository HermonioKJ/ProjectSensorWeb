'use server'

import { signIn, signOut } from "@/auth"
import db from "@/db/drizzle"
import { users, usersInfo } from "@/db/schema"
import { hashSync } from "bcryptjs"
import { eq, desc } from "drizzle-orm/sql"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials.'
                case 'CallbackRouteError':
                    return 'User not Found'
                default:
                    return 'Something went wrong.'
            }
        } 
    }
}

export async function generateuserID(){
    const latestUser = await db
    .select({ id: users.id })
    .from(users)
    .orderBy(desc(users.id)) 
    .limit(1)
    .execute();

    let ID = 'U0001'; 

    if (latestUser.length > 0) {
        ID = latestUser[0].id
        if (ID.startsWith("U")){
            const IDno = parseInt(ID.substring(1), 10)
            const newIDno = IDno + 1
            ID = `U${newIDno.toString().padStart(4, "0")}`;
        }
    }

    console.log(ID)
    return ID
}

//authenticate to database
export async function getUser(email: string) {
    const user = await db.query.users.findFirst({
    where: eq(users.email, email as string),
    })
    if (!user) throw new Error('User not found')
    return user
}

//add registered users
export async function addUser(
    prevState: string | undefined,
    formData: FormData
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const hashedpassword = hashSync(password, 10)
    const firstName = formData.get("firstname") as string;
    const lastName = formData.get("lastname") as string;
    const phoneNo = formData.get("phoneNo") as string;
    const region = formData.get("region") as string;
    const province = formData.get("province") as string;
    const city = formData.get("city") as string;
    const barangay = formData.get("barangay") as string;

    const existing = await db.query.users.findFirst(
        {
            where:eq(users.email, email as string)
        }
    )
    //check if email is already in use
    if (existing)
        return "Email already in use."

    const userID = await generateuserID()

    await db.insert(users).values({
        id: userID,
        email,
        password:hashedpassword,
    })

    await db.insert(usersInfo).values({
        id: userID,
        email,
        firstName,
        lastName,
        phoneNo,
        region, 
        province,
        city,
        barangay,
    })

revalidatePath('/dashboard')
redirect('/login')
}

export async function logoutAction() {
    await signOut();
    redirect("/login");
  }