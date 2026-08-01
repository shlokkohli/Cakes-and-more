const getCurrentDate = () => {
  const date = new Date()

  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()

  const today = `${dd}-${mm}-${yyyy}`

  return today
}

export default getCurrentDate
