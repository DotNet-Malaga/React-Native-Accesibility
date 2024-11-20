import React, { useRef } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AccessibilityInfo as A11YInfo } from "react-native";
import { Item } from "./components/item.component";
import { Repo } from "./repos.vm";

interface Props {
  list: Repo[];
}

export const Repos: React.FC<Props> = ({ list }) => {
  const [search, setSearch] = React.useState("");
  const a11yAnnouncement = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [filteredRepos, setFilteredRepos] = React.useState<Repo[]>([]);

  React.useEffect(() => {
    setFilteredRepos(
      list.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
      )
    );

    if (a11yAnnouncement.current) {
      console.log("Limpiando1");
      clearTimeout(a11yAnnouncement.current);
    }

    console.log("Ajusto el current.");
    a11yAnnouncement.current = setTimeout(() => {
      console.log("¡Ejecuto!");
      A11YInfo.announceForAccessibility(`Found ${filteredRepos.length} repos`);
      a11yAnnouncement.current = null;
    }, 500);
  }, [search, list]);

  const handleSelect = (repo: Repo) => () => {
    router.push(`/repos/${repo.name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <FontAwesome
            style={styles.icon}
            name="search"
            size={20}
            color="#fff"
            accessibilityElementsHidden={true}
          />
          <TextInput
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            accessibilityLabel="Search repository:"
          />
        </View>
      </View>
      <FlatList
        data={filteredRepos}
        renderItem={({ item }) => (
          <Item repo={item} onSelect={handleSelect(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#393939",
  },
  searchBar: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    padding: 10,
  },
});