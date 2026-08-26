interface IngridentsIconProps {
  type: string[]
}

const IngridentsIcon = ({ type }: IngridentsIconProps) => {
  return (
    <div className="mt-3 max-w-20 rounded-full bg-[#EEEBE4] p-2 transition-transform duration-300 hover:scale-105">
      <p className="text-sm text-black">{type}</p>
    </div>
  )
}

export default IngridentsIcon
