import AsyncStorage from "@react-native-async-storage/async-storage";

import { plaeyersGetByGroup } from "./playersGetByGroup";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    //1 => Recupera do storage o Grupo(com a lista de players cadastrada)
    const storage = await plaeyersGetByGroup(group);
    //2 => Filtra todos os players.NAME dentro do group menos o playerName que foi indicado la no button
    const filtered = storage.filter((player) => player.name !== playerName);
    //3 => converte para string os players que foram filtrados
    const players = JSON.stringify(filtered);
    //4 => Grava a nova lista

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}
