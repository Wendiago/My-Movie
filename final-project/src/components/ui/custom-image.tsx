"use client";

import Image from "next/image";
import { useState } from "react";

type CustomImageProps = React.ComponentProps<typeof Image> & {
  errorSrc?: string;
  placeholderSrc?: string;
  usePlaceholder?: boolean;
};

export default function CustomImage({
  src,
  alt,
  width,
  height,
  errorSrc = "/placeholder.jpeg", // Default error image
  placeholderSrc = "/placeholder.jpeg", // Default placeholder image
  usePlaceholder = true,
  ...props
}: CustomImageProps) {
  const [source, setSrc] = useState(src);

  return (
    <Image
      {...props}
      src={source}
      alt={alt}
      width={width}
      height={height}
      onError={() => setSrc(errorSrc)}
      {...(usePlaceholder && {
        placeholder: "blur",
        blurDataURL: placeholderSrc,
      })}
    />
  );
}
