import React from "react";
import Image from "next/image";
import { PhotoBoxProps } from "@/utils/types/type";
import Loader from "./Loader";
const PhotoBox: React.FC<PhotoBoxProps> = ({ images, imgLoaded }) => {
  return (
    <div>
         
      {imgLoaded ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {images.map((img, key) => (
            <Image
              key={key}
              src={img.url}
              alt={img.alt}
              width={500}
              height={600}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PhotoBox;
