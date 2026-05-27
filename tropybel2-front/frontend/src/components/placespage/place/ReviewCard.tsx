import React, { useState } from "react";
import { PlaceReview, User } from "../../../types/user.types";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: PlaceReview;
  currentUser: User | null;
  onEdit: (review: PlaceReview) => void;
  onDelete: (id: number) => void;
  formatDate: (dateString: string) => string;
}

export default function ReviewCard({ review, currentUser, onEdit, onDelete, formatDate }: ReviewCardProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false); 
  const isAuthor = currentUser && currentUser.id === review.userId;
  const displayText = expanded ? review.text : (review.text || "").slice(0, 100);
  const long = review.text && review.text.length > 100;

  return (
    <div className="place-review-card">
      <div className="place-review-top">
        <img
          src={review.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          className="place-review-avatar"
          alt={review.username}
        />
        <div className="place-review-meta">
          <div className="place-review-name">{review.username}</div>
          <div className="place-review-date">{formatDate(review.createdAt)}</div>
          <StarRating value={Number(review.rating) || 0} readonly allowHalf />
        </div>
        {isAuthor && (
          <button className="place-edit-btn" onClick={() => onEdit(review)}>
            <img src="/images/places/edit.png" alt="edit" className="place-edit-icon" />
          </button>
        )}
      </div>

      <hr className="place-review-divider" />
      
      <p className={`place-review-text ${expanded ? 'expanded' : ''}`}>
        {displayText}
        {!expanded && long && '...'}
      </p>

      {long && (
        <button className="place-more-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Скрыть" : "Подробнее"}
        </button>
      )}
    </div>
  );
}