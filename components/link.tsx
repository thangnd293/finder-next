import NextLink from "next/link";
import React from "react";
import ButtonBase from "./ui/button-base";

interface ILinkProps extends React.ComponentProps<typeof NextLink> {}
export default function Link(props: ILinkProps) {
  return (
    <ButtonBase variant="link" asChild>
      <NextLink {...props} />
    </ButtonBase>
  );
}
