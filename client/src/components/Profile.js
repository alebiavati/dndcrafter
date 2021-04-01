import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import * as fcl from "@onflow/fcl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfile,
  setProfileName,
  selectProfileUpdating,
} from "../features/profile/reducer";

export function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const profileUpdating = useSelector(selectProfileUpdating);
  const [profileName, setLocalProfileName] = useState(profile.name);

  return (
    <VStack>
      <HStack spacing="10px">
        <Box>
          <Text>Welcome</Text>
        </Box>
        <Box>
          <Input
            placeholder="Profile name"
            defaultValue={profileName}
            onChange={(event) => setLocalProfileName(event.target.value)}
          />
        </Box>
        <Box>
          <Button
            onClick={() => dispatch(setProfileName(profileName))}
            disabled={
              profile.name === profileName || profileUpdating || !profileName
            }
          >
            {profileUpdating ? (
              <>
                ✍️ Writing to ledger <Spinner />
              </>
            ) : (
              "Update"
            )}
          </Button>
        </Box>
      </HStack>
      <Box>
        <Text>
          Not you?{" "}
          <Button onClick={fcl.unauthenticate} variant="link">
            Log Out
          </Button>
        </Text>
      </Box>
    </VStack>
  );
}
