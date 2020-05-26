import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, ScrollView, Button, Alert, Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { toggleBooked, deletePost } from '../store/actions/post'
import { THEME } from '../theme'

export const PostScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const postId = navigation.getParam('postId')
    const post = useSelector(state => state.post.allPosts.find(post => post.id === postId))

    // start('handle bookmarked') // passing data to navifationOptions below
    const booked = useSelector(state => 
        state.post.bookedPosts.some(post => post.id === postId)    
    )

    useEffect(() => {
        navigation.setParams({ booked })
    }, [booked])

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(postId))
    }, [dispatch, postId])

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler])

    // end('handle bookmarked')


    const deleteHandler = () => {
        Alert.alert(
            'Post deleting',
            'Are you sure you want to delete this post?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => {
                    navigation.navigate('Main')
                    dispatch(deletePost(postId))
                } }
            ],
            {cancelable: true}
        )
    }

    if (!post) {
        return (
            <View style={styles.deleted}>
                <Text>This post has been deleted</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button 
                title="Delete" 
                color={THEME.DANGER_COLOR}    
                onPress={deleteHandler} 
            />
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({navigation}) => {
    const date = navigation.getParam('date')
    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName =  booked ? 'ios-star' : 'ios-star-outline'
    
    return {
        headerTitle: 'Posted ' + new Date(date).toLocaleDateString(),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
                <Item 
                    title="Hangle bookmarked"
                    iconName={iconName}
                    onPress={toggleHandler}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    },
    deleted: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})