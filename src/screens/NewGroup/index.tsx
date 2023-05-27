import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import Input from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { createGroup } from "@storage/group/createGroup";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NewGroup = () => {
  const navigation = useNavigation();

  const [group, setGroup] = useState("");

  const handleNewGroup = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "O nome do grupo não pode ser vazio");
      }
      setGroup("");
      await createGroup(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Ocorreu um erro ao criar o grupo");
        console.log(error);
      }
    }
  };
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Novo squad"
          subtitle="Crie seu squad para adicionar os jogadores"
        />
        <Input
          placeholder="Nome do squad"
          onChangeText={setGroup}
          returnKeyType="done"
          onSubmitEditing={handleNewGroup}
        />
        <Button title="Criar squad" onPressOut={handleNewGroup} />
      </Content>
    </Container>
  );
};
