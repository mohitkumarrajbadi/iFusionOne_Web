import Sidebar from './Sidebar'
import { ReactNode } from 'react'
import '../styles/PageContainer.css'

interface PageContainerProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

export default function PageContainer({ children, hideSidebar = false }: PageContainerProps) {
  return (
    <div className="page-container">
      {!hideSidebar && <Sidebar />}
      <div className={`main-content ${hideSidebar ? 'full-width' : ''}`}>
        <main className="tool-content">
          {children}
        </main>
      </div>
    </div>
  )
}
