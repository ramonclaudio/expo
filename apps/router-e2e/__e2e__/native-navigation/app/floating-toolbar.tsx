import { FloatingToolbar } from 'expo-router/unstable-floating-toolbar';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

export default function FloatingToolbarScreen() {
  const [variant, setVariant] = useState<'standard' | 'vibrant'>('standard');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        contentInsetAdjustmentBehavior="automatic">
        <Text testID="floating-toolbar-title">Floating Toolbar E2E Test Screen</Text>
        <Text>Current variant: {variant}</Text>
      </ScrollView>
      <FloatingToolbar position="bottom" variant={variant}>
        <FloatingToolbar.Button
          icon={{ drawable: 'ic_menu_edit' }}
          accessibilityLabel="edit-button"
          onPress={() => Alert.alert('Edit pressed!')}
        />
        <FloatingToolbar.Button
          icon={{ drawable: 'ic_menu_share' }}
          accessibilityLabel="share-button"
          onPress={() => Alert.alert('Share pressed!')}
        />
        <FloatingToolbar.Spacer />
        <FloatingToolbar.Button
          icon={{ drawable: 'ic_menu_delete' }}
          accessibilityLabel="delete-button"
          onPress={() => Alert.alert('Delete pressed!')}
        />
        <FloatingToolbar.Button
          icon={{ drawable: 'ic_menu_rotate' }}
          accessibilityLabel="variant-button"
          onPress={() => setVariant((v) => (v === 'standard' ? 'vibrant' : 'standard'))}
        />
      </FloatingToolbar>
    </View>
  );
}
