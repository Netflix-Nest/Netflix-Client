import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
interface IProps extends IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
}
export default function ButtonControl(props: IProps) {
  const { icon, onClick, ...properties } = props;
  return (
    <IconButton
      aria-label="Subtitles"
      variant="plain"
      color="white"
      size="sm"
      onClick={onClick}
      {...properties}
      _hover={{ color: "gray.300" }}>
      {icon}
    </IconButton>
  );
}
