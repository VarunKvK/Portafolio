'use client'
import { useParams } from 'next/navigation'

const page = () => {
    const {template_id}=useParams()
  return (
    <div>{template_id}</div>
  )
}

export default page