import SideNav from '@/components/shared/dashboard/sidenav'
import TopBar from '@/components/shared/dashboard/top-bar'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar />

      <div className="flex-grow flex flex-col md:flex-row">

        <div className="w-full md:w-52 s:w-52 bg-white border-b md:border-r border-gray-200 shadow-sm">
          <SideNav />
        </div>
        
        <div className="flex-grow p-6 md:overflow-y-auto">
          <Toaster position='bottom-right'></Toaster>
          {children}
        </div>
      </div>
    </div>
  )
}
