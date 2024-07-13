import { Progress } from '../ui/progress'

const Loader = ({progress}) => {
  return (
    <div className="w-full flex items-center justify-center h-[88vh]">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <Progress value={progress} className="w-[30%] h-[.5%]" />
        </div>
      </div>
  )
}

export default Loader