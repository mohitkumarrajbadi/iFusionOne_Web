import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSWUpdate } from './hooks/useSWUpdate'
import PageContainer from './components/PageContainer'
import FusoStoryPage from './pages/FusoStoryPage'
import Home from './pages/Home'
import Error from './pages/Error'
import { Analytics } from "@vercel/analytics/next"

// Define Plugin type
interface Plugin {
  name: string
  route: string
  component: React.FC
}

function App() {
  const { updateAvailable, reload } = useSWUpdate()
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [pluginRoutes, setPluginRoutes] = useState<Plugin[]>([])
  const location = useLocation()

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt as any
      promptEvent.prompt()
      promptEvent.userChoice.then(() => {
        setDeferredPrompt(null)
        setShowInstallButton(false)
      })
    }
  }

  const hideSidebarRoutes = ['/fuso-story']
  const hideSidebar = hideSidebarRoutes.includes(location.pathname)

  // Dynamically load plugins
useEffect(() => {
  const loadPlugins = async () => {
    const modules = import.meta.glob('./features/*/*.tsx', { eager: true });
    const loadedPlugins: Plugin[] = [];

    for (const path in modules) {
      const mod = modules[path] as { default: Plugin };

      // Debug check
      // console.log(`[Plugin] Path: ${path}`);
      // console.log(`[Plugin] Module Export:`, mod);

      if (
        mod?.default?.name &&
        typeof mod.default.component === 'function'
      ) {
        loadedPlugins.push(mod.default);
      } else {
        console.warn(`Invalid plugin in: ${path}`);
      }
    }
    // console.log(`[Plugin] Loaded Plugins:`, loadedPlugins);
    setPluginRoutes(loadedPlugins);
  };

  loadPlugins();
}, []);



  return (
    <PageContainer hideSidebar={hideSidebar}>
      {showInstallButton && (
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <button onClick={handleInstallClick}>📲 Install App</button>
        </div>
      )}

      {updateAvailable && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--accent)',
            color: '#fff',
            textAlign: 'center',
            borderRadius: 'var(--radius)',
            marginBottom: '1rem',
          }}
        >
          🔁 A new version is available!
          <button
            onClick={reload}
            style={{
              marginLeft: '1rem',
              backgroundColor: '#fff',
              color: 'var(--accent)',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Refresh Now
          </button>
        </div>
      )}

      <Routes>
        {/* Static route */}
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route path="/fuso-story" element={<FusoStoryPage />} />
        

        {/* Dynamically loaded routes */}
        {pluginRoutes.map((plugin) => (
          // console.log(`[Plugin] Registering route: ${plugin.route}`),
          <Route
            key={plugin.name.toLowerCase()}
            path={plugin.route}
            element={<plugin.component />}
          />
        ))}

        {/* Default home route (optional fallback) */}
        <Route path="*" element={<div>🔍 Not Found</div>} />
      </Routes>
      <Analytics />
    </PageContainer>
  )
}

export default App
