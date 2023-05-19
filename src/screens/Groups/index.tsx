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
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      <FlatList
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Cadastre sua primeira turma 🤗! " />
        )}
        data={groups}
        keyExtractor={(group) => group}
        renderItem={({ item }) => <GroupCard title={item} />}
      />

      <Button title="Criar nova turma" onPressOut={handleNewGroup} />
    </Container>
  );
}
