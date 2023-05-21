import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Groups() {
  const navigation = useNavigation();
  function handleNewGroup() {
    navigation.navigate("newgroup");
  }

  const [groups, setGroups] = useState([]);
  return (
    <Container>
      <Header />
      <Highlight title="SQUADS" subtitle="Junte seu squad aqui!" />

      <FlatList
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Cadastre seu primeiro squad 🤗!" />
        )}
        data={groups}
        keyExtractor={(group) => group}
        renderItem={({ item }) => <GroupCard title={item} />}
      />

      <Button title="CRIAR SQUAD" onPressOut={handleNewGroup} />
    </Container>
  );
}
