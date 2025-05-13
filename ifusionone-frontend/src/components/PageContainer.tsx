import Sidebar from "./Sidebar";
import { ReactNode, useState } from "react";
import "../styles/PageContainer.css";
import { GoSidebarExpand } from "react-icons/go";

interface PageContainerProps {
  children: ReactNode;
  hideSidebar?: boolean;
}

export default function PageContainer({ children, hideSidebar = false }: PageContainerProps) {
  const [isCollapsed, setCollapseSidebar] = useState(false);

  function collapseSidebar() {
    setCollapseSidebar(true);
  }

  function expandSidebar() {
    setCollapseSidebar(false);
  }

  return (
    <div className="page-container">
      {!hideSidebar && <Sidebar isCollapsed={isCollapsed} collapseSidebar={collapseSidebar} />}

      <div className={`main-content ${hideSidebar || isCollapsed ? "full-width" : ""}`}>
        <button
          onClick={expandSidebar}
          className={`sidebar-expand-btn ${!isCollapsed ? "hide" : ""}`}
        >
          <GoSidebarExpand />
        </button>
        <main className="tool-content">{children}</main>
      </div>
    </div>
  );
}
