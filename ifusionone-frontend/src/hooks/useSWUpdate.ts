import { useEffect, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'

export const useSWUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setUpdateAvailable(true)
      },
      onOfflineReady() {
        console.log('PWA is ready to work offline.')
      }
    })

    return () => {
      updateSW?.()
    }
  }, [])

  return {
    updateAvailable,
    reload: () => window.location.reload()
  }
}
