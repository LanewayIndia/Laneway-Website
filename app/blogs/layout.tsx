import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
      <Footer />
    </>
  )
}
