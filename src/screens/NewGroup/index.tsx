import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import Input from "@components/input";
import { useNavigation } from "@react-navigation/native";

export const NewGroup = () => {
  const navigation = useNavigation();
  function handleNewSquad() {}
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Novo squad"
          subtitle="Crie seu squad para adicionar os jogadores"
        />
        <Input placeholder="Nome do squad" />
        <Button
          title="ADD NOVO SQUAD"
          onPressOut={() => {
            handleNewSquad;
          }}
        />
      </Content>
    </Container>
  );
};
