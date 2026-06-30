export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-root">
      {children}
      <style>{`
        .admin-root {
          min-height: 100vh;
          background: var(--bg-primary);
        }
      `}</style>
    </div>
  )
}
