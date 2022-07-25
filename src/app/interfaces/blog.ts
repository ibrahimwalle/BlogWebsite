export interface Blog {
    _id?: string,
    id?: string,
    category: string,
    image_url?: string,
    post_date?: string | Date, 
    title: string,
    body: string,
    author: string,
    author_title: string,
    author_image?: string
}
