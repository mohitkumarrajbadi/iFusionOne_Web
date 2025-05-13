import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { FiSun, FiMoon, FiSearch, FiSettings } from "react-icons/fi";
import { GoSidebarCollapse } from "react-icons/go";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import "../styles/Sidebar.css";
import { useTheme } from "../hooks/useTheme";

// Tool definition
type Tool = {
  path: string;
  label: string;
};

type SideBarProps = {
  isCollapsed: boolean;
  collapseSidebar: () => void;
};

const allTools: Tool[] = [
  { path: "/converters", label: "🔄 Converters" },
  { path: "/formatters", label: "🧹 Formatters" },
  { path: "/diff-tools", label: "🆚 Diff Tools" },
  { path: "/regex-tools", label: "📐 Regex Tools" },
  { path: "/encoderdecoder", label: "🔐 Encoder/Decoder" },
];

export default function Sidebar({ isCollapsed, collapseSidebar }: SideBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const toggleFavorite = (toolPath: string) => {
    const updated = favorites.includes(toolPath)
      ? favorites.filter((p) => p !== toolPath)
      : [...favorites, toolPath];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filteredTools = useMemo(
    () =>
      allTools.filter((tool) =>
        tool.label.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const favoriteTools = useMemo(
    () => allTools.filter((tool) => favorites.includes(tool.path)),
    [favorites]
  );

  return (
    <div className={`side-navbar${isCollapsed ? " collapsed" : ""}`}>
      <div className="sidebar-fixed-top">
        <div className="sidebar-heading-logo">
          <h2 className="side-navbar-header">
            <img
              src="/fuso-superhero-logo.png"
              alt="Fuso Logo"
              className="ifusionone-logo"
            />
            iFusionOne
          </h2>
          <div className="control-btns">
            <button onClick={toggleTheme} title="Toggle Theme" className="theme-toggle-btn">
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <button onClick={collapseSidebar} title="Collapse Sidebar" className="theme-toggle-btn">
              <GoSidebarCollapse />
            </button>
          </div>
        </div>

        <Link
          to="/"
          className={`side-bar-link ${location.pathname === "/" ? "active" : ""}`}
          aria-current={location.pathname === "/" ? "page" : undefined}
        >
          🏠 Home
        </Link>

        <div className="side-navbar-search" role="search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tools"
          />
        </div>
      </div>

      <div className="sidebar-scrollable">
        {favoriteTools.length > 0 && (
          <SidebarSection title="⭐ Favorites">
            {favoriteTools.map((tool) => (
              <SidebarItem
                key={tool.path}
                tool={tool}
                isActive={location.pathname === tool.path}
                isFav
                toggleFavorite={toggleFavorite}
              />
            ))}
          </SidebarSection>
        )}

        <SidebarSection title="🧰 All Tools">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => (
              <SidebarItem
                key={tool.path}
                tool={tool}
                isActive={location.pathname === tool.path}
                isFav={favorites.includes(tool.path)}
                toggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p className="no-results">No tools found matching “{search}”</p>
          )}
        </SidebarSection>
      </div>

      <footer className="sidebar-footer">
        <Link
          to="/settings"
          className={`sidebar-settings-link ${location.pathname === "/settings" ? "active" : ""}`}
          aria-current={location.pathname === "/settings" ? "page" : undefined}
        >
          <FiSettings className="settings-icon" />
          <span>Settings</span>
        </Link>
      </footer>
    </div>
  );
}

type SidebarItemProps = {
  tool: Tool;
  isActive: boolean;
  isFav: boolean;
  toggleFavorite: (path: string) => void;
};

function SidebarItem({ tool, isActive, isFav, toggleFavorite }: SidebarItemProps) {
  return (
    <div className={`side-bar-link ${isActive ? "active" : ""}`}>
      <Link
        to={tool.path}
        aria-current={isActive ? "page" : undefined}
        className="sidebar-tool-link"
      >
        {tool.label}
      </Link>
      <span
        className="favorite-icon"
        onClick={() => toggleFavorite(tool.path)}
        title={isFav ? "Unfavorite" : "Mark as favorite"}
        role="button"
        tabIndex={0}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFav}
        onKeyDown={(e) => e.key === "Enter" && toggleFavorite(tool.path)}
      >
        {isFav ? <AiFillStar color="#facc15" /> : <AiOutlineStar />}
      </span>
    </div>
  );
}

type SidebarSectionProps = {
  title: string;
  children: React.ReactNode;
};

function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="sidebar-section">
      <p className="sidebar-section-title">{title}</p>
      <div className="sidebar-search-results">{children}</div>
    </div>
  );
}
