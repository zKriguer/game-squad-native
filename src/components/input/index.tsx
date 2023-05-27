import { TextInputProps } from "react-native";
import { Container } from "./styles";

import { useTheme } from "styled-components/native";
import { TextInput } from "react-native/Libraries/Components/TextInput/TextInput";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};
export const Input = ({ inputRef, ...rest }: Props) => {
  const { COLORS } = useTheme();
  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
};

export default Input;
