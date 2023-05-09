import { TouchableOpacityProps } from "react-native";
import { Container, ButtonTypeStyleProps, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeStyleProps;
};

export const Button = ({ title, type = "primary", ...rest }: Props) => {
  return (
    <Container {...rest} type={type}>
      <Title>{title}</Title>
    </Container>
  );
};
