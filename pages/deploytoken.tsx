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

const Deploytoken = () => {
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
      image: "",
    },
    validate: {
      description: (v) => (v !== "" ? null : "Description is required!"),
      name: (v) => (v !== "" ? null : "Token name is required!"),
      symbol: (v) => (v !== "" ? null : "Symbol is required!"),
      supply: (v) => (v !== "" ? null : "Initial supply is required!"),
      key: (v) => (v !== "" ? null : "Private key is required!"),
    },
  });
  async function createToken() {
    try {
      setIsloading(true);
      const sdk = ThirdwebSDK.fromPrivateKey("devnet", form.values.key);

      const metadata = {
        symbol: form.values.symbol,
        description: form.values.description,
        name: form.values.name,
        initialSupply: form.values.supply,
        image: form.values.image,
      };

      sdk.deployer
        .createToken(metadata)
        .then(async (addy) => {
          console.log(addy);
          console.log("Contract deployed successfully! 🎉");
          setAddress(addy);
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
        }); // submit
    } catch(e){ {
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
    }
  }
}

  const handleSubmit = form.onSubmit(() => {
    createToken();
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
          <Text size={"xl"}>Contract address:</Text>
          <Text mt={"xs"} size={"xl"}>
            {address}
          </Text>

          <Center>
            <Button
              onClick={() => {
                copy(address);
                showNotification({
                  message: "your token address was copied!",
                });
              }}
            >
              Copy{" "}
            </Button>
          </Center>
        </Modal>
      )}
      <Stack sx={{ height: "100%" }} align={"center"} justify="center">
      <h3 className="uppercase font-normal text-2xl">deploy Token on Solana</h3>
      </Stack>
      <form onSubmit={handleSubmit} className="mt-10 p-10 border border-1 flex flex-col gap-4 justify-start">
      <Stack mt={1}>
            <TextInput
              {...form.getInputProps("symbol")}
              label="Symbol"
              placeholder="Enter token symbol e.g. SOL"
            />
            <TextInput
              {...form.getInputProps("image")}
              label="Token Profile"
              placeholder="Enter token image link"
            />
            <TextInput
              {...form.getInputProps("name")}
              label="Token Name"
              placeholder="Enter token name e.g. Solana"
            />
            <TextInput
              {...form.getInputProps("description")}
              label="Description"
              placeholder="Enter your token description"
            />
            <TextInput
              {...form.getInputProps("supply")}
              type={"number"}
              label="Initial Supply"
              placeholder="Enter your token supply e.g. 10000000"
            />
            <TextInput
              placeholder="Enter your wallet private key"
              type={"password"}
              {...form.getInputProps("key")}
              label={
                <Group spacing={"xs"}>
                  <Text>Private Key</Text>
                  <Info />
                </Group>
              }
            />
            <br/>  
            <Button
              loading={isLoading}
              type="submit"
            >
              Create Token
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

Deploytoken.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Deploytoken;
