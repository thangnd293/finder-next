import {
  TooltipContent,
  TooltipProvider,
  Tooltip as TooltipRoot,
  TooltipTrigger,
} from "./ui/tooltip";

interface ITooltipProps {
  label: string;
  children: React.ReactNode;
}
export default function Tooltip({ label, children }: ITooltipProps) {
  return (
    <TooltipProvider disableHoverableContent delayDuration={700}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
