'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { roboto } from "../fonts";
import { useSession } from "next-auth/react"; 

import './cards.css'


export default function NameCard() {
  const { data: session } = useSession()

  const userName = session?.user?.name || 'Guest';

  return (
    <Card className='cards flex flex-col shadow-md'>
      <CardHeader>
        <h1 className={`${roboto.className} font-bold md:text-lg`}>
          Hey there! {userName}
        </h1>
      </CardHeader>
      <CardContent>
        <h1 className={`${roboto.className} md:text-m`}>
          Lorem Ipsum
        </h1>
      </CardContent>
    </Card>
  )
}
