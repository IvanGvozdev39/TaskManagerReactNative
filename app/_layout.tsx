import { Stack } from "expo-router";
import colors from '../constants/Colors';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
      <Stack.Screen
        name="AddTaskScreen"
        options={{
          headerShown: true,
          title: 'Add Task',
          headerTintColor: colors.whiteText,
          headerStyle: {
            backgroundColor: colors.darkBackground,
          },
          animation: "none",
        }}
      />
    </Stack>
  );
}
