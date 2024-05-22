"use client";
import React, { useState } from "react";
import axios from "axios";
import { LRUCache } from "@/utils/LRU_cache";
import { LFUCache } from "@/utils/LFU_cache";
import { Images, ImagesFreq } from "../utils/types/type"; // Adjust path if necessary
import SearchBar from "@/components/SearchBar";
import PhotoBox from "@/components/PhotoBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cache = new LRUCache<string, Images[] | null>(5); // Instantiate the LRUCache
const cacheLf = new LFUCache<string, ImagesFreq | null>(5);
const Home = () => {
  const URL = "https://api.unsplash.com/search/photos";
  const [images, setImages] = useState<Images[] | null>(null);
  const [search, setSearch] = useState("");
  const [imgLoaded, setImgLoaded] = useState(true);
  const [isLFU, setisLFU] = useState(true);
  const [cachedImages, setcachedImages] = useState<Images[] | null>(null);
  const IMAGE_PER_PAGE = 6;
  const getImages = async (key: string) => {
    console.log(key);
    if (key !== "") {
      if (!isLFU) {
        const res =  cacheLf.get(key);
        setcachedImages(res?.image || null);
      } else {
        const res =  cache.get(key);
        setcachedImages(res);
      }
     
      if (cachedImages) {
        console.log("cache hit");
        setImages(cachedImages);
        console.log("images in cache", images);
        setImgLoaded(true);
        toast.success(
          `${isLFU ? "LFU" : "LRU"} Cache hit... Updating the cache`
        );
      } else {
        console.log("Cache miss");
        toast.error(`${isLFU ? "LFU" : "LRU"} Cache miss... Adding in cache`);
        try {
          const response = await axios.get(
            `${URL}?query=${key}&page=1&per_page=${IMAGE_PER_PAGE}&client_id=6QJm2DVu_9QByawBlMt_1xglZBSVOS8Xv_XUWi-E6u8`
          );
          // console.log(response.data.results[0].alt_description);
          // console.log(response.data.results[0].urls);
          // console.log("response", response);
          const fetchedImages: Images[] | null = await response.data.results.map(
            (img: any) => ({
              url: img.urls.small,
              alt: img.alt_description,
            })
          ) || null;
          if (fetchedImages!=null) {
            if(fetchedImages!=null) setImages(fetchedImages);
           
            if (isLFU) {
              const ValueFreq: ImagesFreq = {
                image: fetchedImages,
                freq: 0,
              };
              cacheLf.put(key, ValueFreq);
            } else {
              cache.set(key, fetchedImages);
            }
           
            await console.log("images after set", images);
            setImgLoaded(true);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
  };

  const handleToggle = () => {
    setisLFU(!isLFU);
    if (isLFU) {
      toast("Switch to LFU cache");
    } else {
      toast("Switch to LRU cache");
    }
  };
  return (
    <main className="w-full h-screen p-8">
      <ToastContainer />
      <div className="flex flex-row justify-center">
        <h1 className="header">Image Search</h1>
        <div className="p-5">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={handleToggle}
            />
            <div
              className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-[#EEEEEE] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
             after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
             after:bg-[#222831] after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#76ABAE]"
            ></div>
            <span className="ms-3 text-xl font-medium  text-[#EEEEEE]">
              {isLFU ? <>LRU</> : <>LFU</>}
            </span>
          </label>
        </div>
      </div>
      <SearchBar
        setSearch={setSearch}
        setImgLoaded={setImgLoaded}
        getImages={getImages}
      />
      {images && <PhotoBox images={images} imgLoaded={imgLoaded} />}
    </main>
  );
};

export default Home;
