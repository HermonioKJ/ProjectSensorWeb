import SideNav from '@/components/shared/dashboard/sidenav'
import TopBar from '@/components/shared/dashboard/top-bar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar />
      {/* Flex container: on mobile, flex-direction is column; on md+ it's row */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar on medium screens and larger (fixed width) */}
        <div className="w-full md:w-52 s:w-52 bg-white border-b md:border-r border-gray-200 shadow-sm">
          <SideNav />
        </div>
        
        {/* Main content area */}
        <div className="flex-grow p-6 md:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
