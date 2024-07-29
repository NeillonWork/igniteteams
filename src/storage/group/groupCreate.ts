import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string) {
  try {
    // recuperando da memoria do aparelhos
    const storedGroups = await groupsGetAll();

    //convertendo de objeto para texto
    const storage = JSON.stringify([...storedGroups, newGroup]);

    // gravando o que foi recuperado + os novos dados storage
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}
