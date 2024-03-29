const routes = {
    login: {
        id: 0,
        path: '/login',
        name: 'login'
    },
    signIn: {
        id: 1,
        path: '/createAccount',
        name: 'signIn'
    },
    home: {
        id: 2,
        path: '/',
        name: 'home'
    },
    chats: {
        id: 3,
        path: '/chats',
        name: 'chats'
    },
    boards: {
        id: 4,
        path: '/boards',
        name: 'boards'
    },
    profile: {
        id: 5,
        path: '/profile',
        name: 'profile'
    },
    chatRoom: {
        id: 6,
        path: '/chats/:id',
        name: 'chatRoom'
    },
    boardRoom: {
        id: 7,
        path: '/boards/:id',
        name: 'boardRoom'
    }
}

export default routes;