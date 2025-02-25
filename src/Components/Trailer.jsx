import { useEffect, useState } from 'react';

const Trailer = (props) => {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the trailer for a specific movie
  const fetchTrailer = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjliZDE1NGE3MGU0ZTZlMGM0NGFiYTIzYzEyNjY1YSIsIm5iZiI6MTczODIyMzk5Ny4xMDgsInN1YiI6IjY3OWIzMTdkYjIzNjI5ZTdmOGZiZDAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aD1Ix2XrAjBGGdinFcj1c4CdJMPl0w5km72Jov0DS8'
      }
    };

    try {
      // Fetch the videos for the specific movie ID
      const response = await fetch(`https://api.themoviedb.org/3/movie/${props.id}/videos?language=en-US`, options);
      const data = await response.json();

      // Find the YouTube trailer
      const youtubeTrailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      setTrailer(youtubeTrailer);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch trailer:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, [props.id]);

  if (loading) return <p className="text-center">Loading trailer...</p>;

  if (!trailer) return <p className="text-center text-white">No trailer available for this movie.</p>;

  return (
    <div className="p-5 flex justify-center" >
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        className="rounded-xl shadow-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};


export default Trailer;
