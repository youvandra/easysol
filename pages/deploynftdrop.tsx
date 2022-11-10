import Button from "@components/Button";
import Layout from "@layout";
import { ReactNode } from "react";
import {
  Center,
  Container,
  Group,
  Header,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { showNotification } from "@mantine/notifications";
import { MdInfoOutline } from "react-icons/md";
import React, { useState } from "react";
import { SignatureDrop, SignatureDropInitializer } from "@thirdweb-dev/sdk";


const DeployNFTDrop = () => {
  const { copy } = useClipboard();
  const [isLoading, setIsloading] = useState(false);
  const [address, setAddress] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      symbol: "",
      name: "",
      description: "",
      supply: "",
      key: "",
      price: "",
      meta: "",
    },
    validate: {
      description: (v) => (v !== "" ? null : "Description is required!"),
      name: (v) => (v !== "" ? null : "NFT name is required!"),
      symbol: (v) => (v !== "" ? null : "Symbol is required!"),
      supply: (v) => (v !== "" ? null : "Item Available is required!"),
      key: (v) => (v !== "" ? null : "Private key is required!"),
      price: (v) => (v !== "" ? null : "Price key is required!"),
      meta: (v) => (v !== "" ? null : "Metadata is required!"),
    },
  });  
  async function createProgram() {
    try {
      setIsloading(true);
      const sdk = ThirdwebSDK.fromPrivateKey("devnet", form.values.key);

      const metadata = {
        symbol: form.values.symbol,
        description: form.values.description,
        name: form.values.name,
        totalSupply: form.values.supply,
      };

      // const metadata1 = JSON.parse(form.values.meta);

      sdk.deployer
        .createNftDrop(metadata)
        .then(async (addy) => {
          console.log(addy);
          console.log(JSON.parse(form.values.meta))
          console.log("Contract deployed successfully! 🎉");
          setAddress(addy);
          const program = sdk.getNFTDrop(address);
          (await program).lazyMint(JSON.parse(form.values.meta))
          console.log(form.values.meta);
          (await program).claimConditions.set({
            maxClaimable: form.values.supply,
            price: form.values.price,
            startTime: new Date(),
          })
          console.log("NFT Uploaded")
          console.log("NFT Drop is Live!!!")
          open();
        })
        .catch((e) => {
          console.log("Contract was not deployed");
          console.log(e.message);
          if (
            e.message.includes(
              "Attempt to debit an account but found no record of a prior credit"
            )
          ) {
            showNotification({
              message: <Text weight={500}>Insuficient credit!</Text>,
              color: "red",
            });
          }
        })
        .finally(() => {
          setIsloading(false);
        });
      
        // submit
    } catch(e){ 
      if (e instanceof Error) {
        if (e.message.includes("key"))
        showNotification({
          message: <Text weight={500}>Invalid private key!</Text>,
          color: "red",
        });
      setIsloading(false);
      }
      else{
        console.log('Unexpected error', e)
    }
  } finally{
    setIsloading(false);
  }
}


  const handleSubmit = form.onSubmit(() => {
    createProgram();
  });

  return (
    <div>
      {opened && (
        <Modal
          title={"Contract deployed successfully"}
          closeOnClickOutside={false}
          onClose={close}
          opened={opened}
        >
          <Text size={"xl"}>Program address:</Text>
          <Text mt={"xs"} size={"xl"}>
            {address}
          </Text>

          <Center>
            <Button
              onClick={() => {
                copy(address);
                showNotification({
                  message: "your program address was copied!",
                });
              }}
            >
              Copy{" "}
            </Button>
          </Center>
        </Modal>
      )}
      <Stack sx={{ height: "100%" }} align={"center"} justify="center">
      <h3 className="uppercase font-normal text-2xl">Deploy NFT Drop on Solana</h3>
      </Stack>
      <form onSubmit={handleSubmit} className="mt-10 p-10 border border-1 flex flex-col gap-4 justify-start">
      <Stack mt={1}>
        <TextInput
          {...form.getInputProps("name")} 
          label="NFTs Name" 
          placeholder="Enter Your NFT Name" 
        />
        <TextInput
         {...form.getInputProps("symbol")} 
          label="Symbol" 
          placeholder="Enter Your NFT Symbol" 
        />
        <TextInput
          {...form.getInputProps("description")}
          label="Description"
          placeholder="Enter Your NFT Description"
        />
        <TextInput
          {...form.getInputProps("supply")}
          type={"number"}
          label="Item Available"
          placeholder="Enter Your NFT Available"
        />
        <TextInput
          {...form.getInputProps("price")}
          type={"number"}
          label="Price per NFT"
          placeholder="Enter Your Price"
        />
        <TextInput
          {...form.getInputProps("key")}
          type={"password"}
          label={
            <Group spacing={"xs"}>
              <Text>Private Key</Text>
              <Info />
            </Group>
          }
          placeholder="Enter Your Private Key"
        />
        <Textarea
          {...form.getInputProps("meta")}
          label="Metadata"
          placeholder={`e.g.  
          {
            "name": "My NFT",
            "description": "This is my NFT",
            "image": "https://ipfs.io/ipfs/Qm.png"
          }`}
          minRows={2}
        />

        <Button type="submit" extendClass="mt-4">
          Create NFT Drop
        </Button>
        </Stack>
      </form>
    </div>
  );
}

function Info() {
  return (
    <Tooltip
      label="Private key will not enter to our database"
      position="top-end"
      withArrow
      transition="pop-bottom-right"
    >
      <Text color="dimmed" sx={{ cursor: "help" }}>
        <Center>
          <MdInfoOutline size={16} />
        </Center>
      </Text>
    </Tooltip>
  );
}

DeployNFTDrop.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default DeployNFTDrop;
