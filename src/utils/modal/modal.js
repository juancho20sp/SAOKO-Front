const modalOptionTypes = {
    button: 'button',
    text: 'text',
    input: 'input'
}

const modalOptions = {
    createChat: {
        id: 0,
        title: 'Pulsa el botón para crear un nuevo chat',
        firstRow: {
            type: modalOptionTypes.button,
            title: 'Crear chat'
        },
        secondRow: {
            type: modalOptionTypes.text,
            title: '¡Ya tengo un código!'
        }
    },

    shareChat: {
        id: 1,
        title: 'Comparte este código con quien quieras que entre a tu chat',
        firstRow: {
            type: modalOptionTypes.text,
            title: ''
        },
        secondRow: {
            type: modalOptionTypes.button,
            title: 'Cerrar'
        }
    },

    enterChat: {
        id: 2,
        title: 'Ingresa el código del chat',
        firstRow: {
            type: modalOptionTypes.input,
            title: ''
        },
        secondRow: {
            firstOption: {
                type: modalOptionTypes.button,
                title: 'Cerrar'
            },

            secondOption: {
                type: modalOptionTypes.button,
                title: 'Ingresar'
            },
        }
    },
    createBoard: {
        id: 3,
        title: 'Pulsa el botón para crear un nuevo tablero',
        firstRow: {
            type: modalOptionTypes.button,
            title: 'Crear tablero'
        },
        secondRow: {
            type: modalOptionTypes.text,
            title: '¡Ya tengo un código!'
        }
    },

    shareBoard: {
        id: 4,
        title: 'Comparte este código con quien quieras que entre a tu tablero',
        firstRow: {
            type: modalOptionTypes.text,
            title: ''
        },
        secondRow: {
            type: modalOptionTypes.button,
            title: 'Cerrar'
        }
    },

    enterBoard: {
        id: 5,
        title: 'Ingresa el código del tablero',
        firstRow: {
            type: modalOptionTypes.input,
            title: ''
        },
        secondRow: {
            firstOption: {
                type: modalOptionTypes.button,
                title: 'Cerrar'
            },

            secondOption: {
                type: modalOptionTypes.button,
                title: 'Ingresar'
            },
        }
    },
}

export { modalOptions, modalOptionTypes };