"use client";
import React, { useState } from "react";
import axios from "axios";
import { LRUCache } from "@/utils/LRU_cache";
import { LFUCache } from "@/utils/LFU_cache";
import { Images, ImagesFreq } from "../utils/types/type";
import SearchBar from "@/components/SearchBar";
import PhotoBox from "@/components/PhotoBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cache = new LRUCache<string, Images[] | null>(5);
const cacheLf = new LFUCache<string, ImagesFreq | null>(5);
const Home = () => {
  const URL = "https://api.unsplash.com/search/photos";
  const [images, setImages] = useState<Images[] | null>(null);
  const [search, setSearch] = useState("");
  const [imgLoaded, setImgLoaded] = useState(true);
  const [isLFU, setisLFU] = useState(false);
  const IMAGE_PER_PAGE = 6;
  const id = process.env.NEXT_PUBLIC_API_KEY;
  console.log("id", id);
  const getImages = async (key: string) => {
    console.log(key);
    if (key !== "") {
      let cachedImages = null;
      if (isLFU) {
        const res = cacheLf.get(key);
        cachedImages = res?.image || null;
      } else {
        cachedImages = cache.get(key);
      }
  
      if (cachedImages) {
        console.log("cache hit");
        setImages(cachedImages);
        console.log("images in cache", cachedImages);
        setImgLoaded(true);
        toast.success(`${isLFU ? "LFU" : "LRU"} Cache hit... Updating the cache`);
      } else {
        console.log("Cache miss");
        toast.error(`${isLFU ? "LFU" : "LRU"} Cache miss... Adding in cache`);
        try {
          const response = await axios.get(
            `${URL}?query=${key}&page=1&per_page=${IMAGE_PER_PAGE}&client_id=${id}`
          );
          const fetchedImages: Images[] = response.data.results.map((img: any) => ({
            url: img.urls.small,
            alt: img.alt_description,
          })) || [];
  
          if (fetchedImages.length > 0) {
            setImages(fetchedImages);
  
            if (isLFU) {
              const valueFreq: ImagesFreq = {
                image: fetchedImages,
                freq: 0,
              };
              cacheLf.put(key, valueFreq);
            } else {
              cache.set(key, fetchedImages);
            }
  
            console.log("images after set", fetchedImages);
            setImgLoaded(true);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
  };
  

  const handleToggle = () => {
    const newIsLFU = !isLFU;
    setisLFU(newIsLFU);
    console.log("lfu", newIsLFU);
    if (newIsLFU) {
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
              {isLFU ? <>LFU</> : <>LRU</>}
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
