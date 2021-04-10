import { Button } from "@chakra-ui/button";
import { Box, HStack, Text } from "@chakra-ui/layout";
import * as fcl from "@onflow/fcl";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/auth/reducer";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  useEffect(
    () =>
      fcl.currentUser().subscribe((user) => {
        dispatch(setUser(user));
      }),
    [dispatch]
  );

  const user = useSelector(selectUser);

  if (!user.loggedIn) {
    return (
      <>
        <HStack spacing="10px">
          <Box>
            <Button onClick={fcl.logIn}>Log In</Button>
          </Box>
          <Box>
            <Button onClick={fcl.signUp}>Sign Up</Button>
          </Box>
        </HStack>
      </>
    );
  }

  return (
    <Box>
      <HStack spacing="5px" mb="1rem">
        <Box>
          <Text>
            Logged in as <strong>{user.name ? user.name : user.addr}</strong>
          </Text>
        </Box>
        <Box>
          <Text>
            • Not you?{" "}
            <Button onClick={fcl.unauthenticate} variant="link">
              Log Out
            </Button>
          </Text>
        </Box>
      </HStack>
      {children}
    </Box>
  );
}
