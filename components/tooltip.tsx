import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  Tooltip as TooltipRoot,
  TooltipTrigger,
} from "./ui/tooltip";

type TTooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipContent
>;
interface ITooltipProps extends React.ComponentProps<typeof TooltipRoot> {
  label: string;
  contentProps?: TTooltipContentProps;
  children: React.ReactNode;
}
export default function Tooltip({
  label,
  contentProps,
  children,
  disableHoverableContent,
  ...others
}: ITooltipProps) {
  return (
    <TooltipProvider disableHoverableContent delayDuration={700}>
      <TooltipRoot
        disableHoverableContent={disableHoverableContent}
        {...others}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent {...contentProps}>
            <p>{label}</p>
            {!disableHoverableContent && <TooltipArrow />}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
}
