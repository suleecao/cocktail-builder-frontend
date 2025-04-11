import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as cocktailService from '../../services/cocktailService';
import ReviewForm from '../ReviewForm/ReviewForm';

const CocktailDetails = (props) => {
    const [cocktail, setCocktail] = useState(null);
    const { cocktailId } = useParams();
    const { user } = useContext(UserContext);
    console.log('cocktail ID', cocktailId);

    const handleAddReview = async (reviewFormData) => {
        const newReview = await cocktailService.createReview(cocktailId, reviewFormData);
        setCocktail({ ...cocktail, reviews: [...cocktail.reviews, newReview] });
    };

    useEffect(() => {
        const fetchCocktail = async () => {
            const cocktailData = await cocktailService.show(cocktailId);
            setCocktail(cocktailData);
        }
        fetchCocktail();
    }, [cocktailId]);

    if (!cocktail) return <main>loading...</main>;

    return (
        <main>
            <section>
                <header>
                    <h1>{cocktail.name}</h1>
                    <img src={cocktail.image} alt={cocktail.name} />
                    <p>{cocktail.instructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        {cocktail.ingredients.map((ingredient) => (
                            <li key={ingredient._id}>
                                {ingredient.ingredientName}: {ingredient.amount}
                            </li>
                        ))}
                    </ul>
                    {cocktail.author._id === user._id && (
                        <>
                            <Link to={`/cocktails/${cocktailId}/edit`}>Edit</Link>
                            <button onClick={() => props.handleDeleteCocktail(cocktailId)}>
                                Delete drink
                            </button>
                        </>
                    )}
                </header>
            </section>

            <section>
                <h2>Reviews</h2>
                <ReviewForm handleAddReview={handleAddReview} />
                {!cocktail.reviews.length && <p>No reviews yet!</p>}
                {cocktail.reviews.map((review) => (
                    <div key={review._id}>
                        <p>{review.text}</p>
                        <p>{review.rating}</p>
                        <p>{review.author.username}</p>
                        <p>
                            {cocktail.author.username} posted on
                            {new Date(cocktail.createdAt).toLocaleDateString()}
                        </p>
                        {review.author._id === user._id && (
                            <>
                                <button onClick={() => props.handleDeleteReview(review._id)}>
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
