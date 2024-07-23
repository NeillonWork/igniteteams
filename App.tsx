import { ThemeProvider } from "styled-components";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import { Groups } from "@screens/Groups";
import theme from "./src/theme/index";
import { Loading } from "@components/Loading";
import { StatusBar } from "react-native";

export default function App() {
  //fontLoad
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/*garantir o carregamento da fontes com if ternario*/}
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  );
}
