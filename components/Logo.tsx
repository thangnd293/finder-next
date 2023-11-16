import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps extends Partial<React.ComponentProps<typeof Link>> {}
const Logo = (props: LogoProps) => {
  return (
    <Link href={"/app"} {...props}>
      <div className="relative aspect-[200/58] w-24 md:w-32">
        <Image
          className="select-none"
          draggable="false"
          alt="Finder"
          src="/images/logo.png"
          fill
        />
      </div>
    </Link>
  );
};

export default Logo;
