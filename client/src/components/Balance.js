import { Button } from "@chakra-ui/button";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBalance,
  setupVault,
  selectBalance,
  selectBalanceLoading,
  selectSettingUpVault,
} from "../features/balance/reducer";

export function Balance() {
  const dispatch = useDispatch();
  const balanceLoading = useSelector(selectBalanceLoading);
  const balance = useSelector(selectBalance);
  const settingUpVault = useSelector(selectSettingUpVault);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <HStack spacing="10px">
      <Box>
        <Text>Gold:</Text>
      </Box>
      <Box>{balanceLoading ? <Spinner /> : <Text>{balance}</Text>}</Box>
      {typeof balance === "string" && (
        <Box>
          <Button
            onClick={() => dispatch(setupVault())}
            disabled={settingUpVault}
          >
            {settingUpVault ? (
              <>
                Setting up vault <Spinner />
              </>
            ) : (
              "Set up Vault"
            )}
          </Button>
        </Box>
      )}
    </HStack>
  );
}
