import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { Ionicons } from '@expo/vector-icons'
import styles from '../Styles/SearchStyle'

const Search = () => {
  const [search, setSearch] = useState('');
  const { newsUser } = useContext(AuthContext);

  const data = [
    {
      id: 1,
      username: 'Ali',
      no: '+905510623162',
    },
    {
      id: 2,
      ...newsUser
    }
  ].filter(Boolean);

  const filteredData = data.filter(item =>
    item?.username?.toLowerCase().includes(search.toLowerCase())
  );

  const showList = search.trim().length > 0 && filteredData.length > 0;

  return (
    <View>
      <FlatList
        data={showList ? filteredData : []}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListHeaderComponent={(
          <View style={styles.container}>
            <View style={styles.bodyContainer}>
              <Ionicons name='search-outline' size={20} style={{ left: 10 }} />
              <TextInput
                style={styles.searchInput}
                placeholder='Ara'
                placeholderTextColor='gray'
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Arama kutusu boşsa ya da sonuç bulunamazsa */}
            {(search.trim().length === 0 || filteredData.length === 0) && (
              <View style={styles.alertContainer}>
                <Text style={styles.alertText}>Burada bir şey görünmüyor</Text>
                <Ionicons name='alert-circle-outline' size={20} style={styles.alertIcons} />
              </View>
            )}
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16 }}>{item.username}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default Search
