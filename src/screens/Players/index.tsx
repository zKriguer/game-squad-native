import { Header } from "@components/Header";
import { Container, HeaderList, Form } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import Input from "@components/input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, Text, Vibration } from "react-native";
import { useEffect, useState } from "react";
import { PlayerCard } from "@components/PlayerCard/Index";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";
import { IRoute } from "src/@types/route";
import { AppError } from "@utils/AppError";
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayersByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

export const Players = () => {
  const [team, setTeam] = useState("Time A");
  const route: IRoute = useRoute();

  const { group } = route.params;
  [];
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  async function handleAddNewPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Novo jogador", "Digite o nome do jogador");
    }

    const newPlayer = {
      name: newPlayerName,
      team: team,
    };

    try {
      await addPlayerByGroup(newPlayer, group);
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo jogador", error.message);
      } else {
        console.log(error);
        Alert.alert("Novo jogador", "Não foi possível adicionar o jogador");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Jogadores", "Não foi possível carregar os jogadores");
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton specificScreen={"groups"} />
      <Highlight
        title={group}
        subtitle="Adicione os jogadores e separe os times"
      />

      <Form>
        <Input
          placeholder="Insira o nome do jogador"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon
          icon="add"
          onPressOut={() => {
            Vibration.vibrate(20);
            handleAddNewPlayer();
          }}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard onRemove={() => {}} name={item.name} />
        )}
        ListEmptyComponent={<ListEmpty message="Não há jogadores nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Excluir squad" type="secondary" onPress={() => {}} />
    </Container>
  );
};
