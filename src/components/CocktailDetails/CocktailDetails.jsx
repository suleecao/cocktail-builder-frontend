import { useParams, Link } from 'react-router-dom';
import cocktailsData from '../../cocktailsData';
import { useState, useEffect, useContext} from 'react';

const CocktailDetails = (props) => {
    const [cocktail, setCocktail] = useState(null);
    const { id } = useParams();
    console.log('cocktail ID', id);

    //const cocktail = cocktailsData.find(c => c.name === id); for test data only
    const { user } = useContext(UserContext);

    handleAddReview = async (reviewFormData) => {
        const newReview = await cocktailService.createReview(cocktailId, reviewFormData);
        setCocktial({ ...cocktial, reviews: [...cocktail.reviews, newReview] });
      };
    
      useEffect(() => {
        const fetchCocktail = async () => {
            const cocktailData = await cocktailService.show(id);
            setCocktail(cocktailData);
        }
        fetchCocktail();
      }, [id]);

      if (!cocktail) return <main>loading...</main>

    return (
        <main>
        <h1>{cocktail.name}</h1>
        <img src={cocktail.image} alt={cocktail.name} />
        <p>{cocktail.instructions}</p>
        <h2>Ingredients</h2>
        <ul>
            {Object.entries(cocktail.ingredients).map(([ingredient, amount]) => (
                <li key={ingredient}>{ingredient}: {amount}</li>
            ))}
        </ul>
        <>
            <Link to={'/cocktails/${cocktailId}/edit'}>Edit</Link>
            <button onClick={() => props.handleDeleteCocktail(cocktailId)}>
                Delete drink</button>
        </>
        <section>
            <h2>Reviews</h2>
            <ReviewForm handleAddReview={handleAddReview} />
            {!cocktail.reviews.length && <p>no reviews yet!</p>}
            {cocktail.reviews.map((review) => (
                <div key={review.id}>
                    <p>{review.text}</p>
                    <p>{review.rating}</p>
                    <p>{review.author}</p>
                    <p>`${cocktail.author.username} posted on
                        ${new Date(cocktail.createdAt).toLocaleDateString()}`</p>
            {review.author._id === user._id && (
                <>
                  <button onClick={() => props.handleDeleteReview(reviewId)}>
                    Delete
                  </button>
                </>
            )}
            </div>
    ))}
  </section>
</main>   
    );
};


export default CocktailDetails;