import React, { useState } from "react";
import { RouteReview, User } from "../../../types/user.types";
import StarRating from "./StarRating";

interface RouteReviewCardProps {
  review: RouteReview;
  currentUser: User | null;
  onEdit: (review: RouteReview) => void;
  onDelete: (id: number) => void;
  formatDate: (dateString: string) => string;
}

export default function RouteReviewCard({ 
  review, 
  currentUser, 
  onEdit, 
  onDelete, 
  formatDate 
}: RouteReviewCardProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const isAuthor = currentUser && currentUser.id === review.userId;
  const displayText = expanded ? review.text : (review.text || "").slice(0, 100);
  const long = review.text && review.text.length > 100;

  return (
    <div className="route-review-card">
      <div className="route-review-top">
        <img
          src={review.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          className="route-review-avatar"
          alt={review.username}
        />
        <div className="route-review-meta">
          <div className="route-review-name">{review.username}</div>
          <div className="route-review-date">{formatDate(review.createdAt)}</div>
          <StarRating value={Number(review.rating) || 0} readonly allowHalf />
        </div>
        {isAuthor && (
          <button className="route-edit-btn" onClick={() => onEdit(review)}>
            <img src="/images/places/edit.png" alt="edit" className="route-edit-icon" />
          </button>
        )}
      </div>

      <hr className="route-review-divider" />
      
      <p className={`route-review-text ${expanded ? 'expanded' : ''}`}>
        {displayText}
        {!expanded && long && '...'}
      </p>

      {long && (
        <button className="route-more-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Скрыть" : "Подробнее"}
        </button>
      )}
    </div>
  );
}