import { View } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import theme from "src/theme";


export function Routes() {

  return (
    <View style={{flex:1, backgroundColor: theme.COLORS.GRAY_600}}>
    <NavigationContainer >
      <AppRoutes />
    </NavigationContainer>
    </View>
  );
}
