import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumbersOffPlayers } from "./styles";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";

type RouteParams ={
  group: string
}

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([
    //"Neillon",
    //"Marina",
    //"Bruno",
    //"Solange",
    //"Naillon",
    //"Toninho",
    //"Carlos",
    //"Andreia",
  ]);

  //Recebendo parametro da pagina NewGroup, o Hook => group
  const route = useRoute();
  //Desconstruindo o `route`
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard title={item} onRemove={() => {}} />
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
