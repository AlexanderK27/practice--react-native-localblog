import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Post } from '../components/Post'

export const PostList = ({ data = [], onOpen }) => {

    if (!data.length) {
        return (
            <View style={styles.noItems}>
                <Text style={styles.text}>There are no posts for now</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList 
                data={data}
                keyExtractor={post => post.id.toString()}
                renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16
    }
})