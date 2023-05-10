import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";

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
      </Content>
    </Container>
  );
};
