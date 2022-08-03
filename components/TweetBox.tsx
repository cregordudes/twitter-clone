import React, { useRef, useState } from "react";

import {
   CalendarIcon,
   EmojiHappyIcon,
   LocationMarkerIcon,
   PhotographIcon,
   SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";
import { json } from "stream/consumers";

interface Props {
   setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
   const { data: session } = useSession();

   const [input, setinput] = useState<string>("");
   const [image, setImage] = useState<string>("");

   const imageInputRef = useRef<HTMLInputElement>(null);
   const [imageUrlBoxIsOpen, setimageUrlBoxIsOpen] = useState<Boolean>(false);

   const addImageToTweet = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => {
      e.preventDefault();

      if (!imageInputRef.current?.value) return;

      setImage(imageInputRef.current.value);
      imageInputRef.current.value = "";
      setimageUrlBoxIsOpen(false);
   };

   const postTweet = async () => {
      const tweetInfo: TweetBody = {
         title: input,
         username: session?.user?.name || "Unauthorised user",
         profileImg: session?.user?.image || "/public/images/blankUser1.png",
         image: image,
      };
      const result = await fetch(`/api/addTweet`, {
         body: JSON.stringify(tweetInfo),
         method: "POST",
      });
      const json = await result.json();

      const newTweets = await fetchTweets();
      setTweets(newTweets);

      toast("Tweet Posted", {
         icon: "📨", //"👨‍💻",
      });

      return json;
   };

   const handleSubmit = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => {
      e.preventDefault();
      postTweet();

      setinput("");
      setImage("");
      setimageUrlBoxIsOpen(false);
   };

   return (
      <div className="flex space-x-2 p-5">
         <img
            className="h-14 w-14 object-cover rounded-full mt-4"
            src={session?.user?.image || "/images/blankUser1.png"}
            alt=""
         />

         <div className="flex flex-1 item-center pl-2">
            <form className="flex flex-1 flex-col">
               <input
                  type="text"
                  placeholder="Tweet something!"
                  className="h-24 w-full text-xl  outline-none placeholder:text-xl"
                  value={input}
                  onChange={(e) => setinput(e.target.value)}
               />
               <div className="flex items-center">
                  <div className="flex space-x-2 text-twitter  flex-1">
                     <PhotographIcon
                        onClick={() => setimageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                        className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                     />
                     <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                     <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                     <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                     <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                  </div>

                  <button
                     disabled={!input || !session}
                     className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-50"
                     onClick={handleSubmit}
                  >
                     Tweet
                  </button>
               </div>
               {imageUrlBoxIsOpen && (
                  <form className="mt-5 flex rounded-lg bg-twitter/80 px-4 py-2">
                     <input
                        ref={imageInputRef}
                        type="text"
                        placeholder="Enter image URL"
                        className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                     />
                     <button
                        type="submit"
                        onClick={addImageToTweet}
                        className="font-bold text-white"
                     >
                        Add Image
                     </button>
                  </form>
               )}
               {image && (
                  <img
                     className="mt-10 h-40 w-full rounded-xl object-contain"
                     src={image}
                     alt=""
                  />
               )}
            </form>
         </div>
      </div>
   );
}

export default TweetBox;
