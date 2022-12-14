import React, { useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { changeSearchText } from "../Components/redux/musicSlice";
//import PlaylistCard from "./PlaylistCard";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SearchBar = () => {

    const dispatch = useDispatch();
  useEffect(() => {

  },[]);
  //const value = useSelector((state) => state.rent.cardData);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

//   const renderItem = ({ item }) => {
//     // when no input, show all
//     if (searchPhrase === "") {
//       return (
//         <TouchableOpacity>
//           {value.map((dat) => (
//             <PlaylistCard
//               key={dat.title}
//               singerName={dat.title}
//               img={dat.img}
//               songName={dat.title}
//             />
//           ))}
//           ;
//         </TouchableOpacity>
//       );
//     }
//     // filter of the name
//     if (
//       item.name
//         .toUpperCase()
//         .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
//     ) {
//       return <PlaylistCard name={item.name} details={item.details} />;
//     }
//     // filter of the description
//     if (
//       item.details
//         .toUpperCase()
//         .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
//     ) {
//       return <PlaylistCard name={item.name} details={item.details} />;
//     }
//   };

const handleText = (text)=>{
    console.log(text);
    setSearchPhrase(text);
    dispatch(changeSearchText(text));
    if (text == "") {
        dispatch(changeSearchText(""));
    }
}

  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={handleText}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
              dispatch(changeSearchText(""));
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);

            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
