import React from 'react';
import Card from './Card';

const Overview = ({ title, cardsData }) => {
  return (
    <div className="mx-auto bg-white p-4 rounded-2xl">
      <h1 className="font-bold text-secondaryLight text-[23px] mb-3">{title}</h1>
      <div className="flex space-x-4">
        {cardsData.map((card, index) => (
          <Card key={index}>
            <div className="flex items-center space-x-2">
              <card.icon className={`text-xl ${card.color} bg-${card.bgColor}-100 rounded-full w-10 h-10 p-2 border border-${card.bgColor}-600`} />
              <div>
                <p className={`text-[29px] ${card.valueColor || 'text-secondaryLight'} font-bold`}>{card.value}</p>
                <p className="text-sm font-semibold text-secondary">{card.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;