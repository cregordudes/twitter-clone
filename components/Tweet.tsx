import React, { useEffect, useState } from "react";
import { CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";

import {
   ChatAlt2Icon,
   HeartIcon,
   SwitchHorizontalIcon,
   UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
   tweet: Tweet;
}

function Tweet({ tweet }: Props) {
   const [liked, setLiked] = useState<boolean>(false);
   const [comments, setComments] = useState<Comment[]>([]);
   const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
   const [input, setInput] = useState<string>("");
   const { data: session } = useSession();

   const refreshComments = async () => {
      const comments: Comment[] = await fetchComments(tweet._id);
      setComments(comments);
   };

   const addCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const commentToast = toast.loading("Posting Comment...");

      //Comment Logic
      const comment: CommentBody = {
         comment: input,
         tweetId: tweet._id,
         username: session?.user?.name || "Unknown user",
         profileImg: session?.user?.image || "https://links.papareact.com/gll",
      };
      const result = await fetch(`/api/addComment`, {
         body: JSON.stringify(comment),
         method: "POST",
      });
      toast.success("Comment Posted!", {
         id: commentToast,
      });
      setInput("");
      setCommentBoxVisible(false);
      refreshComments();
   };

   useEffect(() => {
      refreshComments();
   }, []);

   const updateLikes = (e: React.MouseEventHandler<SVGSVGElement>) => {
      setLiked(!liked);
   };

   let likedStyles = liked ? "text-red-500" : "";
   const likeStyle = `${likedStyles} h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150`;

   return (
      <div className="flex flex-col p-5 space-x-3 border-y border-gray-100">
         <div className="flex space-x-3">
            <img
               src={tweet.profileImg}
               alt=""
               className="h-10 w-10 rounded-full object-cover"
            />

            <div>
               <div className="flex items-baseline space-x-1">
                  <p className="mr-1 font-bold">{tweet.username}</p>
                  <p className="hidden text-sm text-gray-500 sm:inline">
                     @{tweet.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  <TimeAgo
                     date={tweet._createdAt}
                     className="text-sm text-gray-500"
                  />
               </div>
               <p className="pt-1 text-emerald-900">{tweet.title}</p>
               {tweet.image && (
                  <img
                     src={tweet.image}
                     alt=""
                     className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
                  />
               )}
            </div>
         </div>

         <div className="flex justify-between mt-5">
            <div
               className="flex cursor-pointer items-center space-x-3 text-gray-400 "
               onClick={() => {
                  session && setCommentBoxVisible(!commentBoxVisible);
               }}
            >
               <ChatAlt2Icon className="h-5 w-5" />
               <p>{comments.length}</p>
            </div>

            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
               <SwitchHorizontalIcon className="h-5 w-5" />
            </div>

            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
               <HeartIcon className={likeStyle} onClick={updateLikes} />
            </div>

            <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
               <UploadIcon className="h-5 w-5" />
            </div>
         </div>

         {/* COmment logic */}
         {commentBoxVisible && (
            <form onSubmit={addCommentHandler} className="mt-3 flex space-x-3">
               <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded-lg outline-none bg-gray-100 p-2"
                  type="text"
                  placeholder="Write a comment..."
               />
               <button
                  type="submit"
                  disabled={!input}
                  className="text-twitter disabled:text-gray-200 "
               >
                  Post
               </button>
            </form>
         )}

         {/* comment box */}
         {comments?.length > 0 && (
            <div
               className="mb-2 mt-5 max-h-44 space-y-5 overflow-y-scroll 
            border-t border-gray-100 p-5 no-scrollbar"
            >
               {comments.map((comment) => {
                  return (
                     <div key={comment._id} className="relative flex space-x-2">
                        <hr className="absolute left-5 top-10 h-8 border-x border-slate-300" />
                        <img
                           src={comment.profileImg}
                           alt=""
                           className="mt-2 h-7 w-7 rounded-full object-cover"
                        />
                        <div>
                           <div className="flex items-center space-x-2">
                              <p className="mr-1 font-bold">
                                 {comment.username}
                              </p>
                              <p className="hidden text-sm text-gray-500 lg-:inline">
                                 @
                                 {comment.username
                                    .replace(/\s+/g, "")
                                    .toLowerCase()}
                              </p>
                              <TimeAgo
                                 date={comment._createdAt}
                                 className="text-sm text-gray-500"
                              />
                           </div>
                           <p>{comment.comment}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
}

export default Tweet;
