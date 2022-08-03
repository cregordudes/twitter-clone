import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";

interface Props {
   tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
   console.log(tweets);
   return (
      <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
         <Head>
            <title>Twitter Clone</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Toaster position="top-center" reverseOrder={false} />
         <main className="grid grid-cols-9">
            <Sidebar />

            <Feed tweets={tweets} />

            <Widget />
         </main>
      </div>
   );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
   const tweets = await fetchTweets();

   return {
      props: {
         tweets,
      },
   };
};
