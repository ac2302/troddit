import { useMainContext } from "../../MainContext";
import Link from "next/dist/client/link";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import Media from "../Media";
import { secondsToTime } from "../../../lib/utils";
import Image from "next/dist/client/image";
import { useState } from "react";

import { BiExit } from "react-icons/bi";
import { ImReddit } from "react-icons/im";
import { BsCardText } from "react-icons/bs";
import {
  AiOutlineShrink,
  AiOutlineExpandAlt,
  AiOutlineLink,
} from "react-icons/ai";
import TitleFlair from "../TitleFlair";
const Row1 = ({
  post,
  hasMedia,
  hideNSFW,
  score,
  vote,
  castVote,
  forceMute,
}) => {
  const [expand, setexpand] = useState(false);

  return (
    <div className="flex flex-row items-start py-1 text-sm bg-white border-l border-r border-gray-300 shadow-sm dark:bg-trueGray-900 dark:border-trueGray-700 dark:hover:border-trueGray-500 hover:border-gray-500 hover:shadow-xl ">
      {/* Votes */}
      <div>
        <div className="flex-col items-center self-start justify-start flex-none hidden h-full pt-1 w-14 md:flex">
          <BiUpvote
            onClick={(e) => castVote(e, 1)}
            className={
              (vote === 1 && "text-upvote ") +
              " flex-none cursor-pointer w-6 h-6 hover:text-upvote hover:scale-110"
            }
          />
          <p
            className={
              (vote === 1
                ? "text-upvote "
                : vote === -1
                ? "text-downvote "
                : " ") + " text-sm"
            }
          >
            {score ?? "0"}
          </p>
          <BiDownvote
            onClick={(e) => castVote(e, -1)}
            className={
              (vote === -1 && "text-downvote ") +
              " flex-none cursor-pointer w-6 h-6 hover:text-downvote hover:scale-110"
            }
          />
        </div>
      </div>
      {/* Thumbnail */}
      <div
        className={
          "relative flex items-center justify-center flex-none w-24 h-16 mt-2 rounded-md" +
          (post?.thumbnail == "self" || post?.thumbnail == "default"
            ? " border rounded-md"
            : " border border-transparent ") +
          (hideNSFW && " overflow-hidden")
        }
      >
        {post?.thumbnail !== "self" &&
        post?.thumbnail !== "default" &&
        post?.thumbnail ? (
          <div className={hideNSFW && ""}>
            <Image
              src={post?.thumbnail}
              alt=""
              layout={"fill"}
              priority={true}
              unoptimized={true}
              className={"rounded-md " + (hideNSFW && " blur")}
            ></Image>
          </div>
        ) : post?.thumbnail == "self" ? (
          <BsCardText className="w-6 h-6" />
        ) : (
          <AiOutlineLink className="w-6 h-6" />
        )}
      </div>
      <div className="flex flex-col flex-grow mt-2 ml-2">
        {/* Title */}
        <div>
          <h1 className="text-lg font-medium leading-none cursor-pointer">
            {post?.link_flair_richtext?.length > 0 && (
              <span className="text-xs">
                <TitleFlair post={post} />
                {"  "}
              </span>
            )}

            <a href={post?.permalink} onClick={(e) => e.preventDefault()}>
              {`${post?.title}  ` ?? ""}
            </a>
          </h1>
        </div>
        {/* Info */}
        <div className="flex flex-row">
          <Link href={`/r/${post?.subreddit}`}>
            <a
              className="mr-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2>r/{post?.subreddit ?? "ERR"}</h2>
            </a>
          </Link>
          <p>•</p>
          <Link href={`/user/${post?.author}`}>
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2 className="ml-1 mr-1">u/{post?.author ?? ""}</h2>
            </a>
          </Link>
          <p>•</p>

          <p className="ml-1">
            {secondsToTime(post?.created_utc, [
              "s",
              "min",
              "hr",
              "dy",
              "mo",
              "yr",
            ])}
          </p>
          {post?.over_18 && (
            <div className="flex flex-row pl-1 space-x-1">
              <p>•</p>
              <span className="text-red-400 text-color dark:text-red-700">
                NSFW
              </span>
            </div>
          )}
          <span className="ml-4 text-sm font-xs">{`(${post.domain})`}</span>
        </div>
        {/* Links */}
        <div>
          <div className="flex flex-row items-center justify-start pb-1 space-x-1">
            <button
              className={
                "flex flex-row items-center h-6 px-2 space-x-1 border rounded-md border-lightBorder dark:border-darkBorder hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight " +
                (!hasMedia &&
                  !post?.selftext_html &&
                  "opacity-0 cursor-default")
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                !(!hasMedia && !post?.selftext_html) && setexpand((s) => !s);
              }}
            >
              {hasMedia || post?.selftext_html ? (
                <>{expand ? <AiOutlineShrink /> : <AiOutlineExpandAlt />}</>
              ) : (
                <AiOutlineLink />
              )}
            </button>

            <button className="flex flex-row items-center px-2 space-x-1 border border-transparent rounded-md hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight ">
              <BiComment className="flex-none w-6 h-6 md:pr-2 " />
              <h1 className="">{`${post?.num_comments ?? "??"}`}</h1>
              <h1 className="">{`${
                post?.num_comments === 1 ? "comment" : "comments"
              }`}</h1>
            </button>
            <a
              href={`${post?.url}` ?? "https://troddit.com"}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex flex-row items-center px-2 space-x-1 border border-transparent rounded-md hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight ">
                <BiExit className="flex-none w-6 h-6 md:pr-2" />
                <h1 className="hidden md:block">Source</h1>
              </div>
            </a>
            <a
              href={`https://www.reddit.com${post?.permalink ?? ""}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex flex-row items-center px-2 space-x-1 border border-transparent rounded-md hover:border-lightBorderHighlight dark:hover:border-darkBorderHighlight ">
                <ImReddit className="flex-none w-6 h-6 md:pr-2" />
                <h1 className="hidden md:block ">Original</h1>
              </div>
            </a>
          </div>
        </div>
        {/* Hidden Media */}
        {expand && (
          <div
            className={
              "block p-1 border-gray-100 md:border-l dark:border-darkHighlight " +
              (hideNSFW && " overflow-hidden relative")
            }
          >
            <a href={post?.permalink} onClick={(e) => e.preventDefault()}>
              <div className={hideNSFW && "blur-3xl"}>
                <Media post={post} imgFull={true} allowIFrame={expand} />
              </div>
            </a>
            {hideNSFW && (
              <div className="absolute flex flex-row justify-center w-full text-white opacity-50 top-1/2">
                hidden
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Row1;
