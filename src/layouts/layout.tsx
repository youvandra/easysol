import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";

const Routes = [
  {
    url: "/deploytoken",
    title: "Deploy Token",
  },
  {
    url: "/deploynftdrop",
    title: "Deploy NFT Drop",
  },
  {
    url: "/createnftsite",
    title: "Create NFT Site",
  },
];

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <header className=" bg-black  p-5 text-start text-white text-md uppercase font-thin">
        <div className="container flex gap-4">
          {Routes.map((route, i) => (
            <Link href={route.url} key={i}>
              <span
                className={`hover:text-cyan-400 cursor-pointer relative ${
                  router.pathname === route.url
                    ? "text-cyan-400 before:absolute before:bg-teal-400 before:w-full before:h-[1px] before:-bottom-1"
                    : ""
                }`}
              >
                {route.title}
              </span>
            </Link>
          ))}
        </div>
      </header>
      <div className="container p-10">{children}</div>
    </>
  );
};

export default Layout;
