import Link from 'next/link'
import { roboto } from './fonts'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constant'

export default function AppLogo() {
  return (
    <Link href="/" className="flex-start">
      <div
        className={`${roboto.className} flex flex-row items-end space-x-2`}
      >
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt={`${APP_NAME} logo`}
          priority
        />
        <span className="flex text-l p-2 pl-2">{APP_NAME}</span>
      </div>
    </Link>
  )
}