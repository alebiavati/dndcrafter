import { VStack } from "@chakra-ui/layout";
import { Balance } from "./components/Balance";
import { Profile } from "./components/Profile";

function App() {
  return (
    <VStack spacing="20px" align="flex-start">
      <Profile />
      <Balance />
    </VStack>
  );
}

export default App;
