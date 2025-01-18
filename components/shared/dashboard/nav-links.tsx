'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tv, HomeIcon, ChartArea, BusFront, Settings } from 'lucide-react'

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Advertisements', href: '/dashboard/advertisements', icon: Tv },
  { name: 'Discrepancy', href: '/dashboard/discrepancy', icon: ChartArea },
  { name: 'Modern Jeeps', href: '/dashboard/modern-jeeps', icon: BusFront },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function NavLinks() {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-col py-5 space-y-5">
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex items-center justify-start space-x-2',
              pathname === link.href
                ? 'text-primary-600' // Active link color
                : 'text-muted-foreground'
            )}
          >
            <LinkIcon className="h-6 w-6" />
            <span className="hidden md:block">{link.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
