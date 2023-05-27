import { Header } from "@components/Header";
import { Container, HeaderList, Form } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import Input from "@components/input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, Text, Vibration } from "react-native";
import { useEffect, useState, useRef } from "react";
import { PlayerCard } from "@components/PlayerCard/Index";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { IRoute } from "src/@types/route";
import { AppError } from "@utils/AppError";
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayersByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { TextInput } from "react-native/Libraries/Components/TextInput/TextInput";
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup";
import { removeGroupByName } from "@storage/group/removeGroupByName";
import { Loading } from "@components/Loading";

export const Players = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState("Time A");
  const route: IRoute = useRoute();

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const { group } = route.params;
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
      newPlayerNameInputRef.current?.blur();
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
      setIsLoading(true);
      const playersByTeam = await getPlayersByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Jogadores", "Não foi possível carregar os jogadores");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Jogadores", "Não foi possível remover o jogador");
    }
  }

  async function groupRemove() {
    try {
      await removeGroupByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Jogadores", "Não foi possível remover o squad");
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover grupo", "Deseja remover o grupo?", [
      { text: "Não" },
      {
        text: "Sim",
        onPress: () => {
          groupRemove();
        },
      },
    ]);
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
          inputRef={newPlayerNameInputRef}
          placeholder="Insira o nome do jogador"
          value={newPlayerName}
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType="done"
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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              onRemove={() => {
                handleRemovePlayer(item.name);
              }}
              name={item.name}
            />
          )}
          ListEmptyComponent={
            <ListEmpty message="Não há jogadores nesse time" />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Excluir squad"
        type="secondary"
        onPress={() => {
          handleGroupRemove();
        }}
      />
    </Container>
  );
};
