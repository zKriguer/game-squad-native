import style from "styled-components/native";
import { UsersThree } from "phosphor-react-native";

export const Container = style.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.GRAY_600};
padding: 24px;
`;

export const Content = style.View`
flex: 1;
justify-content: center;
`;

export const Icon = style(UsersThree).attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_700,
  size: 56,
}))`align-self: "center"`;
