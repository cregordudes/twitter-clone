export default {
   name: "tweet",
   title: "Tweet",
   type: "document",
   fields: [
      {
         name: "title",
         title: "Text in Tweet",
         type: "string",
      },
      {
         name: "blockTweet",
         title: "BlockTweet",
         description: "ADMIN Controls: Toggle if Tweet is deemed inappropriate",
         type: "boolean",
      },
      {
         name: "username",
         title: "Username",
         type: "string",
      },
      {
         name: "profileImg",
         title: "Profile image",
         type: "string",
      },
      {
         name: "image",
         title: "Tweet image",
         type: "string",
      },
   ],
};
