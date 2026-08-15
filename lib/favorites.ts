export type FavoriteItem = {
  id: string;
  image: string;
  title: string;
  price: string | number;
};

const FAVORITES_KEY = "verdea-favorites";
export const FAVORITES_EVENT = "verdea-favorites-change";

function readFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeFavorites(items: FavoriteItem[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function getFavorites(): FavoriteItem[] {
  return readFavorites();
}

export function isFavorite(id: string | number): boolean {
  return readFavorites().some((item) => String(item.id) === String(id));
}

export function addFavorite(item: FavoriteItem) {
  const current = readFavorites();
  if (current.some((i) => String(i.id) === String(item.id))) return;
  writeFavorites([...current, item]);
}

export function removeFavorite(id: string | number) {
  const current = readFavorites();
  writeFavorites(current.filter((i) => String(i.id) !== String(id)));
}

/** Returns the new favorite state (true = just added, false = just removed) */
export function toggleFavorite(item: FavoriteItem): boolean {
  const isFav = isFavorite(item.id);
  if (isFav) {
    removeFavorite(item.id);
    return false;
  }
  addFavorite(item);
  return true;
}