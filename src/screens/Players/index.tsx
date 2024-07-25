import { Header } from "@components/Header";
import { Container, Form } from "./styles";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";

export function Players() {
  const [team, setTeam] = useState("Time A");

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e seare os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <FlatList
        data={["Time A", "Time B"]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Filter isActive={item === team ? true : false} title={item} onPress={() => setTeam(item)}/>
        )}
        horizontal
      />
    </Container>
  );
}
