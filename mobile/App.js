import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/routes";
import { AuthProvider } from "./src/contexts/auth";

function App() {
  return(
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;