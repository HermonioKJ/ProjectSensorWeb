import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { roboto } from "../fonts";
import './cards.css'
import db from "@/db/drizzle";

export async function NameCard() {

  return (
    <Card className='cards flex flex-col shadow-md'>
      <CardHeader>
        <h1 className={`${roboto.className} font-bold md:text-lg`}>
          {/* Hey there! {userName} */}
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
