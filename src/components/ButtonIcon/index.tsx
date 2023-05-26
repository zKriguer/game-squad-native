import { TouchableOpacityProps } from "react-native";
import { ButtonIconStyleProps, Container, Icon } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  type?: ButtonIconStyleProps;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export const ButtonIcon = ({ icon, type = "primary", ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  );
};
