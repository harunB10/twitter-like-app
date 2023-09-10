import React, { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface ActionProps {
  isLiked?: boolean;
}

function Action(props: ActionProps) {
  return (
    <div className="actions">
      {props.isLiked ? (
        <BsHeartFill  />
      ) : (
        <BsHeart  />
      )}
    </div>
  );
}

export default Action;
