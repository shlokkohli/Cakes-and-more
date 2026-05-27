import { CornerUpLeft } from 'lucide-react'
import Link from 'next/link'

interface BackButtonProps {
  label: string
}
const BackButton = ({ label }: BackButtonProps) => {
  return (
    <Link
      href={'/'}
      className="group flex cursor-pointer items-center justify-center gap-2 text-base text-gray-500 select-none active:text-black"
    >
      <CornerUpLeft
        height={20}
        width={20}
        className="transition-all duration-300 group-active:-translate-x-3"
      />
      <span>{label}</span>
    </Link>
  )
}

export default BackButton
