import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import Input from "@components/input";

export const NewGroup = () => {
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
        <Button title="Criar squad" />
      </Content>
    </Container>
  );
};
