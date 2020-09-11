import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import appStyles from '../styles'

const ListAndTitle = ({ title, listData, Component }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={listData}
        style={styles.list}
        renderItem={({ item }) => <Component />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: appStyles.tertiaryColour,
    marginTop: 20,
    marginLeft: appStyles.leftHeaderPadding,
    marginBottom: 10,
    color: 'black',
  },
  list: {
    paddingHorizontal: appStyles.cardPadding,
  },
})

export default ListAndTitle
