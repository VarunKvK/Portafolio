import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react"

const AlertComponent = ({alert_title,alert_description,className}) => {
  return (
    <Alert className={className}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{alert_title}</AlertTitle>
      <AlertDescription>
        {alert_description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
