import { ProfileSidebar } from '@/components/profile/ProfileSidebar'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">My Account</h1>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  )
}
