import { Link, useLocation } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { FiSun, FiMoon, FiSearch, FiSettings } from 'react-icons/fi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import '../styles/Sidebar.css'
import { useTheme } from '../hooks/useTheme'

type Tool = {
  path: string
  label: string
}

const allTools: Tool[] = [
  { path: '/converters', label: '🔄 Converters' },
  { path: '/validators', label: '✅ Validators' },
  { path: '/formatters', label: '🧹 Formatters' },
  { path: '/diff-tools', label: '🆚 Diff Tools' },
  { path: '/editors', label: '📝 Editors' },
  { path: '/regex-tools', label: '📐 Regex Tools' },
  { path: '/code-editor', label: '💻 Code Editor' },
  { path: '/encoderdecoder', label: '🔐 Encoder/Decoder' },
  { path: '/dev-utils', label: '🛠️ Dev Utils' },
  { path: '/grid-tools', label: '📊 Grid Tools' },
  { path: '/network-tools', label: '🌐 Network Tools' },
  { path: '/playgrounds', label: '🧪 Playgrounds' },
]

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  })

  const location = useLocation()

  const toggleFavorite = (toolPath: string) => {
    const updated = favorites.includes(toolPath)
      ? favorites.filter(p => p !== toolPath)
      : [...favorites, toolPath]

    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const filteredTools = useMemo(
    () => allTools.filter(tool =>
      tool.label.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  )

  const favoriteTools = useMemo(
    () => allTools.filter(tool => favorites.includes(tool.path)),
    [favorites]
  )

  return (
    <div className="side-navbar">
      <div className="sidebar-fixed-top">
        <div className="sidebar-heading-logo">
          <h2 className="side-navbar-header">
            <img src="/fuso-superhero-logo.png" alt="Fuso Logo" className="ifusionone-logo" /> iFusion
          </h2>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <div className="side-navbar-header-button">
          <Link to="/" className={`side-bar-link ${location.pathname === '/' ? 'active' : ''}`}>
            🏠 Home
          </Link>
        </div>

        <div className="side-navbar-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-scrollable">
        {favoriteTools.length > 0 && (
          <div className="sidebar-section">
            <p className="sidebar-section-title">⭐ Favorites</p>
            {favoriteTools.map(tool => (
              <SidebarItem
                key={tool.path}
                tool={tool}
                isActive={location.pathname === tool.path}
                isFav
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        <div className="sidebar-section">
          <p className="sidebar-section-title">🧰 All Tools</p>
          <div className="sidebar-search-results">
            {filteredTools.length > 0 ? (
              filteredTools.map(tool => (
                <SidebarItem
                  key={tool.path}
                  tool={tool}
                  isActive={location.pathname === tool.path}
                  isFav={favorites.includes(tool.path)}
                  toggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <p className="no-results">No tool found</p>
            )}
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <Link to="/settings" className={`sidebar-settings-link ${location.pathname === '/settings' ? 'active' : ''}`}>
          <FiSettings className="settings-icon" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )
}

type SidebarItemProps = {
  tool: Tool
  isActive: boolean
  isFav: boolean
  toggleFavorite: (path: string) => void
}

function SidebarItem({ tool, isActive, isFav, toggleFavorite }: SidebarItemProps) {
  return (
    <div className={`side-bar-link ${isActive ? 'active' : ''}`}>
      <Link to={tool.path}>{tool.label}</Link>
      <span
        className="favorite-icon"
        onClick={() => toggleFavorite(tool.path)}
        title={isFav ? 'Unfavorite' : 'Mark as favorite'}
      >
        {isFav ? <AiFillStar color="#facc15" /> : <AiOutlineStar />}
      </span>
    </div>
  )
}
