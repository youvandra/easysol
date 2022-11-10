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
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import { showNotification } from "@mantine/notifications";
import { MdInfoOutline } from "react-icons/md";
import React, { useState } from "react";


const CreateSite = () => {
  const { copy } = useClipboard();
  const [programAddress, setprogramAddress] = useState("");
  const [programName, setprogramName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  let handleSubmit = async () => {
    try {
      let res = await fetch("https://concert-app-api.herokuapp.com/api/easy-sol", {
        method: "POST",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({
          "project_name":programName,
          "program_address":programAddress,
          "price":price,
          "showcase_image":image,
          "slug":programName
      }),
      });
      console.log(res.body)
      if (res.status == 200) {
        setprogramName("");
        setprogramAddress("");
        setImage("");
        setPrice("");
        setMessage("")
        
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    setLink(programAddress);
    open();
  };
  return (
    <div>
      <Stack sx={{ height: "100%" }} align={"center"} justify="center">
      <h3 className="uppercase font-normal text-2xl">Create NFT Drop Site</h3>
      </Stack>
      <div className="mt-10 p-10 border border-1 flex flex-col gap-4 justify-start" onSubmit={()=> ()=>{}}>
        <Stack mt={1}>
          
        <TextInput
            label="Program Address" 
            value={programAddress}
            onChange={(e) => setprogramAddress(e.target.value)}
            placeholder="Enter Your Program Address" 
            />
        <TextInput
          label="NFTs Name" 
            value={programName}
            onChange={(e) => setprogramName(e.target.value)}

          placeholder="Enter Your NFT Name" 
          />
        <TextInput
          type={"number"}
          label="Price/NFT"
            value={price}
            onChange={(e) => setPrice(e.target.value)}

          placeholder="Enter Your Price per NFT"
          />
        <TextInput
          label="Link Showcase Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}

          placeholder="Enter Your Link Showcase Image"
        />

        <Button onClick={()=>handleSubmit()} extendClass="mt-4">
          Create NFT Drop
          </Button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </Stack>
        {opened && (
        <Modal
          title={"NFT Drop site has been created"}
          closeOnClickOutside={false}
          onClose={close}
          opened={opened}
        >
          <Text size={"xl"}>Link NFT Drop:</Text>
          <Text mt={"xs"} size={"xl"}>
            https://easysolsite.vercel.app/{link}
          </Text>

          <Center>
            <Button
              onClick={() => {
                copy(link);
                showNotification({
                  message: "your NFT Drop address was copied!",
                });
              }}
            >
              Copy{" "}
            </Button>
          </Center>
        </Modal>
      )}
      </div>
    </div>
  );
};

CreateSite.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default CreateSite;
