import { Header } from "@components/Header";
import { Container, HeaderList, Form } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import Input from "@components/input";
import { Filter } from "@components/Filter";
import { FlatList, Text, Vibration } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard/Index";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { IRoute } from "src/@types/route";

export const Players = () => {
  const [team, setTeam] = useState("Time A");
  const route: IRoute = useRoute();

  const { group } = route.params;
  const [players, setPlayers] = useState([
    "Jogador 1",
    "jogador 2",
    "jogador 3",
    "jogador 4",
    "jogador 5",
    "jogador 6",
    "jogador 7",
    "jogador 8",
    "jogador 9",
    "jogador 10",
    "jogador 11",
  ]);
  return (
    <Container>
      <Header showBackButton specificScreen={"groups"} />
      <Highlight
        title={group}
        subtitle="Adicione os jogadores e separe os times"
      />

      <Form>
        <Input placeholder="Insira o nome do jogador" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B", "Time C"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPressOut={() => {
                Vibration.vibrate(20);
                setTeam(item);
              }}
            />
          )}
          horizontal
        />
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard onRemove={() => {}} name={item} />
        )}
        ListEmptyComponent={<ListEmpty message="Não há jogadores nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover Turma" type="secondary" onPress={() => {}} />
    </Container>
  );
};
