import { Header } from "@/components/header"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
    </>
  )
}
