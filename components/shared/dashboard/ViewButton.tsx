'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ViewButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function ViewButton({ children, className = '' }: ViewButtonProps) {
  const router = useRouter();

  const handleNavigate = async () => {
    try {
      console.log('Handling async tasks before navigation');
      router.push('/dashboard/modern-jeeps');
    } catch (error) {
      console.error('Error during async tasks:', error);
    }
  };

  return (
    <Button onClick={handleNavigate} className={className}>
      {children}
    </Button>
  );
}
