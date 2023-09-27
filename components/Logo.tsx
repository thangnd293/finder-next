import Link from "next/link";
import React from "react";

interface LogoProps extends Partial<React.ComponentProps<typeof Link>> {}
const Logo = (props: LogoProps) => {
  return (
    <Link href={"/app"} {...props}>
      <h1 className="text-3xl font-medium text-primary">Finder</h1>
    </Link>
  );
};

export default Logo;
