import React from 'react';
interface IFinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
}

interface IDetailData {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: IFinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

async function DetailPage({ params: { id } }: { params: { id: string } }) {
  const data: IDetailData = await (
    await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
  ).json();

  return (
    <div>
      <div className='flex flex-col gap-4 mb-40'>
        <img src={data.squareImage} alt='' className='w-80' />
        <h1 className='font-bold text-3xl'>{data.name}</h1>
        <p>Networth: {Math.floor(data.netWorth / 1000)} Billion</p>
        <p>Country: {data.country}</p>
        <p>Industry: {data.industries.join(' ')}</p>
        <p>{data.bio.join(' ')}</p>
      </div>
      <div className='flex flex-col gap-4 mb-40'>
        <h1 className='font-bold text-3xl'>Financial Assets</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
          {data.financialAssets.map((el, i) => (
            <FinancialAsset key={i} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;

function getCurrencySymbol(currencyCode: string) {
  // 0을 통화 형식으로 포맷한 문자열을 가져옴
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
  });
  // 포맷된 문자열에서 통화 기호만 추출
  const parts = formatter.formatToParts(0);
  const currencySymbol = parts.find((part) => part.type === 'currency')?.value;
  return currencySymbol ?? currencyCode;
}

function FinancialAsset(data: IFinancialAsset) {
  return (
    <div className='border px-2 py-4 border-gray-200 border-opacity-40 rounded-xl flex flex-col gap-4'>
      <p>Ticker: {data.ticker}</p>
      <p>Shares: {data.numberOfShares.toLocaleString()}</p>
      {data.exerciseOptionPrice ? (
        <p>
          Excersie Price: {getCurrencySymbol(data.currencyCode)}
          {data.exerciseOptionPrice}
        </p>
      ) : null}
    </div>
  );
}
