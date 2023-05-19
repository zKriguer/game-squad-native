import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "primary" | "secondary";

type Props = {
  type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  ${({ theme, type }) => css`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${
    type === "primary" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK
  }

  border-radius: 6px;
  justify-content: center;
  align-items: center;
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;
