/* =========================================================
   CinePhile — Vanilla JS Application
   ========================================================= */

'use strict';

// ─────────────────────────────────────────────────────────
//  CONFIGURATION & CONSTANTS
// ─────────────────────────────────────────────────────────
const DEFAULT_OMDB_API_KEY = (typeof CONFIG !== 'undefined') ? CONFIG.OMDB_API_KEY : '';

function getApiKey() {
  try {
    const custom = localStorage.getItem('custom_omdb_api_key');
    return (custom && custom.trim()) ? custom.trim() : DEFAULT_OMDB_API_KEY;
  } catch (e) {
    return DEFAULT_OMDB_API_KEY;
  }
}

// ─────────────────────────────────────────────────────────
//  MOCK MOVIES DATA
// ─────────────────────────────────────────────────────────
const POPULAR_MOVIES = [
  {
    Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Type: 'movie',
    Poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    Rated: 'PG-13', Released: '16 Jul 2010', Runtime: '148 min',
    Genre: 'Action, Sci-Fi, Adventure', Director: 'Christopher Nolan', Writer: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy',
    Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.',
    Language: 'English, Japanese, French', Country: 'USA, UK',
    Awards: 'Won 4 Oscars. 159 wins & 220 nominations total',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }, { Source: 'Rotten Tomatoes', Value: '87%' }, { Source: 'Metacritic', Value: '74/100' }],
    Metascore: '74', imdbRating: '8.8', imdbVotes: '2,500,000', BoxOffice: '$292,576,195', Response: 'True'
  },
  {
    Title: 'The Dark Knight', Year: '2008', imdbID: 'tt0468569', Type: 'movie',
    Poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80',
    Rated: 'PG-13', Released: '18 Jul 2008', Runtime: '152 min',
    Genre: 'Action, Crime, Drama', Director: 'Christopher Nolan', Writer: 'Jonathan Nolan, Christopher Nolan, David S. Goyer',
    Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart, Maggie Gyllenhaal',
    Plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    Language: 'English, Mandarin', Country: 'USA, UK',
    Awards: 'Won 2 Oscars. 263 wins & 262 nominations total',
    Ratings: [{ Source: 'Internet Movie Database', Value: '9.0/10' }, { Source: 'Rotten Tomatoes', Value: '94%' }, { Source: 'Metacritic', Value: '84/100' }],
    Metascore: '84', imdbRating: '9.0', imdbVotes: '2,850,000', BoxOffice: '$534,858,444', Response: 'True'
  },
  {
    Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692', Type: 'movie',
    Poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    Rated: 'PG-13', Released: '07 Nov 2014', Runtime: '169 min',
    Genre: 'Adventure, Drama, Sci-Fi', Director: 'Christopher Nolan', Writer: 'Jonathan Nolan, Christopher Nolan',
    Actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain, John Lithgow',
    Plot: 'When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity\'s survival.',
    Language: 'English', Country: 'USA, UK',
    Awards: 'Won 1 Oscar. 44 wins & 148 nominations total',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.7/10' }, { Source: 'Rotten Tomatoes', Value: '73%' }, { Source: 'Metacritic', Value: '74/100' }],
    Metascore: '74', imdbRating: '8.7', imdbVotes: '2,050,000', BoxOffice: '$188,020,017', Response: 'True'
  },
  {
    Title: 'Spider-Man: Into the Spider-Verse', Year: '2018', imdbID: 'tt4633694', Type: 'movie',
    Poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80',
    Rated: 'PG', Released: '14 Dec 2018', Runtime: '117 min',
    Genre: 'Animation, Action, Adventure', Director: 'Bob Persichetti, Peter Ramsey, Rodney Rothman',
    Writer: 'Phil Lord, Rodney Rothman',
    Actors: 'Shameik Moore, Jake Johnson, Hailee Steinfeld, Mahershala Ali',
    Plot: 'Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
    Language: 'English, Spanish', Country: 'USA',
    Awards: 'Won 1 Oscar. 85 wins & 59 nominations total',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.4/10' }, { Source: 'Rotten Tomatoes', Value: '97%' }, { Source: 'Metacritic', Value: '87/100' }],
    Metascore: '87', imdbRating: '8.4', imdbVotes: '640,000', BoxOffice: '$190,241,310', Response: 'True'
  },
  {
    Title: 'The Matrix', Year: '1999', imdbID: 'tt0133093', Type: 'movie',
    Poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    Rated: 'R', Released: '31 Mar 1999', Runtime: '136 min',
    Genre: 'Action, Sci-Fi', Director: 'Lana Wachowski, Lilly Wachowski',
    Writer: 'Lana Wachowski, Lilly Wachowski',
    Actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
    Plot: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth: the life he knows is the elaborate deception of an evil cyber-intelligence.',
    Language: 'English', Country: 'USA, Australia',
    Awards: 'Won 4 Oscars. 42 wins & 52 nominations total',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.7/10' }, { Source: 'Rotten Tomatoes', Value: '83%' }, { Source: 'Metacritic', Value: '73/100' }],
    Metascore: '73', imdbRating: '8.7', imdbVotes: '2,010,000', BoxOffice: '$171,479,930', Response: 'True'
  },
  {
    Title: 'Stranger Things', Year: '2016–2025', imdbID: 'tt5028002', Type: 'series',
    Poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    Rated: 'TV-14', Released: '15 Jul 2016', Runtime: '51 min',
    Genre: 'Drama, Fantasy, Horror', Director: 'N/A', Writer: 'Matt Duffer, Ross Duffer',
    Actors: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour',
    Plot: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    Language: 'English', Country: 'USA',
    Awards: 'Nominated for 4 Golden Globes. 109 wins & 288 nominations total',
    Ratings: [{ Source: 'Internet Movie Database', Value: '8.7/10' }],
    Metascore: 'N/A', imdbRating: '8.7', imdbVotes: '1,350,000', BoxOffice: 'N/A', Response: 'True'
  }
];

// ─────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────
const state = {
  activeTab: 'discover',
  query: '',
  typeFilter: 'all',
  yearFilter: '',
  sortOption: 'year-desc',
  movies: [],
  totalResults: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  selectedMovie: null,

  isKeyUnauthorized: false,
  keyStateToken: 0,
  favorites: [],
  // fav-tab local filters
  favSearch: '',
  favType: 'all',
};

// Load favorites from localStorage
try {
  const saved = localStorage.getItem('movie_favorites');
  state.favorites = saved ? JSON.parse(saved) : [];
} catch(e) { state.favorites = []; }

function saveFavorites() {
  try { localStorage.setItem('movie_favorites', JSON.stringify(state.favorites)); } catch(e) {}
}

// ─────────────────────────────────────────────────────────
//  DOM REFERENCES
// ─────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const els = {
  // Header
  tabDiscoverBtn: $('tab-discover-btn'),
  tabFavoritesBtn: $('tab-favorites-btn'),
  favCountBadge: $('fav-count-badge'),
  // Banner
  unauthorizedBanner: $('unauthorized-banner'),
  // Tabs
  discoverTab: $('discover-tab'),
  favoritesTab: $('favorites-tab'),
  // Search
  searchForm: $('search-form'),
  searchInput: $('search-input'),
  clearSearchBtn: $('clear-search-btn'),
  toggleFiltersBtn: $('toggle-filters-btn'),
  filtersPanel: $('filters-panel'),
  filterActiveBadge: $('filter-active-badge'),
  typeFilterGroup: $('type-filter-group'),
  yearFilterInput: $('year-filter-input'),
  clearYearBtn: $('clear-year-btn'),
  submitSearchBtn: $('submit-search-btn'),
  searchBtnIcon: $('search-btn-icon'),
  searchBtnSpinner: $('search-btn-spinner'),
  // Results
  resultsHeadingText: $('results-heading-text'),
  sparkleIcon: document.querySelector('.sparkle-icon'),
  resultsMeta: $('results-meta'),
  sortControls: $('sort-controls'),
  sortSelect: $('sort-movies-select'),
  skeletonGrid: $('skeleton-grid'),
  errorState: $('error-state'),
  errorMessage: $('error-message'),
  resetSearchBtn: $('reset-search-btn'),
  moviesGrid: $('movies-grid'),
  pagination: $('pagination'),
  prevPageBtn: $('prev-page-btn'),
  nextPageBtn: $('next-page-btn'),
  currentPageNum: $('current-page-num'),
  totalPagesNum: $('total-pages-num'),
  // Favorites
  favControls: $('fav-controls'),
  favLocalSearch: $('fav-local-search'),
  favTypeGroup: $('fav-type-group'),
  clearAllFavBtn: $('clear-all-fav-btn'),
  favGrid: $('fav-grid'),
  favEmpty: $('fav-empty'),
  favNoFilterResult: $('fav-no-filter-result'),
  // Detail Modal
  detailOverlay: $('movie-detail-overlay'),
  detailBackdrop: $('detail-backdrop'),
  detailTypeLabel: $('detail-type-label'),
  toggleFavDetailBtn: $('toggle-fav-detail-btn'),
  detailFavIcon: $('detail-fav-icon'),
  detailFavLabel: $('detail-fav-label'),
  closeDetailBtn: $('close-detail-btn'),
  detailBody: $('detail-body'),

};

// ─────────────────────────────────────────────────────────
//  API FUNCTIONS
// ─────────────────────────────────────────────────────────
async function searchMovies(query, page = 1, type = 'all', year = '') {
  const trimmed = query.trim();

  if (!trimmed) {
    const filtered = POPULAR_MOVIES.filter(m => {
      if (type && type !== 'all' && m.Type !== type) return false;
      if (year && !m.Year.includes(year)) return false;
      return true;
    });
    return { Search: filtered, totalResults: String(filtered.length), Response: 'True' };
  }

  const apiKey = getApiKey();
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(trimmed)}&page=${page}`;
  if (type && type !== 'all') url += `&type=${type}`;
  if (year) url += `&y=${year}`;

  try {
    const res = await fetch(url);
    const isAuthErr = res.status === 401 || res.status === 403;
    if (isAuthErr) {
      return offlineFallback(trimmed, type, year, true);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const isApiKeyError = data.Response === 'False' &&
      (data.Error === 'Invalid API key!' || data.Error === 'No API key provided.' || (data.Error || '').includes('unauthorized'));
    if (isApiKeyError) return offlineFallback(trimmed, type, year, true);

    if (data.Response === 'False') {
      const matches = mockSearch(trimmed, type, year);
      if (matches.length > 0) return { Search: matches, totalResults: String(matches.length), Response: 'True' };
    }
    return data;
  } catch(err) {
    console.error('API error:', err);
    return offlineFallback(trimmed, type, year, false);
  }
}

function mockSearch(query, type, year) {
  const q = query.toLowerCase();
  return POPULAR_MOVIES.filter(m => {
    const titleMatch = m.Title.toLowerCase().includes(q);
    const typeMatch = !type || type === 'all' || m.Type === type;
    const yearMatch = !year || m.Year.includes(year);
    return titleMatch && typeMatch && yearMatch;
  });
}

function offlineFallback(query, type, year, isUnauthorized = false) {
  const matches = mockSearch(query, type, year);
  const result = matches.length > 0 ? matches : POPULAR_MOVIES;
  return { Search: result, totalResults: String(result.length), Response: 'True', isFallback: true, isUnauthorized };
}

async function getMovieDetails(imdbID) {
  const mockMovie = POPULAR_MOVIES.find(m => m.imdbID === imdbID);
  const apiKey = getApiKey();
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
  try {
    const res = await fetch(url);
    if (res.status === 401 || res.status === 403) return mockMovie || POPULAR_MOVIES[0];
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.Response === 'False') return mockMovie || POPULAR_MOVIES[0];
    return data;
  } catch(err) {
    console.error('Detail API error:', err);
    return mockMovie || POPULAR_MOVIES[0];
  }
}

// ─────────────────────────────────────────────────────────
//  RENDER HELPERS
// ─────────────────────────────────────────────────────────
function isFavorite(imdbID) {
  return state.favorites.some(f => f.imdbID === imdbID);
}

function starSVG() {
  return `<svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#E2B616" stroke="#E2B616" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
}
function filmSVG(size=22) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="20" height="20" x="2" y="2" rx="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/></svg>`;
}
function infoSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
}
function heartSVG(filled=false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${filled ? '#fff' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
}

function createMovieCard(movie) {
  const fav = isFavorite(movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  const rating = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A';

  const card = document.createElement('div');
  card.className = 'movie-card';
  card.id = `movie-card-${movie.imdbID}`;
  card.setAttribute('data-id', movie.imdbID);

  card.innerHTML = `
    <button class="card-fav-btn ${fav ? 'active' : ''}" data-id="${movie.imdbID}" title="${fav ? 'Remove from Favorites' : 'Add to Favorites'}">
      ${heartSVG(fav)}
    </button>
    <div class="card-poster-wrap">
      ${hasPoster
        ? `<img src="${movie.Poster}" alt="${escHtml(movie.Title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.innerHTML = '<div class=\\'card-poster-fallback\\'>${filmSVG(36)}<span>${escHtml(movie.Type)}</span></div>'" />`
        : `<div class="card-poster-fallback">${filmSVG(36)}<span>${escHtml(movie.Type)}</span></div>`
      }
      <div class="card-hover-overlay">
        <button class="card-detail-btn" data-id="${movie.imdbID}">
          ${infoSVG()} View Details
        </button>
      </div>
    </div>
    <div class="card-info">
      <div class="card-meta">
        <span class="card-type-badge">${escHtml(movie.Type)}</span>
        <span class="card-year">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
          ${escHtml(movie.Year)}
        </span>
      </div>
      <h3 class="card-title" title="${escHtml(movie.Title)}">${escHtml(movie.Title)}</h3>
      <div class="card-footer">
        <div class="card-rating">${starSVG()}<span>${rating}</span></div>
        <span class="card-imdb">ID: ${escHtml(movie.imdbID)}</span>
      </div>
    </div>
  `;

  // Fav button click
  card.querySelector('.card-fav-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  });

  // Detail button
  card.querySelector('.card-detail-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openDetail(movie);
  });

  // Click on poster or title opens detail
  card.querySelector('.card-poster-wrap').addEventListener('click', () => openDetail(movie));
  card.querySelector('.card-title').addEventListener('click', () => openDetail(movie));

  return card;
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─────────────────────────────────────────────────────────
//  SORTING
// ─────────────────────────────────────────────────────────
function sortMovies(movies, option) {
  return [...movies].sort((a, b) => {
    if (option === 'title-asc') return a.Title.localeCompare(b.Title);
    if (option === 'title-desc') return b.Title.localeCompare(a.Title);
    const ya = parseInt((a.Year || '0').split('–')[0], 10) || 0;
    const yb = parseInt((b.Year || '0').split('–')[0], 10) || 0;
    if (option === 'year-desc') return yb - ya;
    if (option === 'year-asc') return ya - yb;
    return 0;
  });
}

// ─────────────────────────────────────────────────────────
//  RENDER DISCOVER MOVIES
// ─────────────────────────────────────────────────────────
function renderMovies() {
  const { movies, sortOption, totalResults, currentPage, isLoading, error, query } = state;
  const totalPages = Math.ceil(totalResults / 10);
  const sorted = sortMovies(movies, sortOption);

  // Spinner in search button
  els.searchBtnIcon.classList.toggle('hidden', isLoading);
  els.searchBtnSpinner.classList.toggle('hidden', !isLoading);
  els.submitSearchBtn.disabled = isLoading;

  // Results title
  if (query) {
    els.sparkleIcon && els.sparkleIcon.classList.add('hidden');
    els.resultsHeadingText.innerHTML = `Search Results for <span class="red">"${escHtml(query)}"</span>`;
  } else {
    els.sparkleIcon && els.sparkleIcon.classList.remove('hidden');
    els.resultsHeadingText.textContent = 'Curated Blockbuster Highlights';
  }

  // Meta
  if (totalResults > 0) {
    els.resultsMeta.textContent = `Found ${totalResults} matches. Showing ${movies.length} on page ${currentPage} of ${totalPages}.`;
  } else {
    els.resultsMeta.textContent = 'Featured selection of high-rating cinema files.';
  }

  // Sort controls
  els.sortControls.classList.toggle('hidden', movies.length === 0);

  // States
  els.skeletonGrid.classList.add('hidden');
  els.errorState.classList.add('hidden');
  els.moviesGrid.classList.remove('hidden');
  els.pagination.classList.add('hidden');

  if (isLoading) {
    // Skeleton
    els.moviesGrid.innerHTML = '';
    els.skeletonGrid.classList.remove('hidden');
    els.skeletonGrid.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      els.skeletonGrid.innerHTML += `
        <div class="skeleton-card">
          <div class="skeleton-poster"></div>
          <div class="skeleton-line w-half"></div>
          <div class="skeleton-line w-3q"></div>
          <div class="skeleton-line w-half"></div>
        </div>`;
    }
    return;
  }

  if (error) {
    els.moviesGrid.innerHTML = '';
    els.errorState.classList.remove('hidden');
    els.errorMessage.textContent = `We couldn't locate cinema files matching "${query}". Check spelling, refine filters, or update your API credentials.`;
    els.resetSearchBtn.classList.toggle('hidden', !query);
    return;
  }

  if (sorted.length > 0) {
    els.moviesGrid.innerHTML = '';
    sorted.forEach(m => els.moviesGrid.appendChild(createMovieCard(m)));

    // Pagination
    if (totalPages > 1) {
      els.pagination.classList.remove('hidden');
      els.currentPageNum.textContent = currentPage;
      els.totalPagesNum.textContent = totalPages;
      els.prevPageBtn.disabled = currentPage === 1;
      els.nextPageBtn.disabled = currentPage === totalPages;
    }
  } else {
    els.moviesGrid.innerHTML = '';
  }
}

// ─────────────────────────────────────────────────────────
//  RENDER FAVORITES
// ─────────────────────────────────────────────────────────
function renderFavorites() {
  const { favorites, favSearch, favType } = state;
  const filtered = favorites.filter(m => {
    const matchTitle = m.Title.toLowerCase().includes(favSearch.toLowerCase());
    const matchType = favType === 'all' || m.Type === favType;
    return matchTitle && matchType;
  });

  // Update badge
  if (favorites.length > 0) {
    els.favCountBadge.textContent = favorites.length;
    els.favCountBadge.classList.remove('hidden');
  } else {
    els.favCountBadge.classList.add('hidden');
  }

  els.favGrid.innerHTML = '';
  els.favEmpty.classList.add('hidden');
  els.favNoFilterResult.classList.add('hidden');
  els.favControls.classList.add('hidden');

  if (favorites.length === 0) {
    els.favEmpty.classList.remove('hidden');
    return;
  }

  els.favControls.classList.remove('hidden');

  if (filtered.length === 0) {
    els.favNoFilterResult.classList.remove('hidden');
    return;
  }

  filtered.forEach(m => els.favGrid.appendChild(createMovieCard(m)));
}

// ─────────────────────────────────────────────────────────
//  SEARCH
// ─────────────────────────────────────────────────────────
async function handleSearch(page = 1) {
  state.isLoading = true;
  state.error = null;
  renderMovies();

  try {
    const res = await searchMovies(state.query, page, state.typeFilter, state.yearFilter);
    state.isKeyUnauthorized = !!res.isUnauthorized;
    els.unauthorizedBanner.classList.toggle('hidden', !state.isKeyUnauthorized);

    if (res.Response === 'True' && res.Search) {
      state.movies = res.Search;
      state.totalResults = parseInt(res.totalResults || '0', 10);
      state.currentPage = page;
      state.error = null;
    } else {
      state.movies = [];
      state.totalResults = 0;
      state.error = res.Error || 'No results match your criteria.';
    }
  } catch(err) {
    state.movies = [];
    state.totalResults = 0;
    state.error = 'An unexpected network error occurred.';
  }

  state.isLoading = false;
  renderMovies();
}

// ─────────────────────────────────────────────────────────
//  FAVORITES
// ─────────────────────────────────────────────────────────
function toggleFavorite(movie) {
  const idx = state.favorites.findIndex(f => f.imdbID === movie.imdbID);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
  } else {
    state.favorites.push(movie);
  }
  saveFavorites();
  // Update all card fav buttons in view
  updateAllFavButtons();
  // Update detail modal fav button
  if (state.selectedMovie && state.selectedMovie.imdbID === movie.imdbID) {
    updateDetailFavBtn();
  }
  renderFavorites();
}

function updateAllFavButtons() {
  document.querySelectorAll('.card-fav-btn').forEach(btn => {
    const id = btn.getAttribute('data-id');
    const fav = isFavorite(id);
    btn.classList.toggle('active', fav);
    btn.innerHTML = heartSVG(fav);
    btn.title = fav ? 'Remove from Favorites' : 'Add to Favorites';
  });
}

function updateDetailFavBtn() {
  if (!state.selectedMovie) return;
  const fav = isFavorite(state.selectedMovie.imdbID);
  els.detailFavIcon.setAttribute('fill', fav ? '#fff' : 'none');
  els.detailFavLabel.textContent = fav ? 'Favorited' : 'Favorite';
  els.toggleFavDetailBtn.classList.toggle('active', fav);
}

// ─────────────────────────────────────────────────────────
//  MOVIE DETAIL MODAL
// ─────────────────────────────────────────────────────────
async function openDetail(movie) {
  state.selectedMovie = movie;
  els.detailTypeLabel.textContent = `${movie.Type} Details`;
  els.detailOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  updateDetailFavBtn();

  // Show loader
  els.detailBody.innerHTML = `
    <div class="detail-loader">
      <div class="big-spinner"></div>
      <p>Retrieving cinema files...</p>
    </div>`;

  try {
    const details = await getMovieDetails(movie.imdbID);
    renderDetailContent(details, movie);
  } catch(err) {
    els.detailBody.innerHTML = `
      <div class="detail-loader">
        <p>Failed to load details. Please try again.</p>
        <button class="btn-red" onclick="closeDetail()">Go Back</button>
      </div>`;
  }
}

function closeDetail() {
  els.detailOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  state.selectedMovie = null;
}

function renderDetailContent(details, fallbackMovie) {
  const d = details || fallbackMovie;
  const hasPoster = d.Poster && d.Poster !== 'N/A';

  const ratingsHtml = (d.Ratings && d.Ratings.length > 0)
    ? `<div class="ratings-panel">
        <span class="ratings-label">Ratings</span>
        ${d.Ratings.map(r => `
          <div class="rating-item">
            <span class="rating-source">${escHtml(r.Source)}</span>
            <span class="rating-value">${escHtml(r.Value)}</span>
          </div>`).join('')}
      </div>`
    : '';

  const genresHtml = (d.Genre && d.Genre !== 'N/A')
    ? d.Genre.split(', ').map(g => `<span class="genre-tag">${escHtml(g)}</span>`).join('')
    : '';

  const prodRowItems = [];
  if (d.Country && d.Country !== 'N/A') {
    prodRowItems.push(`<span class="prod-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      ${escHtml(d.Country)}</span>`);
  }
  if (d.Language && d.Language !== 'N/A') {
    prodRowItems.push(`<span class="prod-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      ${escHtml(d.Language)}</span>`);
  }
  if (d.Metascore && d.Metascore !== 'N/A') {
    prodRowItems.push(`<span class="prod-item" style="color:#e50914;">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e50914" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
      Metascore: ${escHtml(d.Metascore)}</span>`);
  }

  els.detailBody.innerHTML = `
    <div class="detail-grid">
      <div>
        <div class="detail-poster-wrap">
          ${hasPoster
            ? `<img src="${escHtml(d.Poster)}" alt="${escHtml(d.Title)}" referrerpolicy="no-referrer" onerror="this.parentElement.innerHTML='<div class=\\'detail-poster-fallback\\'>${filmSVG(40)}<span>No Poster</span></div>'" />`
            : `<div class="detail-poster-fallback">${filmSVG(40)}<span>No Poster</span></div>`}
        </div>
        ${ratingsHtml}
      </div>
      <div class="detail-info">
        <div>
          <h1 class="detail-title">${escHtml(d.Title)}</h1>
          <div class="detail-tagline">
            ${d.Rated && d.Rated !== 'N/A' ? `<span class="detail-tag-rated">${escHtml(d.Rated)}</span><span class="detail-tag-sep">•</span>` : ''}
            ${d.Runtime && d.Runtime !== 'N/A' ? `<span class="detail-tag-runtime">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${escHtml(d.Runtime)}</span><span class="detail-tag-sep">•</span>` : ''}
            ${d.Released && d.Released !== 'N/A' ? `<span>${escHtml(d.Released)}</span><span class="detail-tag-sep">•</span>` : ''}
            ${d.imdbRating && d.imdbRating !== 'N/A' ? `<span class="detail-tag-imdb">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#E2B616" stroke="#E2B616" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ${escHtml(d.imdbRating)} ${d.imdbVotes ? `(${escHtml(d.imdbVotes)} votes)` : ''}
            </span>` : ''}
          </div>
        </div>
        ${genresHtml ? `<div class="genre-tags">${genresHtml}</div>` : ''}
        <div class="plot-box">
          <span class="plot-box-label">Plot Summary</span>
          <p>${escHtml(d.Plot && d.Plot !== 'N/A' ? d.Plot : 'No detailed plot available.')}</p>
        </div>
        <div class="crew-grid">
          ${d.Director && d.Director !== 'N/A' ? `
          <div class="crew-item">
            <div class="crew-icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            <div class="crew-info"><span class="crew-role">Director</span><span class="crew-name" title="${escHtml(d.Director)}">${escHtml(d.Director)}</span></div>
          </div>` : ''}
          ${d.Awards && d.Awards !== 'N/A' ? `
          <div class="crew-item">
            <div class="crew-icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5 4 4"/><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m2 22 5.5-1.5L21 7a2.12 2.12 0 0 0-3-3L4.5 17.5Z"/></svg></div>
            <div class="crew-info"><span class="crew-role">Awards</span><span class="crew-name" title="${escHtml(d.Awards)}">${escHtml(d.Awards)}</span></div>
          </div>` : ''}
          ${d.Writer && d.Writer !== 'N/A' ? `
          <div class="crew-item">
            <div class="crew-icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/></svg></div>
            <div class="crew-info"><span class="crew-role">Writers</span><span class="crew-name" title="${escHtml(d.Writer)}">${escHtml(d.Writer)}</span></div>
          </div>` : ''}
          ${d.BoxOffice && d.BoxOffice !== 'N/A' ? `
          <div class="crew-item">
            <div class="crew-icon-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg></div>
            <div class="crew-info"><span class="crew-role">Box Office</span><span class="crew-name">${escHtml(d.BoxOffice)}</span></div>
          </div>` : ''}
        </div>
        ${d.Actors && d.Actors !== 'N/A' ? `
        <div class="actors-section">
          <span class="section-label">Starring Cast</span>
          <p>${escHtml(d.Actors)}</p>
        </div>` : ''}
        ${prodRowItems.length > 0 ? `<div class="production-row">${prodRowItems.join('')}</div>` : ''}
      </div>
    </div>`;
}


// ─────────────────────────────────────────────────────────
//  TAB SWITCHING
// ─────────────────────────────────────────────────────────
function switchTab(tab) {
  state.activeTab = tab;
  els.tabDiscoverBtn.classList.toggle('active', tab === 'discover');
  els.tabFavoritesBtn.classList.toggle('active', tab === 'favorites');
  els.discoverTab.classList.toggle('hidden', tab !== 'discover');
  els.favoritesTab.classList.toggle('hidden', tab !== 'favorites');

  if (tab === 'favorites') renderFavorites();
}

// ─────────────────────────────────────────────────────────
//  FILTER UI HELPERS
// ─────────────────────────────────────────────────────────
function updateFilterBadge() {
  const count = (state.typeFilter !== 'all' ? 1 : 0) + (state.yearFilter ? 1 : 0);
  els.filterActiveBadge.textContent = count;
  els.filterActiveBadge.classList.toggle('hidden', count === 0);
  els.toggleFiltersBtn.classList.toggle('active', count > 0 || els.filtersPanel.classList.contains('active'));
}

function updateClearSearchBtn() {
  els.clearSearchBtn.classList.toggle('hidden', !state.query);
}

function updateClearYearBtn() {
  els.clearYearBtn.classList.toggle('hidden', !state.yearFilter);
}

// ─────────────────────────────────────────────────────────
//  EVENT LISTENERS
// ─────────────────────────────────────────────────────────

// Tab buttons
els.tabDiscoverBtn.addEventListener('click', () => switchTab('discover'));
els.tabFavoritesBtn.addEventListener('click', () => switchTab('favorites'));


// Search
els.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSearch(1);
});
els.searchInput.addEventListener('input', () => {
  state.query = els.searchInput.value;
  updateClearSearchBtn();
});
els.clearSearchBtn.addEventListener('click', () => {
  state.query = '';
  state.typeFilter = 'all';
  state.yearFilter = '';
  els.searchInput.value = '';
  els.yearFilterInput.value = '';
  updateClearSearchBtn();
  updateClearYearBtn();
  updateFilterBadge();
  syncTypeFilterUI();
  handleSearch(1);
});
els.resetSearchBtn.addEventListener('click', () => {
  state.query = '';
  state.typeFilter = 'all';
  state.yearFilter = '';
  els.searchInput.value = '';
  els.yearFilterInput.value = '';
  updateClearSearchBtn();
  updateClearYearBtn();
  updateFilterBadge();
  syncTypeFilterUI();
  handleSearch(1);
});

// Filters toggle
els.toggleFiltersBtn.addEventListener('click', () => {
  els.filtersPanel.classList.toggle('hidden');
  els.filtersPanel.classList.toggle('active');
  els.toggleFiltersBtn.classList.toggle('active', !els.filtersPanel.classList.contains('hidden'));
});

// Type filter buttons
els.typeFilterGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('.type-btn');
  if (!btn) return;
  state.typeFilter = btn.getAttribute('data-type');
  syncTypeFilterUI();
  updateFilterBadge();
  handleSearch(1);
});

function syncTypeFilterUI() {
  $$('.type-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === state.typeFilter));
}

// Year filter
els.yearFilterInput.addEventListener('input', () => {
  state.yearFilter = els.yearFilterInput.value;
  updateClearYearBtn();
  updateFilterBadge();
});
els.yearFilterInput.addEventListener('change', () => {
  handleSearch(1);
});
els.clearYearBtn.addEventListener('click', () => {
  state.yearFilter = '';
  els.yearFilterInput.value = '';
  updateClearYearBtn();
  updateFilterBadge();
  handleSearch(1);
});

// Sort
els.sortSelect.addEventListener('change', () => {
  state.sortOption = els.sortSelect.value;
  renderMovies();
});

// Pagination
els.prevPageBtn.addEventListener('click', () => {
  if (state.currentPage > 1) {
    handleSearch(state.currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
els.nextPageBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(state.totalResults / 10);
  if (state.currentPage < totalPages) {
    handleSearch(state.currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Detail modal close
els.closeDetailBtn.addEventListener('click', closeDetail);
els.detailBackdrop.addEventListener('click', closeDetail);
els.toggleFavDetailBtn.addEventListener('click', () => {
  if (state.selectedMovie) {
    toggleFavorite(state.selectedMovie);
  }
});

// ESC key to close detail modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!els.detailOverlay.classList.contains('hidden')) closeDetail();
  }
});

// Favorites tab local controls
els.favLocalSearch.addEventListener('input', () => {
  state.favSearch = els.favLocalSearch.value;
  renderFavorites();
});
els.favTypeGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('.fav-type-btn');
  if (!btn) return;
  state.favType = btn.getAttribute('data-favtype');
  $$('.fav-type-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-favtype') === state.favType));
  renderFavorites();
});
els.clearAllFavBtn.addEventListener('click', () => {
  if (window.confirm('Are you sure you want to remove all saved movies?')) {
    state.favorites = [];
    saveFavorites();
    renderFavorites();
    updateAllFavButtons();
  }
});
$('reset-fav-filters-btn') && $('reset-fav-filters-btn').addEventListener('click', () => {
  state.favSearch = '';
  state.favType = 'all';
  els.favLocalSearch.value = '';
  $$('.fav-type-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-favtype') === 'all'));
  renderFavorites();
});

// ─────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────
function init() {
  updateClearSearchBtn();
  updateClearYearBtn();
  updateFilterBadge();
  renderFavorites();
  handleSearch(1);
}

init();
