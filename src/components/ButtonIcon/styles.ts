import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonIconStyleProps = "primary" | "secondary";

import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  type: ButtonIconStyleProps;
};

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === "primary" ? theme.COLORS.GREEN_500 : theme.COLORS.RED,
}))``;

export const Form = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  flex-direction: row;
  justify-content: center;
  border-radius: 6px;
`;
