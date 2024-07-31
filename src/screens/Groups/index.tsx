import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { GroupCard } from "@components/GroupCard";
import { Button } from "@components/Button";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  // vai para tela de criação de grupo
  function handleNewGroup() {
    navigation.navigate("new");
  }

  // recupera grupo criado
  async function fetchGroups() {
    try {
      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  //Abrir player passando grupo
  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  //executa ao voltar para o foco da tela
  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={()=> handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
