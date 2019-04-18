import React from "react";

const PlayerCard = ({ player }) => {
  return (
    <div className="playerCard">
      <p>{player.player}</p>
      <p>{`${player.id}`}</p>
    </div>
  );
};

export default PlayerCard;
