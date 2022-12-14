import React from "react";
import PropTypes from "prop-types";
import LibraryCard from "./LibraryCard";

function SongsList({ songs }) {
    return (
        <View style={styles.bestContainer}>
            <ScrollView>
                {songs.map((song, i) => (
                    <LibraryCard key={i} title={song.name} img={song.image} artists={song.artists} />
                ))}
            </ScrollView>
        </View>
    );
}

SongsList.propTypes = {};

export default SongsList;
