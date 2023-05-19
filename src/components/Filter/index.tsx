import { Container, Title, FilterStyleProps } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  type?: FilterStyleProps;
  isActive?: boolean;
};

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container {...rest} isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
