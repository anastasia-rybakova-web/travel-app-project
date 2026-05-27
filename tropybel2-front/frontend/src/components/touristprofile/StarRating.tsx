import React from "react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  allowHalf?: boolean;
  readonly?: boolean;
  disabled?: boolean;
}

export default function StarRating({ 
  value, 
  onChange, 
  allowHalf = false, 
  readonly = false,
  disabled = false 
}: StarRatingProps): React.JSX.Element {
  const stars: React.JSX.Element[] = [];

  const setRating = (val: number): void => {
    if (readonly || disabled) return;
    if (onChange) onChange(val);
  };

  for (let i = 1; i <= 5; i++) {
    const full = value >= i;
    const half = !full && allowHalf && value >= i - 0.5;

    stars.push(
      <div key={i} className="star-wrapper">
        <span
          className={`star ${full ? "full" : half ? "half" : "empty"}`}
          onClick={() => setRating(i)}
        ></span>
        {allowHalf && (
          <span
            className="star half-area"
            onClick={() => setRating(i - 0.5)}
          ></span>
        )}
      </div>
    );
  }

  return <div className="stars">{stars}</div>;
}