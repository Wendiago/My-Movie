"use client";

import Image from "next/image";
import { useState } from "react";

export default function CustomImage({ alt, width, height, ...props }) {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      alt={alt} // To fix lint warning
      width={width}
      height={height}
      onError={() => setSrc("/placeholder.jpeg")}
      placeholder="blur"
      blurDataURL="/placeholder.jpeg"
    />
  );
}
