import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export interface DashboardNavItem {
  label: string
  path: string
}

interface DashboardLayoutProps {
  title: string
  subtitle: string
  navItems: DashboardNavItem[]
}

const DashboardLayout = ({ title, subtitle, navItems }: DashboardLayoutProps) => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-transparent">
      <aside className="w-64 glass-dark border-r border-slate-700/20 p-6 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase nav-link-muted">Workspace</p>
          <h2 className="text-2xl font-semibold nav-link-dark">{title}</h2>
          <p className="text-sm nav-link-muted">{subtitle}</p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'nav-active' : 'nav-link-muted hover:bg-white/3'
                  }`
                }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-auto text-sm nav-link-muted hover:nav-link-dark text-left"
        >
          Sign out
        </button>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="glass-dark border-b border-slate-700/20 px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase nav-link-muted">Signed in as</p>
            <p className="text-sm font-semibold nav-link-dark">
              {user?.name} · {user?.role}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <NavLink to="profile" className="text-sm nav-link-muted hover:nav-link-dark">
              Profile
            </NavLink>
          </div>
        </header>
        <main className="flex-1 p-8 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

