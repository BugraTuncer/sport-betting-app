import axios from 'axios';
import type { Match } from '~/models/matches';
import type { Sport } from '~/models/sports';
const BASE_URL = 'https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=eu&markets=h2h&';

export const sports = [
  {
    key: 'americanfootball_ncaaf',
    group: 'American Football',
    title: 'NCAAF',
    description: 'US College Football',
    active: true,
    has_outrights: false,
  },
  {
    key: 'americanfootball_ncaaf_championship_winner',
    group: 'American Football',
    title: 'NCAAF Championship Winner',
    description: 'US College Football Championship Winner',
    active: true,
    has_outrights: true,
  },
  {
    key: 'americanfootball_nfl_preseason',
    group: 'American Football',
    title: 'NFL Preseason',
    description: 'US Football',
    active: true,
    has_outrights: false,
  },
  {
    key: 'americanfootball_nfl_super_bowl_winner',
    group: 'American Football',
    title: 'NFL Super Bowl Winner',
    description: 'Super Bowl Winner 2025/2026',
    active: true,
    has_outrights: true,
  },
  {
    key: 'americanfootball_ufl',
    group: 'American Football',
    title: 'UFL',
    description: 'United Football League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'aussierules_afl',
    group: 'Aussie Rules',
    title: 'AFL',
    description: 'Aussie Football',
    active: true,
    has_outrights: false,
  },
  {
    key: 'baseball_kbo',
    group: 'Baseball',
    title: 'KBO',
    description: 'KBO League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'baseball_milb',
    group: 'Baseball',
    title: 'MiLB',
    description: 'Minor League Baseball',
    active: true,
    has_outrights: false,
  },
  {
    key: 'baseball_mlb',
    group: 'Baseball',
    title: 'MLB',
    description: 'Major League Baseball',
    active: true,
    has_outrights: false,
  },
  {
    key: 'baseball_mlb_world_series_winner',
    group: 'Baseball',
    title: 'MLB World Series Winner',
    description: 'World Series Winner 2025',
    active: true,
    has_outrights: true,
  },
  {
    key: 'baseball_npb',
    group: 'Baseball',
    title: 'NPB',
    description: 'Nippon Professional Baseball',
    active: true,
    has_outrights: false,
  },
  {
    key: 'basketball_euroleague',
    group: 'Basketball',
    title: 'Basketball Euroleague',
    description: 'Basketball Euroleague',
    active: true,
    has_outrights: false,
  },
  {
    key: 'basketball_nba',
    group: 'Basketball',
    title: 'NBA',
    description: 'US Basketball',
    active: true,
    has_outrights: false,
  },
  {
    key: 'basketball_nba_championship_winner',
    group: 'Basketball',
    title: 'NBA Championship Winner',
    description: 'Championship Winner 2024/2025',
    active: true,
    has_outrights: true,
  },
  {
    key: 'boxing_boxing',
    group: 'Boxing',
    title: 'Boxing',
    description: 'Boxing Bouts',
    active: true,
    has_outrights: false,
  },
  {
    key: 'cricket_international_t20',
    group: 'Cricket',
    title: 'International Twenty20',
    description: 'International Twenty20',
    active: true,
    has_outrights: false,
  },
  {
    key: 'cricket_ipl',
    group: 'Cricket',
    title: 'IPL',
    description: 'Indian Premier League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'cricket_odi',
    group: 'Cricket',
    title: 'One Day Internationals',
    description: 'One Day Internationals',
    active: true,
    has_outrights: false,
  },
  {
    key: 'cricket_psl',
    group: 'Cricket',
    title: 'Pakistan Super League',
    description: 'Pakistan Super League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'golf_pga_championship_winner',
    group: 'Golf',
    title: 'PGA Championship Winner',
    description: '2025 Winner',
    active: true,
    has_outrights: true,
  },
  {
    key: 'golf_the_open_championship_winner',
    group: 'Golf',
    title: 'The Open Winner',
    description: '2025 Winner',
    active: true,
    has_outrights: true,
  },
  {
    key: 'golf_us_open_winner',
    group: 'Golf',
    title: 'US Open Winner',
    description: '2025 Winner',
    active: true,
    has_outrights: true,
  },
  {
    key: 'icehockey_ahl',
    group: 'Ice Hockey',
    title: 'AHL',
    description: 'American Hockey League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'icehockey_nhl',
    group: 'Ice Hockey',
    title: 'NHL',
    description: 'US Ice Hockey',
    active: true,
    has_outrights: false,
  },
  {
    key: 'icehockey_nhl_championship_winner',
    group: 'Ice Hockey',
    title: 'NHL Championship Winner',
    description: 'Stanley Cup Winner 2024/2025',
    active: true,
    has_outrights: true,
  },
  {
    key: 'lacrosse_ncaa',
    group: 'Lacrosse',
    title: 'NCAA Lacrosse',
    description: 'College Lacrosse',
    active: true,
    has_outrights: false,
  },
  {
    key: 'mma_mixed_martial_arts',
    group: 'Mixed Martial Arts',
    title: 'MMA',
    description: 'Mixed Martial Arts',
    active: true,
    has_outrights: false,
  },
  {
    key: 'politics_us_presidential_election_winner',
    group: 'Politics',
    title: 'US Presidential Elections Winner',
    description: '2028 US Presidential Election Winner',
    active: true,
    has_outrights: true,
  },
  {
    key: 'rugbyleague_nrl',
    group: 'Rugby League',
    title: 'NRL',
    description: 'Aussie Rugby League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_argentina_primera_division',
    group: 'Soccer',
    title: 'Primera División - Argentina',
    description: 'Argentine Primera División',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_australia_aleague',
    group: 'Soccer',
    title: 'A-League',
    description: 'Aussie Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_austria_bundesliga',
    group: 'Soccer',
    title: 'Austrian Football Bundesliga',
    description: 'Austrian Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_belgium_first_div',
    group: 'Soccer',
    title: 'Belgium First Div',
    description: 'Belgian First Division A',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_brazil_campeonato',
    group: 'Soccer',
    title: 'Brazil Série A',
    description: 'Brasileirão Série A',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_brazil_serie_b',
    group: 'Soccer',
    title: 'Brazil Série B',
    description: 'Campeonato Brasileiro Série B',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_china_superleague',
    group: 'Soccer',
    title: 'Super League - China',
    description: 'Chinese Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_conmebol_copa_libertadores',
    group: 'Soccer',
    title: 'Copa Libertadores',
    description: 'CONMEBOL Copa Libertadores',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_conmebol_copa_sudamericana',
    group: 'Soccer',
    title: 'Copa Sudamericana',
    description: 'CONMEBOL Copa Sudamericana',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_denmark_superliga',
    group: 'Soccer',
    title: 'Denmark Superliga',
    description: 'Danish Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_efl_champ',
    group: 'Soccer',
    title: 'Championship',
    description: 'EFL Championship',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_england_league1',
    group: 'Soccer',
    title: 'League 1',
    description: 'EFL League 1',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_england_league2',
    group: 'Soccer',
    title: 'League 2',
    description: 'EFL League 2 ',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_epl',
    group: 'Soccer',
    title: 'EPL',
    description: 'English Premier League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_fa_cup',
    group: 'Soccer',
    title: 'FA Cup',
    description: 'Football Association Challenge Cup',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_fifa_world_cup_winner',
    group: 'Soccer',
    title: 'FIFA World Cup Winner',
    description: 'FIFA World Cup Winner 2026',
    active: true,
    has_outrights: true,
  },
  {
    key: 'soccer_finland_veikkausliiga',
    group: 'Soccer',
    title: 'Veikkausliiga - Finland',
    description: 'Finnish  Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_france_ligue_one',
    group: 'Soccer',
    title: 'Ligue 1 - France',
    description: 'French Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_france_ligue_two',
    group: 'Soccer',
    title: 'Ligue 2 - France',
    description: 'French Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_germany_bundesliga',
    group: 'Soccer',
    title: 'Bundesliga - Germany',
    description: 'German Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_germany_bundesliga2',
    group: 'Soccer',
    title: 'Bundesliga 2 - Germany',
    description: 'German Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_germany_liga3',
    group: 'Soccer',
    title: '3. Liga - Germany',
    description: 'German Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_greece_super_league',
    group: 'Soccer',
    title: 'Super League - Greece',
    description: 'Greek Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_italy_serie_a',
    group: 'Soccer',
    title: 'Serie A - Italy',
    description: 'Italian Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_italy_serie_b',
    group: 'Soccer',
    title: 'Serie B - Italy',
    description: 'Italian Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_japan_j_league',
    group: 'Soccer',
    title: 'J League',
    description: 'Japan Soccer League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_korea_kleague1',
    group: 'Soccer',
    title: 'K League 1',
    description: 'Korean Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_league_of_ireland',
    group: 'Soccer',
    title: 'League of Ireland',
    description: 'Airtricity League Premier Division',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_mexico_ligamx',
    group: 'Soccer',
    title: 'Liga MX',
    description: 'Mexican Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_netherlands_eredivisie',
    group: 'Soccer',
    title: 'Dutch Eredivisie',
    description: 'Dutch Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_norway_eliteserien',
    group: 'Soccer',
    title: 'Eliteserien - Norway',
    description: 'Norwegian Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_poland_ekstraklasa',
    group: 'Soccer',
    title: 'Ekstraklasa - Poland',
    description: 'Polish Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_portugal_primeira_liga',
    group: 'Soccer',
    title: 'Primeira Liga - Portugal',
    description: 'Portugese Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_spain_la_liga',
    group: 'Soccer',
    title: 'La Liga - Spain',
    description: 'Spanish Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_spain_segunda_division',
    group: 'Soccer',
    title: 'La Liga 2 - Spain',
    description: 'Spanish Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_spl',
    group: 'Soccer',
    title: 'Premiership - Scotland',
    description: 'Scottish Premiership',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_sweden_allsvenskan',
    group: 'Soccer',
    title: 'Allsvenskan - Sweden',
    description: 'Swedish Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_sweden_superettan',
    group: 'Soccer',
    title: 'Superettan - Sweden',
    description: 'Swedish Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_switzerland_superleague',
    group: 'Soccer',
    title: 'Swiss Superleague',
    description: 'Swiss Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_turkey_super_league',
    group: 'Soccer',
    title: 'Turkey Super League',
    description: 'Turkish Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_uefa_champs_league',
    group: 'Soccer',
    title: 'UEFA Champions League',
    description: 'European Champions League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_uefa_europa_conference_league',
    group: 'Soccer',
    title: 'UEFA Europa Conference League',
    description: 'UEFA Europa Conference League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_uefa_europa_league',
    group: 'Soccer',
    title: 'UEFA Europa League',
    description: 'European Europa League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_uefa_nations_league',
    group: 'Soccer',
    title: 'UEFA Nations League',
    description: 'UEFA Nations League',
    active: true,
    has_outrights: false,
  },
  {
    key: 'soccer_usa_mls',
    group: 'Soccer',
    title: 'MLS',
    description: 'Major League Soccer',
    active: true,
    has_outrights: false,
  },
  {
    key: 'tennis_atp_italian_open',
    group: 'Tennis',
    title: 'ATP Italian Open',
    description: "Men's Singles",
    active: true,
    has_outrights: false,
  },
  {
    key: 'tennis_wta_italian_open',
    group: 'Tennis',
    title: 'WTA Italian Open',
    description: "Women's Singles",
    active: true,
    has_outrights: false,
  },
];

export const matchData = [
  {
    id: 'c42ee7bb880be146cf8004935481dd62',
    sport_key: 'cricket_ipl',
    sport_title: 'IPL',
    commence_time: '2025-05-05T14:00:00Z',
    home_team: 'Sunrisers Hyderabad',
    away_team: 'Delhi Capitals',
    bookmakers: [
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:35:11Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:11Z',
            outcomes: [
              {
                name: 'Delhi Capitals',
                price: 8.5,
              },
              {
                name: 'Sunrisers Hyderabad',
                price: 1.06,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:11Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:11Z',
            outcomes: [
              {
                name: 'Delhi Capitals',
                price: 13,
              },
              {
                name: 'Sunrisers Hyderabad',
                price: 1.08,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:11Z',
            outcomes: [
              {
                name: 'Delhi Capitals',
                price: 13.5,
              },
              {
                name: 'Sunrisers Hyderabad',
                price: 1.09,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:09Z',
            outcomes: [
              {
                name: 'Delhi Capitals',
                price: 9.5,
              },
              {
                name: 'Sunrisers Hyderabad',
                price: 1.07,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:09Z',
            outcomes: [
              {
                name: 'Delhi Capitals',
                price: 9,
              },
              {
                name: 'Sunrisers Hyderabad',
                price: 1.07,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:09Z',
            outcomes: [
              {
                name: 'Delhi Capitals',
                price: 8.5,
              },
              {
                name: 'Sunrisers Hyderabad',
                price: 1.06,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '7c56a556ab4274fc250a60995e7d001c',
    sport_key: 'soccer_greece_super_league',
    sport_title: 'Super League - Greece',
    commence_time: '2025-05-05T15:00:00Z',
    home_team: 'Athens Kallithea FC',
    away_team: 'Panetolikos Agrinio',
    bookmakers: [
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:36:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:08Z',
            outcomes: [
              {
                name: 'Athens Kallithea FC',
                price: 3.95,
              },
              {
                name: 'Panetolikos Agrinio',
                price: 7.5,
              },
              {
                name: 'Draw',
                price: 1.41,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:36:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:08Z',
            outcomes: [
              {
                name: 'Athens Kallithea FC',
                price: 3.7,
              },
              {
                name: 'Panetolikos Agrinio',
                price: 6,
              },
              {
                name: 'Draw',
                price: 1.52,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:36:11Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:11Z',
            outcomes: [
              {
                name: 'Athens Kallithea FC',
                price: 3.75,
              },
              {
                name: 'Panetolikos Agrinio',
                price: 7.6,
              },
              {
                name: 'Draw',
                price: 1.62,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:36:11Z',
            outcomes: [
              {
                name: 'Athens Kallithea FC',
                price: 4.1,
              },
              {
                name: 'Panetolikos Agrinio',
                price: 8,
              },
              {
                name: 'Draw',
                price: 1.64,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a16450d55ef18f2145519077d2f0f5c8',
    sport_key: 'cricket_psl',
    sport_title: 'Pakistan Super League',
    commence_time: '2025-05-05T15:00:00Z',
    home_team: 'Multan Sultans',
    away_team: 'Peshawar Zalmi',
    bookmakers: [
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:36:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:09Z',
            outcomes: [
              {
                name: 'Multan Sultans',
                price: 26,
              },
              {
                name: 'Peshawar Zalmi',
                price: 1.03,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:36:09Z',
            outcomes: [
              {
                name: 'Multan Sultans',
                price: 28,
              },
              {
                name: 'Peshawar Zalmi',
                price: 1.04,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:36:06Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:06Z',
            outcomes: [
              {
                name: 'Multan Sultans',
                price: 17,
              },
              {
                name: 'Peshawar Zalmi',
                price: 1.03,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:36:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:07Z',
            outcomes: [
              {
                name: 'Multan Sultans',
                price: 13,
              },
              {
                name: 'Peshawar Zalmi',
                price: 1.02,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:36:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:07Z',
            outcomes: [
              {
                name: 'Multan Sultans',
                price: 12.5,
              },
              {
                name: 'Peshawar Zalmi',
                price: 1.01,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'babd9bbb24686d0fe3394bd6d629348d',
    sport_key: 'soccer_greece_super_league',
    sport_title: 'Super League - Greece',
    commence_time: '2025-05-05T15:00:00Z',
    home_team: 'Panserraikos FC',
    away_team: 'Volos FC',
    bookmakers: [
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:27:24Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:27:24Z',
            outcomes: [
              {
                name: 'Panserraikos FC',
                price: 1.04,
              },
              {
                name: 'Volos FC',
                price: 51,
              },
              {
                name: 'Draw',
                price: 11,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:31:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:31:15Z',
            outcomes: [
              {
                name: 'Panserraikos FC',
                price: 1.07,
              },
              {
                name: 'Volos FC',
                price: 50,
              },
              {
                name: 'Draw',
                price: 15.5,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:31:15Z',
            outcomes: [
              {
                name: 'Panserraikos FC',
                price: 1.08,
              },
              {
                name: 'Volos FC',
                price: 420,
              },
              {
                name: 'Draw',
                price: 16.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '522b95552d99e9763d01acda19ad3cf7',
    sport_key: 'soccer_league_of_ireland',
    sport_title: 'League of Ireland',
    commence_time: '2025-05-05T16:00:00Z',
    home_team: 'Galway United',
    away_team: 'Bohemians',
    bookmakers: [
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:07Z',
            outcomes: [
              {
                name: 'Bohemians',
                price: 2.65,
              },
              {
                name: 'Galway United',
                price: 3,
              },
              {
                name: 'Draw',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:10Z',
            outcomes: [
              {
                name: 'Bohemians',
                price: 2.94,
              },
              {
                name: 'Galway United',
                price: 3.2,
              },
              {
                name: 'Draw',
                price: 2.76,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:10Z',
            outcomes: [
              {
                name: 'Bohemians',
                price: 3.05,
              },
              {
                name: 'Galway United',
                price: 3.3,
              },
              {
                name: 'Draw',
                price: 2.84,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:09Z',
            outcomes: [
              {
                name: 'Bohemians',
                price: 2.85,
              },
              {
                name: 'Galway United',
                price: 3,
              },
              {
                name: 'Draw',
                price: 2.48,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:08Z',
            outcomes: [
              {
                name: 'Bohemians',
                price: 2.8,
              },
              {
                name: 'Galway United',
                price: 2.95,
              },
              {
                name: 'Draw',
                price: 2.48,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3b3939d09aed921b214811144c108002',
    sport_key: 'soccer_league_of_ireland',
    sport_title: 'League of Ireland',
    commence_time: '2025-05-05T16:00:00Z',
    home_team: 'Drogheda United',
    away_team: 'Cork City',
    bookmakers: [
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:07Z',
            outcomes: [
              {
                name: 'Cork City',
                price: 1.9,
              },
              {
                name: 'Drogheda United',
                price: 4,
              },
              {
                name: 'Draw',
                price: 3,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:10Z',
            outcomes: [
              {
                name: 'Cork City',
                price: 2.04,
              },
              {
                name: 'Drogheda United',
                price: 4.5,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:10Z',
            outcomes: [
              {
                name: 'Cork City',
                price: 2.06,
              },
              {
                name: 'Drogheda United',
                price: 4.7,
              },
              {
                name: 'Draw',
                price: 3.4,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:09Z',
            outcomes: [
              {
                name: 'Cork City',
                price: 1.97,
              },
              {
                name: 'Drogheda United',
                price: 4.5,
              },
              {
                name: 'Draw',
                price: 2.95,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:08Z',
            outcomes: [
              {
                name: 'Cork City',
                price: 1.93,
              },
              {
                name: 'Drogheda United',
                price: 4.5,
              },
              {
                name: 'Draw',
                price: 2.95,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'b4418e4c52e1029e5f400e88de642521',
    sport_key: 'soccer_league_of_ireland',
    sport_title: 'League of Ireland',
    commence_time: '2025-05-05T16:00:00Z',
    home_team: 'Shelbourne Dublin',
    away_team: 'Waterford FC',
    bookmakers: [
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:07Z',
            outcomes: [
              {
                name: 'Shelbourne Dublin',
                price: 3.2,
              },
              {
                name: 'Waterford FC',
                price: 2.25,
              },
              {
                name: 'Draw',
                price: 2.85,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:09Z',
            outcomes: [
              {
                name: 'Shelbourne Dublin',
                price: 3.25,
              },
              {
                name: 'Waterford FC',
                price: 2.32,
              },
              {
                name: 'Draw',
                price: 2.88,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:08Z',
            outcomes: [
              {
                name: 'Shelbourne Dublin',
                price: 3.2,
              },
              {
                name: 'Waterford FC',
                price: 2.32,
              },
              {
                name: 'Draw',
                price: 2.85,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:10Z',
            outcomes: [
              {
                name: 'Shelbourne Dublin',
                price: 3.35,
              },
              {
                name: 'Waterford FC',
                price: 2.52,
              },
              {
                name: 'Draw',
                price: 3.15,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:10Z',
            outcomes: [
              {
                name: 'Shelbourne Dublin',
                price: 3.45,
              },
              {
                name: 'Waterford FC',
                price: 2.58,
              },
              {
                name: 'Draw',
                price: 3.2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'aa7b1d74765cadaa556d8180e02d8951',
    sport_key: 'soccer_denmark_superliga',
    sport_title: 'Denmark Superliga',
    commence_time: '2025-05-05T17:00:00Z',
    home_team: 'SonderjyskE',
    away_team: 'AaB',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:35:52Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:52Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.87,
              },
              {
                name: 'SonderjyskE',
                price: 2.3,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:53Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.95,
              },
              {
                name: 'SonderjyskE',
                price: 2.35,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:52Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:52Z',
            outcomes: [
              {
                name: 'AaB',
                price: 3.05,
              },
              {
                name: 'SonderjyskE',
                price: 2.2,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:53Z',
            outcomes: [
              {
                name: 'AaB',
                price: 3.05,
              },
              {
                name: 'SonderjyskE',
                price: 2.2,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:55Z',
            outcomes: [
              {
                name: 'AaB',
                price: 3.05,
              },
              {
                name: 'SonderjyskE',
                price: 2.5,
              },
              {
                name: 'Draw',
                price: 3.6,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:55Z',
            outcomes: [
              {
                name: 'AaB',
                price: 3.1,
              },
              {
                name: 'SonderjyskE',
                price: 2.54,
              },
              {
                name: 'Draw',
                price: 3.65,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:35:51Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:51Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.8,
              },
              {
                name: 'SonderjyskE',
                price: 2.3,
              },
              {
                name: 'Draw',
                price: 3.4,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-05T16:35:52Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:52Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.8,
              },
              {
                name: 'SonderjyskE',
                price: 2.25,
              },
              {
                name: 'Draw',
                price: 3.2,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-05T16:35:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:53Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.8,
              },
              {
                name: 'SonderjyskE',
                price: 2.25,
              },
              {
                name: 'Draw',
                price: 3.2,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-05T16:35:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:53Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.9,
              },
              {
                name: 'SonderjyskE',
                price: 2.3,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-05T16:35:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:54Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.9,
              },
              {
                name: 'SonderjyskE',
                price: 2.3,
              },
              {
                name: 'Draw',
                price: 3.25,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-05T16:35:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:53Z',
            outcomes: [
              {
                name: 'AaB',
                price: 2.75,
              },
              {
                name: 'SonderjyskE',
                price: 2.28,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '51df8bdc931a974c68866cd423333396',
    sport_key: 'soccer_poland_ekstraklasa',
    sport_title: 'Ekstraklasa - Poland',
    commence_time: '2025-05-05T17:00:00Z',
    home_team: 'Korona Kielce',
    away_team: 'GKS Katowice',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:36:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:05Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.2,
              },
              {
                name: 'Korona Kielce',
                price: 2.05,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:36:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:04Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.2,
              },
              {
                name: 'Korona Kielce',
                price: 2.16,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:36:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:05Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.1,
              },
              {
                name: 'Korona Kielce',
                price: 2.12,
              },
              {
                name: 'Draw',
                price: 3.4,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:36:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:04Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.2,
              },
              {
                name: 'Korona Kielce',
                price: 2.05,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-05T16:36:06Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:06Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.15,
              },
              {
                name: 'Korona Kielce',
                price: 2.15,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:36:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:07Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.5,
              },
              {
                name: 'Korona Kielce',
                price: 2.24,
              },
              {
                name: 'Draw',
                price: 3.65,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:36:07Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.6,
              },
              {
                name: 'Korona Kielce',
                price: 2.26,
              },
              {
                name: 'Draw',
                price: 3.75,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-05T16:36:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:05Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.15,
              },
              {
                name: 'Korona Kielce',
                price: 2.05,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-05T16:36:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:05Z',
            outcomes: [
              {
                name: 'GKS Katowice',
                price: 3.1,
              },
              {
                name: 'Korona Kielce',
                price: 2.1,
              },
              {
                name: 'Draw',
                price: 3.25,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '27f89e95483fd47367f6a2c8f2eb5e1e',
    sport_key: 'soccer_sweden_allsvenskan',
    sport_title: 'Allsvenskan - Sweden',
    commence_time: '2025-05-05T17:00:00Z',
    home_team: 'Malmo FF',
    away_team: 'IF Brommapojkarna',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:35:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:04Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 7.5,
              },
              {
                name: 'Malmo FF',
                price: 1.33,
              },
              {
                name: 'Draw',
                price: 4.5,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 7.5,
              },
              {
                name: 'Malmo FF',
                price: 1.4,
              },
              {
                name: 'Draw',
                price: 4.75,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:04Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 7.5,
              },
              {
                name: 'Malmo FF',
                price: 1.36,
              },
              {
                name: 'Draw',
                price: 4.9,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 7,
              },
              {
                name: 'Malmo FF',
                price: 1.35,
              },
              {
                name: 'Draw',
                price: 4.9,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-05T16:35:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:04Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 6.5,
              },
              {
                name: 'Malmo FF',
                price: 1.35,
              },
              {
                name: 'Draw',
                price: 4.5,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-05T16:35:06Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:06Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 6.5,
              },
              {
                name: 'Malmo FF',
                price: 1.35,
              },
              {
                name: 'Draw',
                price: 4.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:07Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 9.2,
              },
              {
                name: 'Malmo FF',
                price: 1.41,
              },
              {
                name: 'Draw',
                price: 5.3,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:07Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 9.4,
              },
              {
                name: 'Malmo FF',
                price: 1.43,
              },
              {
                name: 'Draw',
                price: 5.4,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 6.75,
              },
              {
                name: 'Malmo FF',
                price: 1.35,
              },
              {
                name: 'Draw',
                price: 4.6,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-05T16:35:06Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:06Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 7.5,
              },
              {
                name: 'Malmo FF',
                price: 1.36,
              },
              {
                name: 'Draw',
                price: 4.6,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'IF Brommapojkarna',
                price: 7,
              },
              {
                name: 'Malmo FF',
                price: 1.35,
              },
              {
                name: 'Draw',
                price: 4.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '44a8059b347a9ee4513e5c9a02f4572d',
    sport_key: 'soccer_sweden_superettan',
    sport_title: 'Superettan - Sweden',
    commence_time: '2025-05-05T17:00:00Z',
    home_team: 'IK Brage',
    away_team: 'Östersunds FK',
    bookmakers: [
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:36:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:00Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 2,
              },
              {
                name: 'Östersunds FK',
                price: 3.6,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:36:02Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:02Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 1.97,
              },
              {
                name: 'Östersunds FK',
                price: 3.6,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:36:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:01Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 1.95,
              },
              {
                name: 'Östersunds FK',
                price: 3.4,
              },
              {
                name: 'Draw',
                price: 2.9,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:36:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:04Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 2.12,
              },
              {
                name: 'Östersunds FK',
                price: 4,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:36:04Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 2.18,
              },
              {
                name: 'Östersunds FK',
                price: 4.3,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:36:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:01Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 2,
              },
              {
                name: 'Östersunds FK',
                price: 3.5,
              },
              {
                name: 'Draw',
                price: 3.15,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:36:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:01Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 2.1,
              },
              {
                name: 'Östersunds FK',
                price: 3.6,
              },
              {
                name: 'Draw',
                price: 3.2,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-05T16:36:02Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:02Z',
            outcomes: [
              {
                name: 'IK Brage',
                price: 2,
              },
              {
                name: 'Östersunds FK',
                price: 3.5,
              },
              {
                name: 'Draw',
                price: 3.15,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '38a8867763e4f18a47f3db0be054d9a6',
    sport_key: 'soccer_turkey_super_league',
    sport_title: 'Turkey Super League',
    commence_time: '2025-05-05T17:00:00Z',
    home_team: 'Kasimpasa SK',
    away_team: 'Trabzonspor',
    bookmakers: [
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:47Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:47Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.25,
              },
              {
                name: 'Trabzonspor',
                price: 2.75,
              },
              {
                name: 'Draw',
                price: 3.9,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:35:47Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:47Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.2,
              },
              {
                name: 'Trabzonspor',
                price: 2.8,
              },
              {
                name: 'Draw',
                price: 3.8,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:35:47Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:47Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.2,
              },
              {
                name: 'Trabzonspor',
                price: 2.8,
              },
              {
                name: 'Draw',
                price: 3.7,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:46Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:46Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.32,
              },
              {
                name: 'Trabzonspor',
                price: 2.63,
              },
              {
                name: 'Draw',
                price: 3.9,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:48Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:48Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.32,
              },
              {
                name: 'Trabzonspor',
                price: 2.63,
              },
              {
                name: 'Draw',
                price: 3.9,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-05T16:35:47Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:47Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.25,
              },
              {
                name: 'Trabzonspor',
                price: 2.75,
              },
              {
                name: 'Draw',
                price: 3.8,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-05T16:35:48Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:48Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.25,
              },
              {
                name: 'Trabzonspor',
                price: 2.75,
              },
              {
                name: 'Draw',
                price: 3.8,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:49Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:49Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.34,
              },
              {
                name: 'Trabzonspor',
                price: 2.98,
              },
              {
                name: 'Draw',
                price: 4.1,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:49Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.36,
              },
              {
                name: 'Trabzonspor',
                price: 3.05,
              },
              {
                name: 'Draw',
                price: 4.2,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-05T16:35:48Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:48Z',
            outcomes: [
              {
                name: 'Kasimpasa SK',
                price: 2.25,
              },
              {
                name: 'Trabzonspor',
                price: 2.65,
              },
              {
                name: 'Draw',
                price: 3.8,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a0993341be86252067d4542fc06cee7b',
    sport_key: 'soccer_greece_super_league',
    sport_title: 'Super League - Greece',
    commence_time: '2025-05-05T17:00:00Z',
    home_team: 'PAS Lamia 1964',
    away_team: 'Levadiakos',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:36:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:08Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.47,
              },
              {
                name: 'PAS Lamia 1964',
                price: 6.5,
              },
              {
                name: 'Draw',
                price: 3.8,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:36:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:09Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.49,
              },
              {
                name: 'PAS Lamia 1964',
                price: 6.5,
              },
              {
                name: 'Draw',
                price: 3.9,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:36:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:08Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.49,
              },
              {
                name: 'PAS Lamia 1964',
                price: 6.5,
              },
              {
                name: 'Draw',
                price: 3.9,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-05T16:36:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:08Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.5,
              },
              {
                name: 'PAS Lamia 1964',
                price: 5.5,
              },
              {
                name: 'Draw',
                price: 3.6,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-05T16:36:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:09Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.5,
              },
              {
                name: 'PAS Lamia 1964',
                price: 5.5,
              },
              {
                name: 'Draw',
                price: 3.6,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-05T16:36:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:09Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.53,
              },
              {
                name: 'PAS Lamia 1964',
                price: 6,
              },
              {
                name: 'Draw',
                price: 3.65,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:36:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:08Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.52,
              },
              {
                name: 'PAS Lamia 1964',
                price: 6,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:36:11Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:11Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.62,
              },
              {
                name: 'PAS Lamia 1964',
                price: 6.8,
              },
              {
                name: 'Draw',
                price: 4,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:36:11Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.65,
              },
              {
                name: 'PAS Lamia 1964',
                price: 7.2,
              },
              {
                name: 'Draw',
                price: 4.2,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-05T16:36:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:09Z',
            outcomes: [
              {
                name: 'Levadiakos',
                price: 1.52,
              },
              {
                name: 'PAS Lamia 1964',
                price: 6,
              },
              {
                name: 'Draw',
                price: 3.6,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'db19369d89adc085e119bbf30946222f',
    sport_key: 'soccer_sweden_superettan',
    sport_title: 'Superettan - Sweden',
    commence_time: '2025-05-05T17:00:00Z',
    home_team: 'Örebro SK',
    away_team: 'Trelleborgs FF',
    bookmakers: [
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:36:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:00Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.3,
              },
              {
                name: 'Örebro SK',
                price: 2.85,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:36:02Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:02Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.28,
              },
              {
                name: 'Örebro SK',
                price: 2.8,
              },
              {
                name: 'Draw',
                price: 3.45,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:36:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:01Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.15,
              },
              {
                name: 'Örebro SK',
                price: 2.62,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:36:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:04Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.48,
              },
              {
                name: 'Örebro SK',
                price: 2.94,
              },
              {
                name: 'Draw',
                price: 3.75,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:36:04Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.52,
              },
              {
                name: 'Örebro SK',
                price: 3,
              },
              {
                name: 'Draw',
                price: 3.8,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-05T16:36:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:01Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.3,
              },
              {
                name: 'Örebro SK',
                price: 2.6,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:36:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:01Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.3,
              },
              {
                name: 'Örebro SK',
                price: 2.85,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-05T16:36:02Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:36:02Z',
            outcomes: [
              {
                name: 'Trelleborgs FF',
                price: 2.28,
              },
              {
                name: 'Örebro SK',
                price: 2.65,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '5d22dd795d38bc01e6b36f993930c998',
    sport_key: 'soccer_sweden_allsvenskan',
    sport_title: 'Allsvenskan - Sweden',
    commence_time: '2025-05-05T17:10:00Z',
    home_team: 'IF Elfsborg',
    away_team: 'GAIS',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-05T16:35:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:04Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 3,
              },
              {
                name: 'IF Elfsborg',
                price: 2.2,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 3,
              },
              {
                name: 'IF Elfsborg',
                price: 2.25,
              },
              {
                name: 'Draw',
                price: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-05T16:35:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:04Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 3.1,
              },
              {
                name: 'IF Elfsborg',
                price: 2.17,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 3.1,
              },
              {
                name: 'IF Elfsborg',
                price: 2.15,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-05T16:35:04Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:04Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 2.8,
              },
              {
                name: 'IF Elfsborg',
                price: 2.25,
              },
              {
                name: 'Draw',
                price: 3.2,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-05T16:35:06Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:06Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 2.8,
              },
              {
                name: 'IF Elfsborg',
                price: 2.25,
              },
              {
                name: 'Draw',
                price: 3.2,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-05T16:35:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:07Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 3.25,
              },
              {
                name: 'IF Elfsborg',
                price: 2.36,
              },
              {
                name: 'Draw',
                price: 3.65,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-05T16:35:07Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 3.3,
              },
              {
                name: 'IF Elfsborg',
                price: 2.38,
              },
              {
                name: 'Draw',
                price: 3.7,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 2.85,
              },
              {
                name: 'IF Elfsborg',
                price: 2.2,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-05T16:35:06Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:06Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 2.9,
              },
              {
                name: 'IF Elfsborg',
                price: 2.25,
              },
              {
                name: 'Draw',
                price: 3.35,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-05T16:35:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-05T16:35:05Z',
            outcomes: [
              {
                name: 'GAIS',
                price: 2.9,
              },
              {
                name: 'IF Elfsborg',
                price: 2.2,
              },
              {
                name: 'Draw',
                price: 3.3,
              },
            ],
          },
        ],
      },
    ],
  },
];

const getMatches = async (): Promise<Match[]> => {
  return matchData;
};

const getSports = async (): Promise<Sport[]> => {
  return sports;
};

export { getMatches, getSports };
