import Link from 'next/link';

interface IData {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

async function HomePage() {
  const data: IData[] = await (
    await fetch('https://billions-api.nomadcoders.workers.dev/')
  ).json();

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {data.map((el) => (
        <Link
          href={`/detail/${el.id}`}
          className='cursor-pointer hover:shadow-xl hover:shadow-gray-600 hover:-translate-y-1 transition-all p-3'
          key={el.id}
        >
          <img
            src={
              el.squareImage ??
              'https://specials-images.forbesimg.com/imageserve/603e8f5d4a2df75cef4fb25a/416x416.jpg?background=000000&cropX1=0&cropX2=800&cropY1=0&cropY2=800'
            }
            alt={el.name}
            className='mb-2'
          />
          <p className='text-lg font-bold leading-5'>{el.name}</p>
          <p className='text-sm'>
            {Math.floor(el.netWorth / 1000)} Billion / {el.industries}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
