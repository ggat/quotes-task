// this can be from the API
export type Quote = {
    id: number;
    content: string;
    author: {
        id: number;
        name: string;
    };
};
