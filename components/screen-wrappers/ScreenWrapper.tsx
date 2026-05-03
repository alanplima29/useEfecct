import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  padding?: number;
  center?: boolean;
  gap?: number;
};

export default function ScreenWrapper({
  children,
  padding = 20,
  center = false,
  gap,
}: Props) {
  const centerStyle: ViewStyle = center
    ? {
        justifyContent: 'center',
        alignItems: 'center',
      }
    : {};

  return (
    <View style={[styles.container, { padding, gap }, centerStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});