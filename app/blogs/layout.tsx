// FIX: Removed duplicate <Header /> — blogs/page.tsx already renders its own Header
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {children}
    </main>
  )
}
