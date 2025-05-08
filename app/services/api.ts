import axios from 'axios';
import type { Match } from '~/models/matches';
import type { Sport } from '~/models/sports';
const MATCHES_BASE_URL = 'https://api.the-odds-api.com/v4/sports/';
const SPORTS_BASE_URL = 'https://api.the-odds-api.com/v4/sports';

const sportsData = [
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
    key: 'baseball_ncaa',
    group: 'Baseball',
    title: 'NCAA Baseball',
    description: 'US College Baseball',
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
    key: 'soccer_uefa_champs_league_women',
    group: 'Soccer',
    title: 'UEFA Champions League Women',
    description: 'European Champions League Women',
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

const matchesData = [
  {
    id: '9d37d829d983d613abe8fb9dc9a9529f',
    sport_key: 'cricket_odi',
    sport_title: 'One Day Internationals',
    commence_time: '2025-05-08T09:00:00Z',
    home_team: 'Scotland',
    away_team: 'UAE',
    bookmakers: [
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:32:46Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:46Z',
            outcomes: [
              {
                name: 'Scotland',
                price: 1.66,
              },
              {
                name: 'UAE',
                price: 2.16,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:32:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:45Z',
            outcomes: [
              {
                name: 'Scotland',
                price: 1.65,
              },
              {
                name: 'UAE',
                price: 2.12,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'b6e04f31bf25ab28fe1fb78b5675a481',
    sport_key: 'rugbyleague_nrl',
    sport_title: 'NRL',
    commence_time: '2025-05-08T09:51:00Z',
    home_team: 'Parramatta Eels',
    away_team: 'Dolphins',
    bookmakers: [
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:18Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:18Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.22,
              },
              {
                name: 'Parramatta Eels',
                price: 4.3,
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
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:18Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:18Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.25,
              },
              {
                name: 'Parramatta Eels',
                price: 4.7,
              },
              {
                name: 'Draw',
                price: 12.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:25:12Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:25:12Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.04,
              },
              {
                name: 'Parramatta Eels',
                price: 10,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:32:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.16,
              },
              {
                name: 'Parramatta Eels',
                price: 5.2,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:32:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.2,
              },
              {
                name: 'Parramatta Eels',
                price: 5.6,
              },
              {
                name: 'Draw',
                price: 14,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 3.6,
                point: -4.5,
              },
              {
                name: 'Parramatta Eels',
                price: 1.28,
                point: 4.5,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:27:50Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:50Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.5,
                point: -7.5,
              },
              {
                name: 'Parramatta Eels',
                price: 2.5,
                point: 7.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:27:50Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.8,
                point: 37.5,
              },
              {
                name: 'Under',
                price: 1.9,
                point: 37.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:32:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.25,
              },
              {
                name: 'Parramatta Eels',
                price: 3.75,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.32,
                point: -3.5,
              },
              {
                name: 'Parramatta Eels',
                price: 3.05,
                point: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:32:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.25,
              },
              {
                name: 'Parramatta Eels',
                price: 3.55,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.32,
                point: -3.5,
              },
              {
                name: 'Parramatta Eels',
                price: 2.95,
                point: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:32:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.23,
              },
              {
                name: 'Parramatta Eels',
                price: 3.85,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.29,
                point: -3.5,
              },
              {
                name: 'Parramatta Eels',
                price: 3.15,
                point: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:18Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:18Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.07,
              },
              {
                name: 'Parramatta Eels',
                price: 6,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:18Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.2,
              },
              {
                name: 'Parramatta Eels',
                price: 21,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:32:16Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:16Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.17,
              },
              {
                name: 'Parramatta Eels',
                price: 4.9,
              },
              {
                name: 'Draw',
                price: 20,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:32:16Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.85,
                point: 36.5,
              },
              {
                name: 'Under',
                price: 1.85,
                point: 36.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:32:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 1.2,
              },
              {
                name: 'Parramatta Eels',
                price: 5.6,
              },
              {
                name: 'Draw',
                price: 14,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:15Z',
            outcomes: [
              {
                name: 'Dolphins',
                price: 3.6,
                point: -4.5,
              },
              {
                name: 'Parramatta Eels',
                price: 1.28,
                point: 4.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '77db3dd74768ab3f24bbef95d00aae02',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T10:00:00Z',
    home_team: 'Jaqueline Cristian',
    away_team: 'Yulia Putintseva',
    bookmakers: [
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:29:13Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:13Z',
            outcomes: [
              {
                name: 'Jaqueline Cristian',
                price: 1.76,
              },
              {
                name: 'Yulia Putintseva',
                price: 2.13,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '4403258c11c4610c76181d9ffb8d5c96',
    sport_key: 'aussierules_afl',
    sport_title: 'AFL',
    commence_time: '2025-05-08T10:10:00Z',
    home_team: 'Fremantle Dockers',
    away_team: 'Collingwood Magpies',
    bookmakers: [
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:32:30Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:30Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.35,
              },
              {
                name: 'Fremantle Dockers',
                price: 3,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:31:10Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:10Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.85,
                point: -11.5,
              },
              {
                name: 'Fremantle Dockers',
                price: 1.85,
                point: 11.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:10Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.85,
                point: 184.5,
              },
              {
                name: 'Under',
                price: 1.85,
                point: 184.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:31Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:31Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.42,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.25,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:31Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.44,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.4,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:27Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.42,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.25,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.44,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.4,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:32:27Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.38,
              },
              {
                name: 'Fremantle Dockers',
                price: 2.89,
              },
              {
                name: 'Draw',
                price: 59.26,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:32:28Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:28Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.35,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.2,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:32:29Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:29Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.34,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.25,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:29Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.9,
                point: -11.5,
              },
              {
                name: 'Fremantle Dockers',
                price: 1.9,
                point: 11.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:32:27Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.34,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.1,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.85,
                point: -11.5,
              },
              {
                name: 'Fremantle Dockers',
                price: 1.89,
                point: 11.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:32:27Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.34,
              },
              {
                name: 'Fremantle Dockers',
                price: 3,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.83,
                point: -11.5,
              },
              {
                name: 'Fremantle Dockers',
                price: 1.88,
                point: 11.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.85,
                point: 183.5,
              },
              {
                name: 'Under',
                price: 1.87,
                point: 183.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:32:27Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:27Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.32,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.45,
              },
              {
                name: 'Draw',
                price: 41,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:32:28Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:28Z',
            outcomes: [
              {
                name: 'Collingwood Magpies',
                price: 1.35,
              },
              {
                name: 'Fremantle Dockers',
                price: 3.1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '911bc079b361ecb8fc02a2c4d8935f5c',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T10:34:00Z',
    home_team: 'Diana Shnaider',
    away_team: 'Caroline Dolehide',
    bookmakers: [
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:21:06Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:06Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 26,
              },
              {
                name: 'Diana Shnaider',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:27:33Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:33Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 10.1,
                point: 10.5,
              },
              {
                name: 'Diana Shnaider',
                price: 1.03,
                point: -10.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:27:33Z',
            outcomes: [
              {
                name: 'Over',
                price: 10.1,
                point: 13.5,
              },
              {
                name: 'Under',
                price: 1.03,
                point: 13.5,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:21:05Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:05Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 34,
              },
              {
                name: 'Diana Shnaider',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:29:13Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:13Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 16.07,
              },
              {
                name: 'Diana Shnaider',
                price: 1.06,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:27:34Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:27:34Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 50,
              },
              {
                name: 'Diana Shnaider',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:27:34Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:34Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 3.4,
                point: 11.5,
              },
              {
                name: 'Diana Shnaider',
                price: 1.28,
                point: -11.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:27:32Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:32Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 3.2,
                point: 11.5,
              },
              {
                name: 'Diana Shnaider',
                price: 1.32,
                point: -11.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:27:32Z',
            outcomes: [
              {
                name: 'Over',
                price: 3.2,
                point: 12.5,
              },
              {
                name: 'Under',
                price: 1.32,
                point: 12.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:27:33Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:33Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 3.2,
                point: 11.5,
              },
              {
                name: 'Diana Shnaider',
                price: 1.32,
                point: -11.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:27:34Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:34Z',
            outcomes: [
              {
                name: 'Caroline Dolehide',
                price: 3.1,
                point: 11.5,
              },
              {
                name: 'Diana Shnaider',
                price: 1.32,
                point: -11.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:27:34Z',
            outcomes: [
              {
                name: 'Over',
                price: 3.1,
                point: 12.5,
              },
              {
                name: 'Under',
                price: 1.32,
                point: 12.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '7a0661c19839ff71561f5d453e367173',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T10:53:00Z',
    home_team: 'Jelena Ostapenko',
    away_team: 'Rebecca Sramkova',
    bookmakers: [
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.14,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.86,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.16,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.88,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.04,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.95,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.06,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.96,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.05,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.72,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.1,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.08,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.82,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.22,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.91,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.15,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.15,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.96,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.66,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.7,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.14,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.68,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.88,
                point: 3.5,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.85,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.71,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 2.05,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.14,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.68,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.88,
                point: 3.5,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.86,
                point: -3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.1,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.67,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.85,
                point: 3.5,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.83,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.7,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 2.02,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.3,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.58,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.95,
                point: 3.5,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.75,
                point: -3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.1,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.7,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:43Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.82,
              },
              {
                name: 'Rebecca Sramkova',
                price: 2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.76,
                point: 1.5,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.99,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.78,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.97,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 2.28,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:30:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:54Z',
            outcomes: [
              {
                name: 'Jelena Ostapenko',
                price: 1.88,
              },
              {
                name: 'Rebecca Sramkova',
                price: 1.82,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cea951efb4b97d07d84e4191819dfba3',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T10:57:00Z',
    home_team: 'Elise Mertens',
    away_team: 'Suzan Lamens',
    bookmakers: [
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.14,
              },
              {
                name: 'Suzan Lamens',
                price: 1.75,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.32,
              },
              {
                name: 'Suzan Lamens',
                price: 1.87,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.3,
              },
              {
                name: 'Suzan Lamens',
                price: 1.73,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.38,
              },
              {
                name: 'Suzan Lamens',
                price: 1.76,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2,
              },
              {
                name: 'Suzan Lamens',
                price: 1.75,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2,
              },
              {
                name: 'Suzan Lamens',
                price: 1.73,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2,
              },
              {
                name: 'Suzan Lamens',
                price: 1.74,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.36,
              },
              {
                name: 'Suzan Lamens',
                price: 2,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.05,
              },
              {
                name: 'Suzan Lamens',
                price: 1.75,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.05,
              },
              {
                name: 'Suzan Lamens',
                price: 1.75,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.92,
              },
              {
                name: 'Suzan Lamens',
                price: 1.7,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.98,
              },
              {
                name: 'Suzan Lamens',
                price: 1.74,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.04,
              },
              {
                name: 'Suzan Lamens',
                price: 1.74,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.87,
                point: 1.5,
              },
              {
                name: 'Suzan Lamens',
                price: 1.86,
                point: -1.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.04,
              },
              {
                name: 'Suzan Lamens',
                price: 1.74,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.87,
                point: 1.5,
              },
              {
                name: 'Suzan Lamens',
                price: 1.85,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.8,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.93,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2,
              },
              {
                name: 'Suzan Lamens',
                price: 1.73,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.85,
                point: 1.5,
              },
              {
                name: 'Suzan Lamens',
                price: 1.85,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.78,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.91,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.95,
              },
              {
                name: 'Suzan Lamens',
                price: 1.8,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:43Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 2.05,
              },
              {
                name: 'Suzan Lamens',
                price: 1.78,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.85,
                point: 1.5,
              },
              {
                name: 'Suzan Lamens',
                price: 1.89,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.92,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.63,
              },
              {
                name: 'Suzan Lamens',
                price: 2.35,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:30:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:54Z',
            outcomes: [
              {
                name: 'Elise Mertens',
                price: 1.94,
              },
              {
                name: 'Suzan Lamens',
                price: 1.78,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'be14334381a437e38732c3eda078e4b3',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T11:16:00Z',
    home_team: 'Peyton Stearns',
    away_team: 'Anna Kalinskaya',
    bookmakers: [
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.36,
              },
              {
                name: 'Peyton Stearns',
                price: 1.72,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.4,
              },
              {
                name: 'Peyton Stearns',
                price: 1.73,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.9,
              },
              {
                name: 'Peyton Stearns',
                price: 1.5,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.05,
              },
              {
                name: 'Peyton Stearns',
                price: 1.53,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.9,
              },
              {
                name: 'Peyton Stearns',
                price: 1.37,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.85,
              },
              {
                name: 'Peyton Stearns',
                price: 1.4,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:21:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:07Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.05,
              },
              {
                name: 'Peyton Stearns',
                price: 1.8,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.05,
              },
              {
                name: 'Peyton Stearns',
                price: 1.31,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.15,
              },
              {
                name: 'Peyton Stearns',
                price: 1.32,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.15,
              },
              {
                name: 'Peyton Stearns',
                price: 1.33,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3,
              },
              {
                name: 'Peyton Stearns',
                price: 1.36,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.2,
              },
              {
                name: 'Peyton Stearns',
                price: 1.35,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.7,
                point: 5.5,
              },
              {
                name: 'Peyton Stearns',
                price: 2.08,
                point: -5.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.89,
                point: 20.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 20.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.2,
              },
              {
                name: 'Peyton Stearns',
                price: 1.35,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.7,
                point: 5.5,
              },
              {
                name: 'Peyton Stearns',
                price: 2.08,
                point: -5.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.1,
              },
              {
                name: 'Peyton Stearns',
                price: 1.35,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.7,
                point: 5.5,
              },
              {
                name: 'Peyton Stearns',
                price: 2.04,
                point: -5.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.88,
                point: 20.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 20.5,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:21:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:07Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.85,
              },
              {
                name: 'Peyton Stearns',
                price: 1.93,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:21:07Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.91,
                point: -0.5,
              },
              {
                name: 'Peyton Stearns',
                price: 1.87,
                point: 0.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:21:07Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.83,
                point: 20.5,
              },
              {
                name: 'Under',
                price: 1.95,
                point: 20.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:21:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:09Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.82,
              },
              {
                name: 'Peyton Stearns',
                price: 1.88,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.7,
              },
              {
                name: 'Peyton Stearns',
                price: 1.42,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.9,
                point: 4.5,
              },
              {
                name: 'Peyton Stearns',
                price: 1.8,
                point: -4.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3,
              },
              {
                name: 'Peyton Stearns',
                price: 1.35,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:43Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.81,
              },
              {
                name: 'Peyton Stearns',
                price: 1.44,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.85,
                point: 4.5,
              },
              {
                name: 'Peyton Stearns',
                price: 1.89,
                point: -4.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.8,
                point: 20.5,
              },
              {
                name: 'Under',
                price: 1.94,
                point: 20.5,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:29:13Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:13Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.03,
              },
              {
                name: 'Peyton Stearns',
                price: 1.87,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:29:13Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.95,
                point: 0.5,
              },
              {
                name: 'Peyton Stearns',
                price: 1.92,
                point: -0.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:29:13Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.93,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.94,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:24:51Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:24:51Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.86,
              },
              {
                name: 'Peyton Stearns',
                price: 1.96,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:24:51Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 1.95,
                point: 0.5,
              },
              {
                name: 'Peyton Stearns',
                price: 1.87,
                point: -0.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:24:51Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.83,
                point: 20.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 20.5,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.45,
              },
              {
                name: 'Peyton Stearns',
                price: 1.38,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 3.6,
              },
              {
                name: 'Peyton Stearns',
                price: 1.41,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:30:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:54Z',
            outcomes: [
              {
                name: 'Anna Kalinskaya',
                price: 2.68,
              },
              {
                name: 'Peyton Stearns',
                price: 1.41,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3bba16b7bde515fa036c59ab71dc06e8',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T11:29:00Z',
    home_team: 'Elisabetta Cocciaretto',
    away_team: 'Iga Swiatek',
    bookmakers: [
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 30,
              },
              {
                name: 'Iga Swiatek',
                price: 1.03,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 36,
              },
              {
                name: 'Iga Swiatek',
                price: 1.04,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 30,
              },
              {
                name: 'Iga Swiatek',
                price: 1.03,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 36,
              },
              {
                name: 'Iga Swiatek',
                price: 1.04,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:29:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:15Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 17.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 13,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:29:14Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 13,
              },
              {
                name: 'Iga Swiatek',
                price: 1.02,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 13,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 19,
              },
              {
                name: 'Iga Swiatek',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:43Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 17,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 1.66,
                point: 8.5,
              },
              {
                name: 'Iga Swiatek',
                price: 2.14,
                point: -8.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.08,
                point: 16.5,
              },
              {
                name: 'Under',
                price: 1.7,
                point: 16.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:19:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:19:53Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 12.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.02,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:19:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 14,
              },
              {
                name: 'Iga Swiatek',
                price: 1.02,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:19:54Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 1.9,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.91,
                point: -7.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.79,
                point: 16.5,
              },
              {
                name: 'Under',
                price: 1.99,
                point: 16.5,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 15,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:22:23Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:22:23Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 17,
              },
              {
                name: 'Iga Swiatek',
                price: 1.02,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 26,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 26,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:27:32Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:27:32Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 16.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.04,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:27:32Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 26,
              },
              {
                name: 'Iga Swiatek',
                price: 1.07,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:32Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 2.22,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.65,
                point: -7.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:27:32Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.97,
                point: 16.5,
              },
              {
                name: 'Under',
                price: 1.84,
                point: 16.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 15,
              },
              {
                name: 'Iga Swiatek',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:29:14Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 19,
              },
              {
                name: 'Iga Swiatek',
                price: 1.02,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:29:15Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:15Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 19,
              },
              {
                name: 'Iga Swiatek',
                price: 1.02,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:27:33Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:27:33Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 13,
              },
              {
                name: 'Iga Swiatek',
                price: 1.02,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:33Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 1.87,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.9,
                point: -7.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:27:33Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.95,
                point: 16.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 16.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:27:35Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:27:35Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 11.77,
              },
              {
                name: 'Iga Swiatek',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:27:34Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:27:34Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 12,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:27:34Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 1.85,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.9,
                point: -7.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 18,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 2.12,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.67,
                point: -7.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 18,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 2.12,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.67,
                point: -7.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.02,
                point: 16.5,
              },
              {
                name: 'Under',
                price: 1.74,
                point: 16.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 16,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 2.08,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.66,
                point: -7.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 16.5,
              },
              {
                name: 'Under',
                price: 1.73,
                point: 16.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:29:13Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:29:13Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 2,
                point: 7.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.83,
                point: -7.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:29:13Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 16.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 16.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:30:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:54Z',
            outcomes: [
              {
                name: 'Elisabetta Cocciaretto',
                price: 11.5,
              },
              {
                name: 'Iga Swiatek',
                price: 1.01,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '1d0748f4c1a9f7ad298386db67c02d52',
    sport_key: 'tennis_atp_italian_open',
    sport_title: 'ATP Italian Open',
    commence_time: '2025-05-08T11:30:00Z',
    home_team: 'Fabian Marozsan',
    away_team: 'Joao Fonseca',
    bookmakers: [
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:29:14Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.15,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.04,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.84,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.01,
                point: 22,
              },
              {
                name: 'Under',
                price: 1.86,
                point: 22,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.2,
              },
              {
                name: 'Joao Fonseca',
                price: 1.33,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.95,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.78,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.74,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.05,
              },
              {
                name: 'Joao Fonseca',
                price: 1.33,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.93,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.77,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.73,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.96,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.2,
              },
              {
                name: 'Joao Fonseca',
                price: 1.33,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.96,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.78,
                point: -3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.7,
              },
              {
                name: 'Joao Fonseca',
                price: 1.42,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.85,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.87,
                point: -3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.75,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.04,
              },
              {
                name: 'Joao Fonseca',
                price: 1.36,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:24:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:24:54Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.75,
              },
              {
                name: 'Joao Fonseca',
                price: 1.36,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:30:46Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:46Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3,
              },
              {
                name: 'Joao Fonseca',
                price: 1.38,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:46Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.98,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.8,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:46Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.82,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.95,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.04,
              },
              {
                name: 'Joao Fonseca',
                price: 1.38,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.95,
              },
              {
                name: 'Joao Fonseca',
                price: 1.37,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.88,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.05,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.89,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.92,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3,
              },
              {
                name: 'Joao Fonseca',
                price: 1.39,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:44Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.95,
              },
              {
                name: 'Joao Fonseca',
                price: 1.39,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.4,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.41,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.4,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.41,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.05,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3,
              },
              {
                name: 'Joao Fonseca',
                price: 1.39,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1,
              },
              {
                name: 'Joao Fonseca',
                price: 1,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:29:16Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:16Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.9,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:30:46Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:46Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.9,
              },
              {
                name: 'Joao Fonseca',
                price: 1.36,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.95,
              },
              {
                name: 'Joao Fonseca',
                price: 1.37,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.88,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
        ],
      },
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:29:14Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.85,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.96,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:29:14Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.9,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.9,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.4,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.41,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.03,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.83,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 22,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 22,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:29:16Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:29:16Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 3.06,
              },
              {
                name: 'Joao Fonseca',
                price: 1.4,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:29:16Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 1.88,
                point: 3.5,
              },
              {
                name: 'Joao Fonseca',
                price: 1.93,
                point: -3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:29:16Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.81,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:32:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:10Z',
            outcomes: [
              {
                name: 'Fabian Marozsan',
                price: 2.97,
              },
              {
                name: 'Joao Fonseca',
                price: 1.36,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'abad76592aa2bd61aa8d989c530ee35a',
    sport_key: 'tennis_atp_italian_open',
    sport_title: 'ATP Italian Open',
    commence_time: '2025-05-08T11:30:00Z',
    home_team: 'Mariano Navone',
    away_team: 'Federico Coria',
    bookmakers: [
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:26:07Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:26:07Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 5.32,
              },
              {
                name: 'Mariano Navone',
                price: 1.19,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:26:07Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 2.05,
                point: 5,
              },
              {
                name: 'Mariano Navone',
                price: 1.83,
                point: -5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:26:07Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.98,
                point: 20,
              },
              {
                name: 'Under',
                price: 1.89,
                point: 20,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 2.2,
                point: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.63,
                point: -4.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 20.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 20.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.25,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 2.15,
                point: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.63,
                point: -4.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.88,
                point: 20.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 20.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 2.2,
                point: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.63,
                point: -4.5,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.33,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:21:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:09Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.2,
              },
              {
                name: 'Mariano Navone',
                price: 1.19,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:21:09Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:09Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.4,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 5.1,
              },
              {
                name: 'Mariano Navone',
                price: 1.21,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 5.8,
              },
              {
                name: 'Mariano Navone',
                price: 1.24,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 5,
              },
              {
                name: 'Mariano Navone',
                price: 1.24,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 5.2,
              },
              {
                name: 'Mariano Navone',
                price: 1.25,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.17,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.2,
              },
              {
                name: 'Mariano Navone',
                price: 1.18,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.5,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:21:08Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:21:08Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.4,
              },
              {
                name: 'Mariano Navone',
                price: 1.2,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.4,
              },
              {
                name: 'Mariano Navone',
                price: 1.22,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 5.9,
              },
              {
                name: 'Mariano Navone',
                price: 1.27,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:24:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:24:53Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.96,
              },
              {
                name: 'Mariano Navone',
                price: 1.19,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:24:53Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 1.95,
                point: 5,
              },
              {
                name: 'Mariano Navone',
                price: 1.87,
                point: -5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:24:53Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 20,
              },
              {
                name: 'Under',
                price: 1.91,
                point: 20,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:32:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:10Z',
            outcomes: [
              {
                name: 'Federico Coria',
                price: 4.3,
              },
              {
                name: 'Mariano Navone',
                price: 1.18,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9e1fa23db7bd6341b51a68dc28e14b56',
    sport_key: 'tennis_atp_italian_open',
    sport_title: 'ATP Italian Open',
    commence_time: '2025-05-08T11:50:00Z',
    home_team: 'Marcelo Tomas Barrios Vera',
    away_team: 'Jaume Munar',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.54,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.42,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.58,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.41,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.6,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.6,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.62,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.64,
              },
            ],
          },
        ],
      },
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.57,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.42,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.85,
                point: -2.5,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 1.92,
                point: 2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.99,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.8,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.55,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.45,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.58,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.41,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.55,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.35,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.6,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.6,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.62,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.64,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.57,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.4,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.58,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.4,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.56,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.4,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.56,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.43,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.8,
                point: -2.5,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.02,
                point: 2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.94,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.84,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.57,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.35,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.92,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.58,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.35,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.57,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.35,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.92,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.53,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.38,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.53,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.38,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.55,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.4,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.77,
                point: -2.5,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 1.98,
                point: 2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.77,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.53,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.35,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.53,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.35,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.57,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.38,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.55,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.35,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.8,
                point: -2.5,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 1.95,
                point: 2.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.56,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.4,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.55,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.3,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.56,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.3,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.58,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.52,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.97,
                point: -3,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 1.9,
                point: 3,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 22,
              },
              {
                name: 'Under',
                price: 1.96,
                point: 22,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.59,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.47,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.91,
                point: -3,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 1.91,
                point: 3,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 22,
              },
              {
                name: 'Under',
                price: 1.91,
                point: 22,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.6,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.6,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.62,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.96,
                point: -3,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 1.9,
                point: 3,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 22,
              },
              {
                name: 'Under',
                price: 1.96,
                point: 22,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.57,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.38,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:32:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:10Z',
            outcomes: [
              {
                name: 'Jaume Munar',
                price: 1.56,
              },
              {
                name: 'Marcelo Tomas Barrios Vera',
                price: 2.38,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '565f1f075b88d86e3fd7f0bec310d853',
    sport_key: 'tennis_atp_italian_open',
    sport_title: 'ATP Italian Open',
    commence_time: '2025-05-08T12:00:00Z',
    home_team: 'Arthur Rinderknech',
    away_team: 'Matteo Gigante',
    bookmakers: [
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.15,
              },
              {
                name: 'Matteo Gigante',
                price: 1.77,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.97,
                point: 1,
              },
              {
                name: 'Matteo Gigante',
                price: 1.9,
                point: -1,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 23,
              },
              {
                name: 'Under',
                price: 1.96,
                point: 23,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.12,
              },
              {
                name: 'Matteo Gigante',
                price: 1.72,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.85,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.92,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.79,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.12,
              },
              {
                name: 'Matteo Gigante',
                price: 1.72,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.85,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.92,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.79,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.12,
              },
              {
                name: 'Matteo Gigante',
                price: 1.72,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.86,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.92,
                point: -1.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.1,
              },
              {
                name: 'Matteo Gigante',
                price: 1.7,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.8,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.95,
                point: -1.5,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.2,
              },
              {
                name: 'Matteo Gigante',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.15,
              },
              {
                name: 'Matteo Gigante',
                price: 1.68,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.1,
              },
              {
                name: 'Matteo Gigante',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.1,
              },
              {
                name: 'Matteo Gigante',
                price: 1.72,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.83,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.92,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.98,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.77,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.15,
              },
              {
                name: 'Matteo Gigante',
                price: 1.7,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.14,
              },
              {
                name: 'Matteo Gigante',
                price: 1.71,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.15,
              },
              {
                name: 'Matteo Gigante',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2,
              },
              {
                name: 'Matteo Gigante',
                price: 1.7,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.15,
              },
              {
                name: 'Matteo Gigante',
                price: 1.74,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.91,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.91,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.12,
              },
              {
                name: 'Matteo Gigante',
                price: 1.72,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.1,
              },
              {
                name: 'Matteo Gigante',
                price: 1.71,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.22,
              },
              {
                name: 'Matteo Gigante',
                price: 1.78,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.28,
              },
              {
                name: 'Matteo Gigante',
                price: 1.81,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.22,
              },
              {
                name: 'Matteo Gigante',
                price: 1.78,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.28,
              },
              {
                name: 'Matteo Gigante',
                price: 1.81,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.2,
              },
              {
                name: 'Matteo Gigante',
                price: 1.68,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.15,
              },
              {
                name: 'Matteo Gigante',
                price: 1.68,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.2,
              },
              {
                name: 'Matteo Gigante',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.2,
              },
              {
                name: 'Matteo Gigante',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.05,
              },
              {
                name: 'Matteo Gigante',
                price: 1.69,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.1,
              },
              {
                name: 'Matteo Gigante',
                price: 1.7,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.14,
              },
              {
                name: 'Matteo Gigante',
                price: 1.71,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.15,
              },
              {
                name: 'Matteo Gigante',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.13,
              },
              {
                name: 'Matteo Gigante',
                price: 1.72,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.88,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.89,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.98,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.81,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.24,
              },
              {
                name: 'Matteo Gigante',
                price: 1.78,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.28,
              },
              {
                name: 'Matteo Gigante',
                price: 1.8,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.96,
                point: 1,
              },
              {
                name: 'Matteo Gigante',
                price: 1.89,
                point: -1,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.9,
                point: 23,
              },
              {
                name: 'Under',
                price: 1.95,
                point: 23,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.25,
              },
              {
                name: 'Matteo Gigante',
                price: 1.69,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.87,
                point: 2,
              },
              {
                name: 'Matteo Gigante',
                price: 1.95,
                point: -2,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 23,
              },
              {
                name: 'Under',
                price: 1.91,
                point: 23,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:32:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:10Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.2,
              },
              {
                name: 'Matteo Gigante',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'betanysports',
        title: 'BetAnySports',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.87,
                point: 23,
              },
              {
                name: 'Under',
                price: 1.87,
                point: 23,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 2.14,
              },
              {
                name: 'Matteo Gigante',
                price: 1.68,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Arthur Rinderknech',
                price: 1.91,
                point: 1.5,
              },
              {
                name: 'Matteo Gigante',
                price: 1.9,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.98,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.81,
                point: 23.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '38e89e04de66660817124562c59eac62',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T12:00:00Z',
    home_team: 'Danielle Collins',
    away_team: 'Elena Gabriela Ruse',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.46,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.64,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.56,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.72,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.58,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.78,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.49,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.49,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.48,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.55,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.56,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.72,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.58,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.78,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.68,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.93,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.88,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.94,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.84,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.47,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.65,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.47,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.7,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.47,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.67,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:43Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.48,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.75,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.91,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.91,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.95,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.87,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.48,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.83,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.92,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.95,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.8,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.45,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.56,
              },
            ],
          },
        ],
      },
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.49,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.9,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.87,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.94,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.84,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.52,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.71,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.91,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.96,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.9,
                point: 21,
              },
              {
                name: 'Under',
                price: 1.97,
                point: 21,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.65,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.49,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.48,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.48,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.45,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.55,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.52,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.72,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.59,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.94,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.89,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.98,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 21,
              },
              {
                name: 'Under',
                price: 1.96,
                point: 21,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.46,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.8,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.92,
                point: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.91,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.87,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.96,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.81,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.91,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.87,
                point: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.6,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.91,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.87,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.96,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.81,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.49,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.72,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.93,
                point: -3.5,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 1.88,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Danielle Collins',
                price: 1.45,
              },
              {
                name: 'Elena Gabriela Ruse',
                price: 2.55,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'af733b6ffa8e40e61d3f1d6fd44db7e4',
    sport_key: 'tennis_atp_italian_open',
    sport_title: 'ATP Italian Open',
    commence_time: '2025-05-08T12:00:00Z',
    home_team: 'Luca Nardi',
    away_team: 'Flavio Cobolli',
    bookmakers: [
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.38,
              },
              {
                name: 'Luca Nardi',
                price: 3.27,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.87,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 2,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.88,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.38,
              },
              {
                name: 'Luca Nardi',
                price: 3.05,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.62,
                point: -2.5,
              },
              {
                name: 'Luca Nardi',
                price: 2.25,
                point: 2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.95,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.38,
              },
              {
                name: 'Luca Nardi',
                price: 3.05,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.62,
                point: -2.5,
              },
              {
                name: 'Luca Nardi',
                price: 2.25,
                point: 2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.95,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.38,
              },
              {
                name: 'Luca Nardi',
                price: 3.05,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.62,
                point: -2.5,
              },
              {
                name: 'Luca Nardi',
                price: 2.25,
                point: 2.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.34,
              },
              {
                name: 'Luca Nardi',
                price: 3.1,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.8,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 1.95,
                point: 3.5,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.36,
              },
              {
                name: 'Luca Nardi',
                price: 3.1,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.33,
              },
              {
                name: 'Luca Nardi',
                price: 3.25,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.33,
              },
              {
                name: 'Luca Nardi',
                price: 2.9,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.36,
              },
              {
                name: 'Luca Nardi',
                price: 3.1,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.82,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 1.93,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.93,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.42,
              },
              {
                name: 'Luca Nardi',
                price: 2.9,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.35,
              },
              {
                name: 'Luca Nardi',
                price: 3,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.33,
              },
              {
                name: 'Luca Nardi',
                price: 3,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.37,
              },
              {
                name: 'Luca Nardi',
                price: 3.2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.85,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 1.96,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.96,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.85,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.36,
              },
              {
                name: 'Luca Nardi',
                price: 3.15,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.35,
              },
              {
                name: 'Luca Nardi',
                price: 3.15,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.4,
              },
              {
                name: 'Luca Nardi',
                price: 3.35,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.43,
              },
              {
                name: 'Luca Nardi',
                price: 3.45,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.4,
              },
              {
                name: 'Luca Nardi',
                price: 3.35,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.43,
              },
              {
                name: 'Luca Nardi',
                price: 3.45,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.38,
              },
              {
                name: 'Luca Nardi',
                price: 3.1,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.37,
              },
              {
                name: 'Luca Nardi',
                price: 3.05,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.36,
              },
              {
                name: 'Luca Nardi',
                price: 3.1,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.34,
              },
              {
                name: 'Luca Nardi',
                price: 3,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.37,
              },
              {
                name: 'Luca Nardi',
                price: 2.85,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.42,
              },
              {
                name: 'Luca Nardi',
                price: 2.9,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.35,
              },
              {
                name: 'Luca Nardi',
                price: 3,
              },
            ],
          },
        ],
      },
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.37,
              },
              {
                name: 'Luca Nardi',
                price: 3.11,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.87,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 1.9,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.01,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.78,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.36,
              },
              {
                name: 'Luca Nardi',
                price: 3.14,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.36,
              },
              {
                name: 'Luca Nardi',
                price: 3,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.4,
              },
              {
                name: 'Luca Nardi',
                price: 3.35,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.43,
              },
              {
                name: 'Luca Nardi',
                price: 3.45,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.86,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 2,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.99,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.88,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.38,
              },
              {
                name: 'Luca Nardi',
                price: 3.15,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.91,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 1.91,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.91,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betanysports',
        title: 'BetAnySports',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.8,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 1.95,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.87,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.87,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.38,
              },
              {
                name: 'Luca Nardi',
                price: 3.08,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Flavio Cobolli',
                price: 1.85,
                point: -3.5,
              },
              {
                name: 'Luca Nardi',
                price: 1.96,
                point: 3.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.01,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.78,
                point: 22.5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'dc15c82b20f1fdd6400d2860ef2cedec',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T12:00:00Z',
    home_team: 'Hailey Baptiste',
    away_team: 'Liudmila Samsonova',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.1,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.72,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.27,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.64,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.26,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.77,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.3,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.79,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.22,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.67,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.85,
                point: 2.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.9,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.81,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.97,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.26,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.77,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.3,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.79,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.27,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.64,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:43Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.21,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.7,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.87,
                point: 2.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.95,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.82,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.17,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.7,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.94,
                point: 1.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.83,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.8,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.99,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.2,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.15,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.18,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.68,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.1,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.72,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.1,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.72,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.2,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.2,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.67,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.7,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.12,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.7,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.88,
                point: 1.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.88,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.83,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.93,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.06,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.68,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.18,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.75,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.93,
                point: 1.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.93,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.88,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.99,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.15,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.15,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.24,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.75,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.34,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.81,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.93,
                point: 1.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.93,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.88,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.98,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.2,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.19,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.68,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.15,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.65,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.1,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.7,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.87,
                point: 1.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.87,
                point: -1.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:19:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.25,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.86,
                point: 2.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.92,
                point: -2.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:19:53Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:19:53Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.25,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:19:53Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.85,
                point: 2.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.92,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:19:53Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.85,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.92,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:19:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.25,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.85,
                point: 2.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.92,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:19:54Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.85,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.92,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.15,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.74,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 1.93,
                point: 1.5,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.88,
                point: -1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.83,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betanysports',
        title: 'BetAnySports',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.83,
                point: 21.5,
              },
              {
                name: 'Under',
                price: 1.91,
                point: 21.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:30:54Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:54Z',
            outcomes: [
              {
                name: 'Hailey Baptiste',
                price: 2.2,
              },
              {
                name: 'Liudmila Samsonova',
                price: 1.67,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c86629b7a31643d971c2c0c89c1315fb',
    sport_key: 'tennis_atp_italian_open',
    sport_title: 'ATP Italian Open',
    commence_time: '2025-05-08T12:00:00Z',
    home_team: 'Nuno Borges',
    away_team: 'Thiago Seyboth Wild',
    bookmakers: [
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.77,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.05,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.82,
                point: -0.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.95,
                point: 0.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.79,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.76,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.06,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.77,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.1,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.96,
                point: -1.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.85,
                point: 1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.02,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.8,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.82,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.18,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.85,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.22,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.75,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.08,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.82,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.18,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.85,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.22,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.76,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.08,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.71,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.05,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.76,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.05,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.76,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.08,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.78,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.1,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.74,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.05,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.74,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.08,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.93,
                point: -1.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.88,
                point: 1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.79,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.99,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.79,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 2,
                point: -1.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.76,
                point: 1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.78,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.97,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.79,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 2,
                point: -1.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.76,
                point: 1.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.79,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 2,
                point: -1.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.76,
                point: 1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.78,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.97,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.75,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.75,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.75,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.05,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.82,
                point: -0.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.93,
                point: 0.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.77,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.73,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.99,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.72,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.75,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.95,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.67,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.2,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.75,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.05,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.8,
                point: -0.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.95,
                point: 0.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.74,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.05,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.71,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.8,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.11,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.95,
                point: -1,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.92,
                point: 1,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.93,
                point: 23,
              },
              {
                name: 'Under',
                price: 1.94,
                point: 23,
              },
            ],
          },
        ],
      },
      {
        key: 'betanysports',
        title: 'BetAnySports',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.87,
                point: 23,
              },
              {
                name: 'Under',
                price: 1.87,
                point: 23,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.74,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.15,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.95,
                point: -1.5,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.87,
                point: 1.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.06,
                point: 23.5,
              },
              {
                name: 'Under',
                price: 1.79,
                point: 23.5,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.67,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.2,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.82,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.18,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.84,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.22,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.95,
                point: -1,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 1.91,
                point: 1,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.92,
                point: 23,
              },
              {
                name: 'Under',
                price: 1.93,
                point: 23,
              },
            ],
          },
        ],
      },
      {
        key: 'betclic',
        title: 'Betclic',
        last_update: '2025-05-08T11:32:10Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:10Z',
            outcomes: [
              {
                name: 'Nuno Borges',
                price: 1.71,
              },
              {
                name: 'Thiago Seyboth Wild',
                price: 2.1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '59c4d292f3d6e0f45e1f4a7295bb2898',
    sport_key: 'tennis_atp_italian_open',
    sport_title: 'ATP Italian Open',
    commence_time: '2025-05-08T12:30:00Z',
    home_team: 'Roberto Carballes Baena',
    away_team: 'Sebastian Ofner',
    bookmakers: [
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.29,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:27:35Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:27:35Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.34,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.61,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.38,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.69,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.44,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.73,
              },
            ],
          },
        ],
      },
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.25,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.65,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.82,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.95,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.96,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.82,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.34,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.61,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.28,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.63,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.25,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.59,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.35,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.63,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.85,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.96,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.96,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.85,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.38,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.7,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.44,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.73,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.32,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.61,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.3,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.64,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:03Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:03Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.25,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.62,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.62,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.29,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.63,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.86,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.95,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.88,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.88,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.23,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.8,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.96,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.77,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.23,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.8,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.97,
                point: -2.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.23,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.64,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.8,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.96,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.77,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.38,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.57,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.25,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.63,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.8,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.95,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.92,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.62,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.8,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.95,
                point: -2.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.3,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.6,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.35,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.52,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.31,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.67,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.94,
                point: 2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.93,
                point: -2,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.99,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.88,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.3,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.67,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.83,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 2,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.4,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.7,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.44,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.72,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.93,
                point: 2,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.91,
                point: -2,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.98,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.87,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betanysports',
        title: 'BetAnySports',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 1.83,
                point: 2.5,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.91,
                point: -2.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.91,
                point: 22.5,
              },
              {
                name: 'Under',
                price: 1.83,
                point: 22.5,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:30:45Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:45Z',
            outcomes: [
              {
                name: 'Roberto Carballes Baena',
                price: 2.38,
              },
              {
                name: 'Sebastian Ofner',
                price: 1.57,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '82220efa40b17110aeaf79588213ef19',
    sport_key: 'tennis_wta_italian_open',
    sport_title: 'WTA Italian Open',
    commence_time: '2025-05-08T13:00:00Z',
    home_team: 'Jasmine Paolini',
    away_team: 'Lulu Sun',
    bookmakers: [
      {
        key: 'onexbet',
        title: '1xBet',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.1,
              },
              {
                name: 'Lulu Sun',
                price: 7.1,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.84,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 1.93,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.78,
                point: 17.5,
              },
              {
                name: 'Under',
                price: 2.01,
                point: 17.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_eu',
        title: 'Betfair',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.1,
              },
              {
                name: 'Lulu Sun',
                price: 10,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.12,
              },
              {
                name: 'Lulu Sun',
                price: 11,
              },
            ],
          },
        ],
      },
      {
        key: 'betfair_ex_au',
        title: 'Betfair',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.1,
              },
              {
                name: 'Lulu Sun',
                price: 10,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.12,
              },
              {
                name: 'Lulu Sun',
                price: 11,
              },
            ],
          },
        ],
      },
      {
        key: 'pointsbetau',
        title: 'PointsBet (AU)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 7.8,
              },
            ],
          },
        ],
      },
      {
        key: 'betright',
        title: 'Bet Right',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 8,
              },
            ],
          },
        ],
      },
      {
        key: 'sport888',
        title: '888sport',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 7.5,
              },
            ],
          },
        ],
      },
      {
        key: 'williamhill',
        title: 'William Hill',
        last_update: '2025-05-08T11:31:59Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:59Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 7.5,
              },
            ],
          },
        ],
      },
      {
        key: 'matchbook',
        title: 'Matchbook',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.1,
              },
              {
                name: 'Lulu Sun',
                price: 10,
              },
            ],
          },
          {
            key: 'h2h_lay',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.11,
              },
              {
                name: 'Lulu Sun',
                price: 11,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.81,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2.04,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 18,
              },
              {
                name: 'Under',
                price: 1.85,
                point: 18,
              },
            ],
          },
        ],
      },
      {
        key: 'betsson',
        title: 'Betsson',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 8,
              },
            ],
          },
        ],
      },
      {
        key: 'nordicbet',
        title: 'Nordic Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 8,
              },
            ],
          },
        ],
      },
      {
        key: 'sportsbet',
        title: 'SportsBet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.06,
              },
              {
                name: 'Lulu Sun',
                price: 8.5,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_fr',
        title: 'Winamax (FR)',
        last_update: '2025-05-08T11:32:01Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:01Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 7.75,
              },
            ],
          },
        ],
      },
      {
        key: 'winamax_de',
        title: 'Winamax (DE)',
        last_update: '2025-05-08T11:32:00Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:32:00Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.09,
              },
              {
                name: 'Lulu Sun',
                price: 8.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet_eu',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.07,
              },
              {
                name: 'Lulu Sun',
                price: 9.5,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.76,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2.04,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.77,
                point: 17.5,
              },
              {
                name: 'Under',
                price: 2.02,
                point: 17.5,
              },
            ],
          },
        ],
      },
      {
        key: 'unibet',
        title: 'Unibet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.07,
              },
              {
                name: 'Lulu Sun',
                price: 9.5,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.76,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2.04,
                point: 6.5,
              },
            ],
          },
        ],
      },
      {
        key: 'tabtouch',
        title: 'TABtouch',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.07,
              },
              {
                name: 'Lulu Sun',
                price: 9.5,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.76,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2.04,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.77,
                point: 17.5,
              },
              {
                name: 'Under',
                price: 2.02,
                point: 17.5,
              },
            ],
          },
        ],
      },
      {
        key: 'playup',
        title: 'PlayUp',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.05,
              },
              {
                name: 'Lulu Sun',
                price: 9,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.77,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.77,
                point: 17.5,
              },
              {
                name: 'Under',
                price: 2,
                point: 17.5,
              },
            ],
          },
        ],
      },
      {
        key: 'boombet',
        title: 'BoomBet',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.04,
              },
              {
                name: 'Lulu Sun',
                price: 8.44,
              },
            ],
          },
        ],
      },
      {
        key: 'tab',
        title: 'TAB',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.05,
              },
              {
                name: 'Lulu Sun',
                price: 8.5,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.75,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2,
                point: 6.5,
              },
            ],
          },
        ],
      },
      {
        key: 'marathonbet',
        title: 'Marathon Bet',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.1,
              },
              {
                name: 'Lulu Sun',
                price: 6.9,
              },
            ],
          },
        ],
      },
      {
        key: 'parionssport_fr',
        title: 'Parions Sport (FR)',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 7,
              },
            ],
          },
        ],
      },
      {
        key: 'gtbets',
        title: 'GTbets',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 8.13,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.86,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 1.95,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Over',
                price: 2,
                point: 18.5,
              },
              {
                name: 'Under',
                price: 1.78,
                point: 18.5,
              },
            ],
          },
        ],
      },
      {
        key: 'neds',
        title: 'Neds',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.07,
              },
              {
                name: 'Lulu Sun',
                price: 8,
              },
            ],
          },
        ],
      },
      {
        key: 'ladbrokes_au',
        title: 'Ladbrokes',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.07,
              },
              {
                name: 'Lulu Sun',
                price: 8,
              },
            ],
          },
        ],
      },
      {
        key: 'tipico_de',
        title: 'Tipico',
        last_update: '2025-05-08T11:31:58Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:58Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.04,
              },
              {
                name: 'Lulu Sun',
                price: 8.2,
              },
            ],
          },
        ],
      },
      {
        key: 'coolbet',
        title: 'Coolbet',
        last_update: '2025-05-08T11:30:43Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.09,
              },
              {
                name: 'Lulu Sun',
                price: 8,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.87,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 1.95,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:30:43Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.76,
                point: 17.5,
              },
              {
                name: 'Under',
                price: 2.08,
                point: 17.5,
              },
            ],
          },
        ],
      },
      {
        key: 'everygame',
        title: 'Everygame',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.05,
              },
              {
                name: 'Lulu Sun',
                price: 8,
              },
            ],
          },
        ],
      },
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 10.11,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.83,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2.06,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 2.01,
                point: 18,
              },
              {
                name: 'Under',
                price: 1.86,
                point: 18,
              },
            ],
          },
        ],
      },
      {
        key: 'betr_au',
        title: 'Betr',
        last_update: '2025-05-08T11:31:57Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:57Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.08,
              },
              {
                name: 'Lulu Sun',
                price: 7.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betonlineag',
        title: 'BetOnline.ag',
        last_update: '2025-05-08T11:31:55Z',
        markets: [
          {
            key: 'h2h',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.05,
              },
              {
                name: 'Lulu Sun',
                price: 9.95,
              },
            ],
          },
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.83,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:55Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.79,
                point: 17.5,
              },
              {
                name: 'Under',
                price: 2.06,
                point: 17.5,
              },
            ],
          },
        ],
      },
      {
        key: 'betanysports',
        title: 'BetAnySports',
        last_update: '2025-05-08T11:31:56Z',
        markets: [
          {
            key: 'spreads',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Jasmine Paolini',
                price: 1.77,
                point: -6.5,
              },
              {
                name: 'Lulu Sun',
                price: 2,
                point: 6.5,
              },
            ],
          },
          {
            key: 'totals',
            last_update: '2025-05-08T11:31:56Z',
            outcomes: [
              {
                name: 'Over',
                price: 1.8,
                point: 17.5,
              },
              {
                name: 'Under',
                price: 1.95,
                point: 17.5,
              },
            ],
          },
        ],
      },
    ],
  },
];

const getMatches = async (sports: string[]): Promise<Match[]> => {
  const response = await axios.get(
    MATCHES_BASE_URL +
      `${sports.join(',')}odds/?regions=eu,au&markets=h2h,spreads,totals&` +
      'apiKey=' +
      import.meta.env.VITE_ODDS_API
  );
  return response.data;
};

const getSports = async (): Promise<Sport[]> => {
  const response = await axios.get(SPORTS_BASE_URL + '?apiKey=' + import.meta.env.VITE_ODDS_API);
  return response.data;
};

export { getMatches, getSports };
