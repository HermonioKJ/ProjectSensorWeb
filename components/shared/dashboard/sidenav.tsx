import NavLinks from './nav-links'

export default function SideNav() {
  return (
    <div className="flex flex-col h-full pl-3 min-w-full">
      <div className="flex flex-col md:flex-row grow md:space-x-2 md:space-y-0">
        <NavLinks />
      </div>
    </div>
  )
}
