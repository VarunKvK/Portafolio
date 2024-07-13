import { Badge } from "@/components/ui/badge"


const BadgeContainer = ({children}) => {
  return (
    <Badge variant="outline" className="py-1">{children}</Badge>
  )
}

export default BadgeContainer