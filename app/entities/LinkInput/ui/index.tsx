import React, {FC, useState} from "react";
import {View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {Feather, MaterialIcons} from "@expo/vector-icons";

type TFetch = {
  setStateLink: (data: string) => void;
  disableSearch: boolean;
};

const LinkInput: FC<TFetch> = ({setStateLink, disableSearch}) => {
  const [link, setLink] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (link.trim()) {
      console.log("Ищем по ссылке:", link);
      setStateLink(link);
    }
  };

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      {!link ? (
        <MaterialIcons name="link" size={24} color={isFocused ? "#007AFF" : "#aaa"} />
      ) : (
        <Feather
          name="delete"
          size={24}
          color={isFocused ? "#007AFF" : "#aaa"}
          onPress={() => setLink("")}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Add link"
        placeholderTextColor="#999"
        value={link}
        onChangeText={setLink}
        keyboardType="url"
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton} disabled={disableSearch}>
        <Feather name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  containerFocused: {
    borderColor: "#007AFF",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
});

export default LinkInput;
