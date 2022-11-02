import { memo, MouseEvent } from "react";

interface ButtonI {
  title?: string;
  disabled?: boolean;
  ref?: React.RefObject<HTMLButtonElement>;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  title = "",
  disabled,
  ref,
  className = "",
  onClick,
}: ButtonI) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${className}`}
      onClick={(e) => onClick && onClick(e)}
    >
      {title}
    </button>
  );
}

export default memo(Button);
