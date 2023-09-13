import { ArrowDownIcon } from "@radix-ui/react-icons";

interface SimpleScrollDownButtonProps {
  onScroll: (behavior?: ScrollBehavior) => void;
}

const SimpleScrollDownButton = ({ onScroll }: SimpleScrollDownButtonProps) => {
  return (
    <button
      className="hover:bg-pr sticky bottom-10 left-1/2 flex h-9 w-9 flex-shrink-0 -translate-x-1/2 items-center justify-center rounded-full bg-primary p-1 text-white"
      onClick={() => onScroll("smooth")}
    >
      <ArrowDownIcon width={20} height={20} />
    </button>
  );
};

export default SimpleScrollDownButton;
