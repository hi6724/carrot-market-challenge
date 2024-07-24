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

  return <div>{await response.text()}</div>;
}

export default page;
