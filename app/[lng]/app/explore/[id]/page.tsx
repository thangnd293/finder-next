import React from "react";

export default function ExplorePage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return <div>Explore with {id}</div>;
}
