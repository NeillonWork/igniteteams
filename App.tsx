import { ThemeProvider } from "styled-components/native";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import theme from "./src/theme/index";
import { Loading } from "@components/Loading";
import { StatusBar } from "react-native";
import { Routes } from "src/routes";


export default function App() {
  //fontLoad
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/*garantir o carregamento da fontes com if ternario */}
      {fontsLoaded ? <Routes /> : <Loading />}

      
    </ThemeProvider>
  );
}
