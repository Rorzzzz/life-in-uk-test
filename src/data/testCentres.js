// Pass the UK Test — UK Test Centres
// All approved Life in the UK test centres with addresses and regions

export const TEST_CENTRES = [
  // ── LONDON ──
  { id: 1,  city: 'London — City',           region: 'London',           address: '1 Aldgate, London, EC3N 1RE',                     mapsQuery: 'Life+in+the+UK+test+centre+Aldgate+London',           lat: 51.5140, lng: -0.0773 },
  { id: 2,  city: 'London — Croydon',        region: 'London',           address: '14 Dingwall Road, Croydon, CR0 2NB',              mapsQuery: 'Life+in+the+UK+test+centre+Croydon',                  lat: 51.3762, lng: -0.0982 },
  { id: 3,  city: 'London — Hammersmith',    region: 'London',           address: '149 King Street, Hammersmith, W6 9JT',            mapsQuery: 'Life+in+the+UK+test+centre+Hammersmith',              lat: 51.4928, lng: -0.2229 },
  { id: 4,  city: 'London — Ilford',         region: 'London',           address: '8 The Broadway, Ilford, IG1 1EB',                 mapsQuery: 'Life+in+the+UK+test+centre+Ilford',                   lat: 51.5590, lng:  0.0684 },
  { id: 5,  city: 'London — Lewisham',       region: 'London',           address: '199 Lewisham High Street, SE13 6LG',              mapsQuery: 'Life+in+the+UK+test+centre+Lewisham',                 lat: 51.4612, lng: -0.0126 },
  { id: 6,  city: 'London — Southall',       region: 'London',           address: '87 The Broadway, Southall, UB1 1LR',              mapsQuery: 'Life+in+the+UK+test+centre+Southall',                 lat: 51.5134, lng: -0.3756 },
  { id: 7,  city: 'London — Stratford',      region: 'London',           address: '207 The Mall, Stratford, E15 1XD',                mapsQuery: 'Life+in+the+UK+test+centre+Stratford',                lat: 51.5423, lng: -0.0014 },
  { id: 8,  city: 'London — Tottenham',      region: 'London',           address: '748 High Road, Tottenham, N17 0AX',               mapsQuery: 'Life+in+the+UK+test+centre+Tottenham',                lat: 51.5888, lng: -0.0690 },
  { id: 9,  city: 'London — Wembley',        region: 'London',           address: '361 High Road, Wembley, HA9 6AA',                 mapsQuery: 'Life+in+the+UK+test+centre+Wembley',                  lat: 51.5528, lng: -0.2996 },
  { id: 10, city: 'London — Wood Green',     region: 'London',           address: '218 High Road, Wood Green, N22 8HH',              mapsQuery: 'Life+in+the+UK+test+centre+Wood+Green',               lat: 51.5980, lng: -0.1099 },
  // ── SOUTH EAST ──
  { id: 11, city: 'Brighton',                region: 'South East',       address: '6 North Road, Brighton, BN1 1YE',                 mapsQuery: 'Life+in+the+UK+test+centre+Brighton',                 lat: 50.8225, lng: -0.1372 },
  { id: 12, city: 'Reading',                 region: 'South East',       address: '35 Friar Street, Reading, RG1 1DX',               mapsQuery: 'Life+in+the+UK+test+centre+Reading',                  lat: 51.4543, lng: -0.9781 },
  { id: 13, city: 'Oxford',                  region: 'South East',       address: '14 Cornmarket Street, Oxford, OX1 3HP',           mapsQuery: 'Life+in+the+UK+test+centre+Oxford',                   lat: 51.7520, lng: -1.2577 },
  { id: 14, city: 'Southampton',             region: 'South East',       address: '30 Bernard Street, Southampton, SO14 3AY',        mapsQuery: 'Life+in+the+UK+test+centre+Southampton',              lat: 50.9097, lng: -1.4044 },
  { id: 15, city: 'Portsmouth',              region: 'South East',       address: '28 Commercial Road, Portsmouth, PO1 1EL',         mapsQuery: 'Life+in+the+UK+test+centre+Portsmouth',               lat: 50.7989, lng: -1.0912 },
  { id: 16, city: 'Guildford',               region: 'South East',       address: '2 Tunsgate, Guildford, GU1 3QT',                  mapsQuery: 'Life+in+the+UK+test+centre+Guildford',                lat: 51.2362, lng: -0.5704 },
  { id: 17, city: 'Slough',                  region: 'South East',       address: '234 High Street, Slough, SL1 1JR',                mapsQuery: 'Life+in+the+UK+test+centre+Slough',                   lat: 51.5105, lng: -0.5950 },
  // ── SOUTH WEST ──
  { id: 18, city: 'Bristol',                 region: 'South West',       address: '14 Wine Street, Bristol, BS1 2BX',                mapsQuery: 'Life+in+the+UK+test+centre+Bristol',                  lat: 51.4545, lng: -2.5879 },
  { id: 19, city: 'Exeter',                  region: 'South West',       address: '17 Paris Street, Exeter, EX1 2JB',                mapsQuery: 'Life+in+the+UK+test+centre+Exeter',                   lat: 50.7184, lng: -3.5339 },
  { id: 20, city: 'Plymouth',                region: 'South West',       address: '10 Old Town Street, Plymouth, PL1 1DE',           mapsQuery: 'Life+in+the+UK+test+centre+Plymouth',                 lat: 50.3755, lng: -4.1427 },
  { id: 21, city: 'Swindon',                 region: 'South West',       address: '11 Bridge Street, Swindon, SN1 1BL',              mapsQuery: 'Life+in+the+UK+test+centre+Swindon',                  lat: 51.5558, lng: -1.7797 },
  // ── EAST OF ENGLAND ──
  { id: 22, city: 'Cambridge',               region: 'East of England',  address: '8 St Andrews Street, Cambridge, CB2 3AX',         mapsQuery: 'Life+in+the+UK+test+centre+Cambridge',                lat: 52.2053, lng:  0.1218 },
  { id: 23, city: 'Norwich',                 region: 'East of England',  address: '22 Exchange Street, Norwich, NR2 1AX',            mapsQuery: 'Life+in+the+UK+test+centre+Norwich',                  lat: 52.6309, lng:  1.2974 },
  { id: 24, city: 'Luton',                   region: 'East of England',  address: '51 George Street, Luton, LU1 2AF',                mapsQuery: 'Life+in+the+UK+test+centre+Luton',                    lat: 51.8787, lng: -0.4200 },
  { id: 25, city: 'Peterborough',            region: 'East of England',  address: '43 Queensgate, Peterborough, PE1 1NG',            mapsQuery: 'Life+in+the+UK+test+centre+Peterborough',             lat: 52.5695, lng: -0.2405 },
  // ── EAST MIDLANDS ──
  { id: 26, city: 'Nottingham',              region: 'East Midlands',    address: '22 Wheeler Gate, Nottingham, NG1 2NA',            mapsQuery: 'Life+in+the+UK+test+centre+Nottingham',               lat: 52.9548, lng: -1.1581 },
  { id: 27, city: 'Leicester',               region: 'East Midlands',    address: '6 Granby Street, Leicester, LE1 1DE',             mapsQuery: 'Life+in+the+UK+test+centre+Leicester',                lat: 52.6369, lng: -1.1398 },
  { id: 28, city: 'Derby',                   region: 'East Midlands',    address: '31 Sadler Gate, Derby, DE1 3NF',                  mapsQuery: 'Life+in+the+UK+test+centre+Derby',                    lat: 52.9225, lng: -1.4746 },
  { id: 29, city: 'Lincoln',                 region: 'East Midlands',    address: '14 Silver Street, Lincoln, LN2 1DY',              mapsQuery: 'Life+in+the+UK+test+centre+Lincoln',                  lat: 53.2307, lng: -0.5406 },
  { id: 57, city: 'Northampton',             region: 'East Midlands',    address: '12 Abington Street, Northampton, NN1 2AJ',        mapsQuery: 'Life+in+the+UK+test+centre+Northampton',              lat: 52.2405, lng: -0.9027 },
  // ── WEST MIDLANDS ──
  { id: 30, city: 'Birmingham — City Centre',region: 'West Midlands',    address: '55 New Street, Birmingham, B2 4DU',               mapsQuery: 'Life+in+the+UK+test+centre+Birmingham',               lat: 52.4796, lng: -1.9026 },
  { id: 31, city: 'Birmingham — Handsworth', region: 'West Midlands',    address: '108 Grove Lane, Handsworth, B21 9JT',             mapsQuery: 'Life+in+the+UK+test+centre+Handsworth+Birmingham',    lat: 52.5073, lng: -1.9270 },
  { id: 32, city: 'Coventry',                region: 'West Midlands',    address: '2 Bayley Lane, Coventry, CV1 5RN',                mapsQuery: 'Life+in+the+UK+test+centre+Coventry',                 lat: 52.4068, lng: -1.5197 },
  { id: 33, city: 'Wolverhampton',           region: 'West Midlands',    address: '12 Lichfield Street, Wolverhampton, WV1 1DG',     mapsQuery: 'Life+in+the+UK+test+centre+Wolverhampton',            lat: 52.5847, lng: -2.1283 },
  { id: 34, city: 'Stoke-on-Trent',          region: 'West Midlands',    address: '32 Piccadilly, Hanley, Stoke-on-Trent, ST1 1EH', mapsQuery: 'Life+in+the+UK+test+centre+Stoke-on-Trent',           lat: 53.0027, lng: -2.1794 },
  // ── NORTH WEST ──
  { id: 35, city: 'Manchester — City',       region: 'North West',       address: '100 Deansgate, Manchester, M3 2QG',               mapsQuery: 'Life+in+the+UK+test+centre+Manchester',               lat: 53.4808, lng: -2.2426 },
  { id: 36, city: 'Manchester — Longsight',  region: 'North West',       address: '364 Dickenson Road, Longsight, M13 0WQ',          mapsQuery: 'Life+in+the+UK+test+centre+Longsight+Manchester',     lat: 53.4560, lng: -2.2020 },
  { id: 37, city: 'Liverpool',               region: 'North West',       address: '12 Whitechapel, Liverpool, L1 6DS',               mapsQuery: 'Life+in+the+UK+test+centre+Liverpool',                lat: 53.4084, lng: -2.9916 },
  { id: 38, city: 'Preston',                 region: 'North West',       address: '14 Fishergate, Preston, PR1 2AL',                 mapsQuery: 'Life+in+the+UK+test+centre+Preston',                  lat: 53.7632, lng: -2.7031 },
  { id: 39, city: 'Blackburn',               region: 'North West',       address: '23 King William Street, Blackburn, BB1 7DT',      mapsQuery: 'Life+in+the+UK+test+centre+Blackburn',                lat: 53.7480, lng: -2.4820 },
  // ── YORKSHIRE ──
  { id: 40, city: 'Leeds',                   region: 'Yorkshire',        address: '3 Park Row, Leeds, LS1 5JH',                      mapsQuery: 'Life+in+the+UK+test+centre+Leeds',                    lat: 53.7996, lng: -1.5491 },
  { id: 41, city: 'Bradford',                region: 'Yorkshire',        address: '45 Manchester Road, Bradford, BD5 0QD',           mapsQuery: 'Life+in+the+UK+test+centre+Bradford',                 lat: 53.7960, lng: -1.7594 },
  { id: 42, city: 'Sheffield',               region: 'Yorkshire',        address: '11 Fargate, Sheffield, S1 2HH',                   mapsQuery: 'Life+in+the+UK+test+centre+Sheffield',                lat: 53.3811, lng: -1.4701 },
  { id: 43, city: 'Hull',                    region: 'Yorkshire',        address: '14 King Edward Street, Hull, HU1 3SS',            mapsQuery: 'Life+in+the+UK+test+centre+Hull',                     lat: 53.7676, lng: -0.3274 },
  // ── NORTH EAST ──
  { id: 44, city: 'Newcastle upon Tyne',     region: 'North East',       address: '22 Grey Street, Newcastle, NE1 6AE',              mapsQuery: 'Life+in+the+UK+test+centre+Newcastle',                lat: 54.9783, lng: -1.6178 },
  { id: 45, city: 'Sunderland',              region: 'North East',       address: '10 High Street West, Sunderland, SR1 3EX',        mapsQuery: 'Life+in+the+UK+test+centre+Sunderland',               lat: 54.9069, lng: -1.3838 },
  { id: 46, city: 'Middlesbrough',           region: 'North East',       address: '2 Newport Road, Middlesbrough, TS1 1LN',          mapsQuery: 'Life+in+the+UK+test+centre+Middlesbrough',            lat: 54.5742, lng: -1.2350 },
  // ── SCOTLAND ──
  { id: 47, city: 'Edinburgh',               region: 'Scotland',         address: '7 Queen Street, Edinburgh, EH2 1JE',              mapsQuery: 'Life+in+the+UK+test+centre+Edinburgh',                lat: 55.9533, lng: -3.1883 },
  { id: 48, city: 'Glasgow',                 region: 'Scotland',         address: '123 Hope Street, Glasgow, G2 2LL',                mapsQuery: 'Life+in+the+UK+test+centre+Glasgow',                  lat: 55.8642, lng: -4.2518 },
  { id: 49, city: 'Aberdeen',                region: 'Scotland',         address: '8 Union Terrace, Aberdeen, AB10 1WE',             mapsQuery: 'Life+in+the+UK+test+centre+Aberdeen',                 lat: 57.1497, lng: -2.0943 },
  { id: 50, city: 'Dundee',                  region: 'Scotland',         address: '21 Commercial Street, Dundee, DD1 2AL',           mapsQuery: 'Life+in+the+UK+test+centre+Dundee',                   lat: 56.4620, lng: -2.9707 },
  { id: 51, city: 'Inverness',               region: 'Scotland',         address: '5 Church Street, Inverness, IV1 1DY',             mapsQuery: 'Life+in+the+UK+test+centre+Inverness',                lat: 57.4778, lng: -4.2247 },
  // ── WALES ──
  { id: 52, city: 'Cardiff',                 region: 'Wales',            address: '18 St Mary Street, Cardiff, CF10 1AA',            mapsQuery: 'Life+in+the+UK+test+centre+Cardiff',                  lat: 51.4837, lng: -3.1681 },
  { id: 53, city: 'Swansea',                 region: 'Wales',            address: '11 Oxford Street, Swansea, SA1 3AE',              mapsQuery: 'Life+in+the+UK+test+centre+Swansea',                  lat: 51.6214, lng: -3.9436 },
  { id: 54, city: 'Newport',                 region: 'Wales',            address: '6 High Street, Newport, NP20 1AA',                mapsQuery: 'Life+in+the+UK+test+centre+Newport+Wales',            lat: 51.5882, lng: -2.9977 },
  // ── NORTHERN IRELAND ──
  { id: 55, city: 'Belfast',                 region: 'Northern Ireland', address: '10 Victoria Square, Belfast, BT1 4QG',            mapsQuery: 'Life+in+the+UK+test+centre+Belfast',                  lat: 54.5973, lng: -5.9301 },
  { id: 56, city: 'Londonderry',             region: 'Northern Ireland', address: '14 Ferryquay Street, Londonderry, BT48 6JL',      mapsQuery: 'Life+in+the+UK+test+centre+Londonderry',              lat: 54.9966, lng: -7.3086 },
  // ── SOUTH WEST EXTRA ──
  { id: 58, city: 'Gloucester',              region: 'South West',       address: '5 Westgate Street, Gloucester, GL1 2NW',          mapsQuery: 'Life+in+the+UK+test+centre+Gloucester',               lat: 51.8642, lng: -2.2382 },
  // ── SOUTH EAST EXTRA ──
  { id: 59, city: 'Milton Keynes',           region: 'South East',       address: '14 Silbury Boulevard, Milton Keynes, MK9 3ES',    mapsQuery: 'Life+in+the+UK+test+centre+Milton+Keynes',            lat: 52.0406, lng: -0.7594 },
  { id: 60, city: 'Canterbury',              region: 'South East',       address: '9 St George\'s Street, Canterbury, CT1 2SR',      mapsQuery: 'Life+in+the+UK+test+centre+Canterbury',               lat: 51.2802, lng:  1.0789 },
  { id: 61, city: 'Maidstone',               region: 'South East',       address: '17 King Street, Maidstone, ME15 6BG',             mapsQuery: 'Life+in+the+UK+test+centre+Maidstone',                lat: 51.2720, lng:  0.5290 },
  { id: 62, city: 'Chatham',                 region: 'South East',       address: '78 High Street, Chatham, ME4 4EE',                mapsQuery: 'Life+in+the+UK+test+centre+Chatham',                  lat: 51.3781, lng:  0.5272 },
]

export const REGIONS = [...new Set(TEST_CENTRES.map(c => c.region))].sort()

export function getCentresByRegion(region) {
  return TEST_CENTRES.filter(c => c.region === region)
}

export function getGoogleMapsURL(centre) {
  return `https://www.google.com/maps/search/?api=1&query=${centre.mapsQuery}`
}

export function getCentreSlug(centre) {
  return centre.city
    .toLowerCase()
    .replace(/\s+—\s+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function getCentreBySlug(slug) {
  return TEST_CENTRES.find(c => getCentreSlug(c) === slug) ?? null
}

// Haversine distance in miles between two lat/lng points
export function distanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
