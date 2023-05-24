import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function getAllGroups() {
  try {
    const storageGroups = await AsyncStorage.getItem(GROUP_COLLECTION);

    const groups: string[] = storageGroups ? JSON.parse(storageGroups) : [];

    return groups;
  } catch (error) {
    throw error;
  }
}
