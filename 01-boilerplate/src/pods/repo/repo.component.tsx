import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as vm from "./repo.vm";
import { Stars } from "./components/stars.component";
import { Language } from "./components/language.component";
import { ContributorsPod } from "../contributors/contributors.pod";

interface Props {
  data: vm.Repo;
}

export const Repo: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Pressable onPress={() => router.back()}>
            <MaterialIcons style={styles.backIcon} name="chevron-left" />
          </Pressable>
          <Text style={styles.title}>{data.name}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Stars count={data.stars} />
          <Language lang={data.language} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{data.description}</Text>
        <Text style={styles.text}>Stars: {data.stars}</Text>
        <Text style={styles.text}>Created at: {data.createdAt}</Text>
        <Text style={styles.text}>Last push: {data.pushedAt}</Text>
        <Text style={styles.text}>Topics: {data.topics.join(", ")}</Text>
      </View>
      <View style={styles.contributors}>
        <ContributorsPod
          organization={"lemoncode"}
          repositoryName={data.name}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backIcon: {
    fontSize: 36,
  },
  content: {
    padding: 10,
  },
  text: {
    fontSize: 18,
  },
  contributors: {
    padding: 10,
  },
});