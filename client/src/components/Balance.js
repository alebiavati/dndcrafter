import { Box, Text, Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useSelector } from "react-redux";
import { selectBalance, selectBalanceLoading } from "../features/gold/reducer";

export function Balance() {
  const balanceLoading = useSelector(selectBalanceLoading);
  const balance = useSelector(selectBalance);

  return (
    <Center mt="20px">
      <Box>{balanceLoading ? <Spinner /> : <Text>Gold: {balance}</Text>}</Box>
    </Center>
  );
}
