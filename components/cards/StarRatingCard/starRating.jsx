import Image from "next/image";

const RatingStars = ({ rating }) => {
    const starCount = 5;
    const stars = [];
  
    for (let i = 1; i <= starCount; i++) {
      let starClass = '';
      
      // Determine which sprite to use based on the rating
      if (rating >= i) {
        starClass += '/filled_star.svg';
      } else if (rating >= i - 0.5) {
        starClass += '/half_star.svg';
      } else {
        starClass += '/star.svg'
      }
  
      stars.push(<Image key={i} src={starClass} alt={starClass} width={16} height={16}/>);
    }
  
    return <div>{stars}</div>;
  };
  

  export default RatingStars;
