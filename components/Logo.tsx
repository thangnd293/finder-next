import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/app"}>
      <h1 className="text-3xl font-medium text-primary">Finder</h1>
    </Link>
  );
}

export default Logo;
