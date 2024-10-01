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
          headerShown: true, // Show the header if you want
          title: 'Add Task',
          headerTintColor: colors.whiteText, // Customize header color if needed
          headerStyle: {
            backgroundColor: colors.darkBackground,
          },
          animation: "none",
        }}
      />
    </Stack>
  );
}
