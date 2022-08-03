interface Props {
   Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
   title: string;
   onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: Props) {
   return (
      <div
         onClick={() => onClick?.()}
         className="flex items-center space-x-2 px-4 py-3 
      rounded-full  cursor-pointer transition-all duration-200 
      hover:bg-gray-100 hover:text-twitter max-w-fit"
      >
         <Icon className="h-6 w-6" />
         <p className="hidden md:inline-flex text-base font-light lg:text-xl">
            {title}
         </p>
      </div>
   );
}

export default SidebarRow;
