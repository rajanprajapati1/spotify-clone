export const ShazamApi = async (query) => {
    const SHAZAM_API_KEY = import.meta.env.VITE_APP_API_KEY;

    const url = `https://shazam-core.p.rapidapi.com/${query}`;
// const url = 'https://shazam-core.p.rapidapi.com/v1/frame/cities?page=2';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': SHAZAM_API_KEY,
        'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response?.json();
        return result
        // return (result[41].hub.actions[1].uri)
        // return 'song' , result.tracks.hits[3].track.hub.actions[1].uri
    } catch (error) {
        console.error(error);
    }
};
