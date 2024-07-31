import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { plaeyersGetByGroup } from "@storage/player/playersGetByGroup";
import { plaeyersGetByGroupAndTeams } from "@storage/player/playersGetbyGroupAndTeams";

import { Container, Form, HeaderList, NumbersOffPlayers } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  //Recebendo parametro da pagina NewGroup, o Hook => group
  const route = useRoute();
  //Desconstruindo o `route`
  const { group } = route.params as RouteParams;

  // ADD Nova pessoa
  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar"
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      const players = await plaeyersGetByGroup(group);

      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert("Nova pessoa", "Não foi possivel adicionar");
      }
    }
  }

  // Carregando lista de pessoas por Time
  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await plaeyersGetByGroupAndTeams(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      {/* Lista de times*/}
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              isActive={item === team ? true : false}
              title={item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOffPlayers>{players.length}</NumbersOffPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard title={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não a pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button type="SECONDARY" title="Remover turma" />
    </Container>
  );
}
