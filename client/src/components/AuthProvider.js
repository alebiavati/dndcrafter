import { Button } from "@chakra-ui/button";
import { Box, HStack, Text } from "@chakra-ui/layout";
import * as fcl from "@onflow/fcl";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/auth/reducer";
import { fetchGold } from "../features/gold/reducer";
import { fetchProfile, selectProfile } from "../features/profile/reducer";

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  useEffect(
    () =>
      fcl.currentUser().subscribe((user) => {
        if (user.addr) {
          dispatch(fetchProfile(user.addr));
          dispatch(fetchGold(user.addr));
        }

        dispatch(setUser(user));
      }),
    [dispatch]
  );

  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);

  if (user.loggedIn) {
    if (profile) {
      return children;
    } else {
      return <Text>Loading profile from blockchain...</Text>;
    }
  } else {
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
}
