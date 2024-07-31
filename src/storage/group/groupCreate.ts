import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    // recuperando da memoria do aparelhos
    const storedGroups = await groupsGetAll();

    //checando se newGroup ja exite
    const groupsAlreadyExists = storedGroups.includes(newGroup);

    if (groupsAlreadyExists) {
      throw new AppError("Já existe um grupo cadastrado com esse nome.");
    }

    //convertendo de objeto para texto
    const storage = JSON.stringify([...storedGroups, newGroup]);

    // gravando o que foi recuperado + os novos dados storage
    
  await AsyncStorage.setItem(GROUP_COLLECTION, storage);

    // apagar dados de teste 
   //  await AsyncStorage.clear(GROUP_COLLECTION)
  } catch (error) {
    throw error;
  }
}
