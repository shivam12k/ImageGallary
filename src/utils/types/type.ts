// utils/types/type.ts
export interface Images {
  url: string;
  alt: string;
}
export interface ImagesFreq {
  image: Images[];
  freq: number;
}
export interface SearchBarProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getImages: (key: string) => void;
  setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PhotoBoxProps {
  images: Images[];
  imgLoaded: boolean;
}
