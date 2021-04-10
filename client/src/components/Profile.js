import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfile,
  setProfileName,
  selectProfileUpdating,
} from "../features/profile/reducer";
import { fetchProfile } from "../features/profile/reducer";

export function ProfileForm() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const profileUpdating = useSelector(selectProfileUpdating);
  const [profileName, setLocalProfileName] = useState(profile.name);

  return (
    <>
      <Box>
        <Input
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
    </>
  );
}

export function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <HStack spacing="10px">
      <Box>
        <Text>Character name: </Text>
      </Box>

      {!profile && (
        <Box>
          <Text>Loading...</Text>
        </Box>
      )}

      {!!profile && <ProfileForm />}
    </HStack>
  );
}
