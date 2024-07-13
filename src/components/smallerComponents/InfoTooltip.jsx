import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const InfoTooltip = ({info}) => {
  return (
    <div className="">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-6"/>
        </TooltipTrigger>
        <TooltipContent>
          <p>{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
  )
}

export default InfoTooltip