'use client'

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { roboto } from "../fonts";
import { useSession } from "next-auth/react"; 
import { useState, useEffect } from 'react';

import './cards.css'

export default function NameCard() {
  const { data: session } = useSession();
  
  // Simulate delay for async data fetching (this could be your API call instead)
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('Guest');

  useEffect(() => {
    const fetchData = async () => {
      // Simulate an async call
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));  // Fake delay
      setUserName(session?.user?.name || 'Guest');
      setLoading(false);
    };

    fetchData();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

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
