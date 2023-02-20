import * as React from "react";
import { useEffect } from "react";
import { ButtonProps, Box, HStack, Container } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useAccount } from "wagmi";
import ButtonWallet from "./ButtonWallet";

const Header: React.FC<ButtonProps> = () => {
  const { isConnected } = useAccount();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isConnected) {
      queryClient.removeQueries("ethereumBalance");
      queryClient.removeQueries("contractData");
    }
  }, [isConnected]);

  return (
    <Box as="section" pb={{ base: "2", md: "2" }}>
      <Box as="nav" alignContent="flex-end">
        <Container maxW="container.2xl" py={{ base: "3", lg: "4" }}>
          <HStack justify="end">
            <ButtonWallet />
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
