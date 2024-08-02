import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

export async function groupRemoveByName(groupDeleted: string) {
  try {
    //1=> carregando todos os grupos
    const storedGroup = await groupsGetAll();
    //2=> filtrando os grupos menos o que sera deletado
    const groups = storedGroup.filter((group) => group !== groupDeleted);
    //3=> gravando os grupos menos o que foi filtrado anteriormente
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    //4 Remover o itens que estavam vinculados ao grupo passado [groupDeleted]
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
