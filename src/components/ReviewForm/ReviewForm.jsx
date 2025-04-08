import { useState } from 'react';

const CommentForm = (props) => {
  const [commentData, setCommentData] = useState({ text: '' });

  const handleChange = (evt) => {
    setCommentData({ ...commentData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(commentData);
    setCommentData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your review:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={commentData.text}
        onChange={handleChange}
      />

      <label htmlFor='rating-options'>Your Rating:</label>
      <select
        name='rating'
        id='rating-options'
        value={commentData.rating}
        onChange={handleChange}
      >
        <option value='1'>1 Star</option>
        <option value='2'>2 Stars</option>
        <option value='3'>3 Stars</option>
        <option value='4'>4 Stars</option>
        <option value='5'>5 Stars</option>
     </select>

      <button type='submit'>submit review</button>
    </form>
  );
};

export default CommentForm;

