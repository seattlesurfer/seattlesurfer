const https = require('https');
const fs = require('fs');

const save = (data, filename = 'test') => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(data, null, 2));
};
https.get('https://www.ndbc.noaa.gov/data/realtime2/WPOW1.cwind', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  let body = '';

  res.on('data', (data) => {
    body += data;
  });

  res.on('end', () => {
    const [pHeadings, colorHeadings, ...pRows] = body.split('\n');
    const headings = pHeadings.replace(/\s+/g, ',').split(',');
    const rows = pRows.map(pRow => pRow.replace(/\s+/g, ',').split(','));

    save({ headings, rows }, 'body');
    save(body, 'body');
  });
});




