import Link from 'next/link';
import React from 'react';

async function page() {
  const response = await fetch('https://talk.tmaxsoft.com/front/notice/findNoticeSetupBoardList.do', {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Cookie:
        'JSESSIONID=42Oi6LcVAwKixEcL2zNKblEbEmjJoXNaJ6DDaFfKj6DPcvc6zXXY9iR3tYiAGShb.dGFsa19kb21haW4vdGFsay0wMQ==',
    },
  });

  const tmaxServerTime = response.headers.get('Date');
  const vercelServerTime = new Date().toLocaleString();
  const isSuccessful = response.ok && (await response.text()).length > 2000;
  return (
    <div>
      <h1 className={`${isSuccessful ? 'text-green-600' : 'text-red-600'} font-bold text-2xl`}>
        {isSuccessful ? 'SUCCESS' : 'FAIL'}
      </h1>
      <div className='flex gap-4'>
        <h2>TMAX SERVER</h2>
        <span>{tmaxServerTime}</span>
      </div>
      <div className={'flex gap-4'}>
        <h2>VERCEL SERVER</h2>
        <span>{vercelServerTime}</span>
      </div>
      <Link href={'/tmax/detail'} className='text-blue-500 underline text-lg'>
        See Detail
      </Link>
    </div>
  );
}

export default page;
