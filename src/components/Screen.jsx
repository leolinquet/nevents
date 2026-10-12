import TabBar from './TabBar.jsx'

// Standard page layout: scrollable content, optional sticky footer, tab bar.
export default function Screen({ children, footer, tab = true, activeTab }) {
  return (
    <div className="screen">
      <main className="screen-body">{children}</main>
      {footer && <div className="screen-footer">{footer}</div>}
      {tab && <TabBar active={activeTab} />}
    </div>
  )
}
