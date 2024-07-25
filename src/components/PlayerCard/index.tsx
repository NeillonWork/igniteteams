import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Icon, Name } from "./styles";

type Props = {
  title: string;
  onRemove:() => void;
};

export function PlayerCard({ title, onRemove }: Props) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{title}</Name>

      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  );
}
