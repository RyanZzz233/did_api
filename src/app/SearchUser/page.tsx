"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { debounce } from "perfect-debounce";
import Loading1 from "@/components/loading/Loading1";

const SearchUser = () => {
  useEffect(() => {
    document.title = "Metopia | SearchUser";
  }, []);

  //@ts-expect-error
  const fetcher = (...args:any) => fetch(...args).then((res) => res.json());

  // const fetcher = debounce(async (...args) => {
  //   // @ts-expect-error
  //   const res = await fetch(...args);
  //   return res.json();
  // }, 0);

  const [inputValue, setInputValue] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, mutate, error, isLoading } = useSWR(
    searchInput ? `/api/posts?owner=${encodeURIComponent(searchInput)}` : null,
    fetcher
  );

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchInput(inputValue);
  };

  // your existing handleSubmit function

  return (
    <div className="relative">
      <div className="">
        <h1
          className={
            "relative text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter text-left pb-2 bg-gradient-to-r from-tw-purple via-tw-blue to-tw-blue text-transparent bg-clip-text"
          }
          style={{
            backgroundImage:
              "url('https://pub-3890daa6d3af4fe09ab0c284ce757dd9.r2.dev/Screen Shot 2023-07-11 at 5.27.25 PM.png')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            height: "100px",
          }}
        >
          Web3.0 DID Searcher
        </h1>

        <div className="flex flex-wrap">
          <div className="">
            <div className="">
              <h1 className="text-2xl pb-8 text-apple-black font-light">
                All DID owned by wallet address
              </h1>
              <div className="pb-8">
                <input
                  type="text"
                  placeholder="Enter a Username"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="
                  pl-4 pr-4
                  py-2
                  text-sm
                  bg-white
                  border
                  border-gray-300
                  rounded
                  focus:outline-none
                  focus:ring-2
                  focus:ring-apple-black
                  focus:border-transparent
                  shadow-sm"
                />
                <button className="
                  ml-4
                  py-2
                  px-4
                  bg-blue-500
                  text-white
                  rounded
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                  focus:border-transparent
                  shadow-sm"
                onClick={handleSearch}>Search</button>
              </div>
              {isLoading ? (
                <Loading1 />
              ) : (
                data?.map((post: any) => (
                  <div className="flex items-center pb-4" key={post._id}>
                    <div className="">
                      {/* <img
                        src={post.img}
                        alt=""
                        className="w-full h-32 object-contain"
                      /> */}
                    </div>

                    <div className="flex">
                      <h2 className="text-lg text-apple-black font-light">
                        DID: {post.domain}
                      </h2>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
