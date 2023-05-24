import { useNavigation } from "@react-navigation/native";
import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
  specificScreen?: any;
};

export function Header({ showBackButton = false, specificScreen }: Props) {
  const navigation = useNavigation();

  const handleGoBackNavigation = () => {
    specificScreen ? navigation.navigate(specificScreen) : navigation.goBack();
  };

  return (
    <Container>
      {showBackButton && (
        <BackButton onPressOut={handleGoBackNavigation}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
