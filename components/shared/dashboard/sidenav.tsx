import NavLinks from './nav-links'

export default function SideNav() {
  return (
    <div className="flex flex-col h-full p-3">
      {/* Main flex container for the sidebar */}
      <div className="flex flex-col md:flex-row grow space-x-0 md:space-x-2 md:space-y-0">
        {/* Navigation Links */}
        <NavLinks />
      </div>
    </div>
  )
}
