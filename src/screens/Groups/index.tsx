import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAllGroups } from "@storage/group/getAllGroups";

export function Groups() {
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("newgroup");
  }

  const [groups, setGroups] = useState<string[]>([]);

  async function fetchGroups() {
    try {
      const data = await getAllGroups();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="SQUADS" subtitle="Jogue com seu squad" />

      <FlatList
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Cadastre seu primeiro squad 🤗! " />
        )}
        data={groups}
        keyExtractor={(group) => group}
        renderItem={({ item }) => (
          <GroupCard title={item} onPressOut={() => handleOpenGroup(item)} />
        )}
      />

      <Button title="Criar novo Squad" onPressOut={handleNewGroup} />
    </Container>
  );
}
