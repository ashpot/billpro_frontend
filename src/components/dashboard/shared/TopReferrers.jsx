import React from 'react';

const TopReferrers = () => {
  // Sample data (you can replace this with API data)
  const referrers = [
    { rank: 1, name: 'Adeola Johnson', earnings: '₦456,000 earned', referrals: 234 },
    { rank: 2, name: 'Chinedu Okafor', earnings: '₦382,500 earned', referrals: 198 },
    { rank: 3, name: 'Funke Adebayo', earnings: '₦328,000 earned', referrals: 176 },
    { rank: 4, name: 'Emeka Nwosu', earnings: '₦290,000 earned', referrals: 145 },
    { rank: 5, name: 'Ngozi Eze', earnings: '₦264,000 earned', referrals: 132 },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[23px] font-bold text-secondaryLight">Top Referrers</h2>
        <a href="#" className="text-base font-bold text-secondary">See All</a>
      </div>
      <div className="space-y-5">
        {referrers.map((referrer) => (
          <div key={referrer.rank} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 p-6 mr-2 flex items-center justify-center bg-[#E9F3FB] rounded-full text-[#2785D2] text-[22px] font-semibold">
                {referrer.rank}
              </div>
              <div>
                <p className="text-lg font-bold text-secondaryLight">{referrer.name}</p>
                <p className="text-base font-medium text-secondary">{referrer.earnings}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-lg font-bold bg-[#E9FAF1] text-[#27D26E]">
              {referrer.referrals}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopReferrers;