import React, { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import {
  Box,
  Button,
  Center,
  Container,
  FormLabel,
  Heading,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { transfer } from "../../lib/ercContracts";
import { DisconnectedPage } from "../../components/DisconnectedPage";
import { useErrorMsgStore } from "../../stores/ErrorMsgStore";
import { useTxSuccessStore } from "../../stores/txSuccessStore";
import { DetailsLink } from "../../components/DetailsLink";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { InfoContainer } from "../../components/InfoContainer";
import { checkTxErrorInputs } from "../../services/transaction/checkTxErrorInputs.service";
import { AlertMsg } from "../../components/AlertMsg";

const Transfer = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loadingTx, setLoadingTx] = useState(false);

  const { setErrorMsg } = useErrorMsgStore();
  const { setTxSuccess } = useTxSuccessStore();

  const { isConnected } = useAccount();
  const { data: signer } = useSigner();

  const handleTokenAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(e.target.value);
  };

  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleReceiverAddressInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReceiverAddress(e.target.value.trim());
  };

  const handleTransferClick = async () => {
    const errorMsg = checkTxErrorInputs(amount, tokenAddress, receiverAddress);
    if (errorMsg) {
      setAlertMsg(errorMsg);
      return;
    }
    try {
      setLoadingTx(true);
      const resp = await transfer(
        signer!,
        amount,
        tokenAddress,
        receiverAddress
      );
      await resp.wait();
      setAmount("");
      setTokenAddress("");
      setReceiverAddress("");
      setTxSuccess({
        title: "Tokens Staked Successfully",
        description: <DetailsLink hash={resp.hash} />,
      });
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setErrorMsg(errorMsg);
    }
    setLoadingTx(false);
  };

  if (!isConnected) {
    return (
      <Container maxW="container.lg" className="flex">
        <DisconnectedPage title="Transfer Tokens" />
      </Container>
    );
  }
  return (
    <Container maxW="container.lg" className="flex">
      <Center>
        <VStack mb="20px" rowGap="10px">
          <Heading
            as="h1"
            color="#0F172A"
            textAlign="center"
            fontSize="2em"
            fontWeight="500"
          >
            Transfer Tokens
          </Heading>
          <InfoContainer>
            <Box bg="gray.200" p="10px" borderRadius="0.5rem">
              <FormLabel textAlign="center">Token Address:</FormLabel>
              <Input
                placeholder="0x0000000000000000000000000000000000000000"
                type="text"
                id="tokenAddressInput"
                fontSize="0.8em"
                onChange={handleTokenAddressInput}
                value={tokenAddress}
              />
            </Box>
            <Spacer />
            <Box bg="gray.200" p="10px" borderRadius="0.5rem">
              <FormLabel textAlign="center">Token Amount:</FormLabel>
              <Input
                placeholder="10000"
                type="number"
                id="amountInput"
                fontSize="0.8em"
                onChange={handleValueInput}
                value={amount}
              />
            </Box>
            <Spacer />
            <Box bg="gray.200" p="10px" borderRadius="0.5rem">
              <FormLabel textAlign="center">Receiver Address:</FormLabel>
              <Input
                placeholder="0x0000000000000000000000000000000000000000"
                type="text"
                id="receiverAddressInput"
                fontSize="0.8em"
                onChange={handleReceiverAddressInput}
                value={receiverAddress}
              />
            </Box>
            <Spacer />
            <Box mt="-10px">
              <AlertMsg
                alertMsg={alertMsg}
                setAlertMsg={setAlertMsg}
                type="warning"
              />
            </Box>
            <Button
              colorScheme="purple"
              onClick={handleTransferClick}
              isLoading={loadingTx}
              loadingText="Transferring..."
              spinnerPlacement="end"
            >
              Transfer
            </Button>
          </InfoContainer>
        </VStack>
      </Center>
    </Container>
  );
};

export default Transfer;
