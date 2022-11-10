import Link from "next/link";

const index = () => {
  return (
    <div className="flex flex-col h-screen bg-white items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h3 className="font-semibold relative text-2xl before:absolute before:bg-teal-400 before:w-full before:h-[1px] before:bottom-0">
          EASYSOL
        </h3>
        <div className="w-[60%]  border-2 border-gray-400 shadow-lg px-10">
          <div className="flex flex-col gap-5 items-center justify-center p-10">
          <img className="w-[400px] h-[250px] shadow-lg" src="https://i.ibb.co/3NG9D6s/Desain-tanpa-judul-10.png"/>
            <p>
              Deploy your token and NFT drop contract on solana easily.
              Without coding and any command, just by filling out the form, 
              you already have your own token, NFT drop contract, and NFT drop site.

            </p>

            <Link href='/deploytoken'>
              <button className="bg-neutral-900 px-4 py-3 text-white">
                GO TO APP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
