export type Topic = {
    id: string;
    id_lecturer: string;
    lect_name: string;
    title: string;
    description: string;
}

export type GetTopics = {
    page?: number;
    limit?: number;
    search?: string;
    idPembimbing?: string;
}

export type GetTopicResponse = {
    sucess: boolean;
    code: number;
    message: string;
    data: {
        id: string;
        id_lecturer: string;
        lect_name: string;
        title: string;
        description: string;
    }[]
}