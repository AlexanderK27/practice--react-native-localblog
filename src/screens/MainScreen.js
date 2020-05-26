import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { loadPosts } from '../store/actions/post'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'

export const MainScreen = ({ navigation }) => {
    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
    }

    // load data to state
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    // take posts from state
    const allPosts = useSelector(state => state.post.allPosts)

    return <PostList data={allPosts} onOpen={openPostHandler} />
}

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'My blog',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
            <Item 
                title="Go to create screen"
                iconName="ios-camera"
                onPress={() => navigation.push('Create')}
            />
        </HeaderButtons>
    ),
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
            <Item 
                title="Toggle Drawer"
                iconName="ios-menu"
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
})