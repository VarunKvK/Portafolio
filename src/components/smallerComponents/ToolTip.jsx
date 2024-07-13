import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ToolTip = ({ projectDescription, projectTitle, children,projectUrl }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-1">
            <p className="font-normal">Project:</p>
            <p className="font-semibold">{projectTitle}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-normal">Url:</p>
            <p className="font-semibold">{projectUrl}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
