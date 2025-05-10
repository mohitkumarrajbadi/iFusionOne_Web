import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSWUpdate } from './hooks/useSWUpdate'
import PageContainer from './components/PageContainer'
import Home from './pages/Home'
import Converters from './features/converters/Converters'
import Formatters from './features/formatters/Formatters'
import DiffTools from './features/difftools/DiffTools'
import Settings from './pages/Settings'
import Error from './pages/Error'
import RegexTools from './features/regextools/RegexTools'
import Generators from './features/generators/Generators'
import EncoderDecoder from './features/encoderdecoder/EncoderDecoder'
import SchemaViewer from './features/schemaviewer/SchemaViewer'
import FusoStoryPage from './pages/FusoStoryPage'

function App() {
  const { updateAvailable, reload } = useSWUpdate()
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
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

  // Hide sidebar only for FusoStoryPage
  const hideSidebarRoutes = ['/fuso-story']
  const hideSidebar = hideSidebarRoutes.includes(location.pathname)

  return (
    <PageContainer hideSidebar={hideSidebar}>
      {showInstallButton && (
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <button onClick={handleInstallClick}>
            📲 Install App
          </button>
        </div>
      )}

      {updateAvailable && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--accent)',
          color: '#fff',
          textAlign: 'center',
          borderRadius: 'var(--radius)',
          marginBottom: '1rem'
        }}>
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
              cursor: 'pointer'
            }}
          >
            Refresh Now
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converters" element={<Converters />} />
        <Route path="/formatters" element={<Formatters />} />
        <Route path="/diff-tools" element={<DiffTools />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/error" element={<Error />} />
        <Route path="/regex-tools" element={<RegexTools />} />
        <Route path="/generators" element={<Generators />} />
        <Route path="/encoderdecoder" element={<EncoderDecoder />} />
        <Route path="/schema-viewer" element={<SchemaViewer />} />
        <Route path="/fuso-story" element={<FusoStoryPage />} />
      </Routes>
    </PageContainer>
  )
}

export default App
