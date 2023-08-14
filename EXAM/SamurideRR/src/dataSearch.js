export async function searchAlbum(query){
    return get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`)
}