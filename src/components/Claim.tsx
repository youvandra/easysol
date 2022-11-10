import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram,useClaimNFT } from "@thirdweb-dev/react/solana";
import React, { useState }  from "react";

export default function Claim() {
    const wallet = useWallet();

    const [programa, setProgramAddress] = useState("");

    fetch("https://concert-app-api.herokuapp.com/api/easy-sol", { method: "GET" }).then(async (res) => {
    
    var json= await res.json()
    for (let i = 0; i < json.length; i++) {
      const item = json[i];
      setProgramAddress(item.program_address)
    }
  })
  const { program } = useProgram(programa, 'nft-drop');
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);


    return (
      <div>
        {wallet.connected ? (
            // Calling the claim function and passing in the quantity we are claiming
          <button onClick={() => claim({amount: 1})}>
            Claim NFT
          </button>
        ) : (
        <h3>Connect your wallet</h3>
        )}
      </div>
    );
  }