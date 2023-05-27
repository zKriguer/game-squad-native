import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION, GROUP_COLLECTION } from "@storage/storageConfig";

import { getAllGroups } from "./getAllGroups";

export async function removeGroupByName(groupName: string) {
  try {
    const storedGroups = await getAllGroups();

    const filteredGroups = storedGroups.filter((group) => group !== groupName);

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(filteredGroups)
    );
  } catch (error) {
    throw error;
  }
}
