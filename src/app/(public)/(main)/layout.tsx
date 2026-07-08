import Navbar from "@/components/Navbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto mt-8 flex max-w-6xl flex-1 p-4 pt-16">
        {children}
      </main>
    </>
  )
}