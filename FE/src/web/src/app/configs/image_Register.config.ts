



export interface IWrappercontentImage {
    svg: string[],
    image: string[]
}

// type shape_background = 
interface IShapeBackground {
    [key: string]: IWrappercontentImage
}

export const shape_background: IShapeBackground = {
    '/auth/forgot-password': {
        svg: [
            '/assets/svg/tornado_1.svg',
            '/assets/svg/tornado_5.svg'
        ],
        image: [
            'bg-bg-2'
        ]
    },
    '/auth/reset-password': {
        svg: [
            '/assets/svg/tornado_1.svg',
            '/assets/svg/tornado_5.svg'
        ],
        image: [
            'bg-bg-reset-psw'
        ]
    },
    '/auth/register': {
        svg: [
            '/assets/svg/tornado_1.svg',
            '/assets/svg/tornado_5.svg'
        ],
        image: [
            'bg-bg-4',
            'bg-bg-for-rent',
        ]
    },
};