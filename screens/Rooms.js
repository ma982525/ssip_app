import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ListComponentsButton } from '../components/ListComponentsButton.js';
import styles from '../const/styles';
import COLORS from '../const/colors';
import AddHeaderButton from '../components/AddHeaderButton';

export default function RoomsScreen() {
  return (
    <ScrollView style={
      { flex: 1 },
      { backgroundColor: COLORS.white }}>
      <AddHeaderButton text="All Room" />

      <ScrollView style={styles.SettingStyle}>
        <ListComponentsButton
          buttonTitle="LIVING ROOM"
          btnType="sofa"
          btnColor={COLORS.theme}
        />
        <ListComponentsButton
          buttonTitle="BED ROOM"
          btnType="bed"
          btnColor={COLORS.theme}
        />

        <ListComponentsButton
          buttonTitle="KITCHEN"
          btnType="food"
          btnColor={COLORS.theme}
        />
      </ScrollView>
    </ScrollView>
  );
}
