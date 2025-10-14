import { formatISO } from 'date-fns'

type Props = {
  date: Date
}
export default function FormatDate({ date }: Props) {
  // Norwegian date format: DD.MM.YYYY
  const norwegianDate = date.toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <time dateTime={formatISO(date)}>
      <span className="text-muted-foreground">{norwegianDate}</span>
    </time>
  )
}
