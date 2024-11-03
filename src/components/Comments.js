import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentIds, setCommentIds] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    if (state?.comments) {
      setCommentIds(state.comments);
    }
  }, [state]);

  useEffect(() => {
    const fetchComments = async () => {
      if (commentIds.length === 0) return;

      try {
        const commentData = await Promise.all(
          commentIds.map(async (id) => {
            try {
              const response = await axios.get(
                `https://hn.algolia.com/api/v1/items/${id}`
              );
              return response.data;
            } catch (error) {
              if (error.response && error.response.status === 404) {
                return null;
              } else {
                throw error;
              }
            }
          })
        );
        setComments(commentData.filter((comment) => comment !== null));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [commentIds]);

  return (
    <div className="center">
      <div className="common-bg">
        <h2>Children</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p className="comment-title">
                <span className="material-icons">play_arrow</span>
                <strong>{comment.author}</strong>:
              </p>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
