import { useState } from "react";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { useNavigation } from "@react-navigation/native";


export function NewGroups() {

  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate("players", { group });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input 
        placeholder="Nome da turma" 
        onChangeText={setGroup}
        value={group}
        />


        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
