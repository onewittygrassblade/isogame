import { TILES_OFFSET, TILE_SIZE_CARTESIAN } from '../const/world';

export const cartToIso = (cartPos) => ({
  x: cartPos.x - cartPos.y,
  y: Math.round((cartPos.x + cartPos.y) / 2),
});

export const worldToCart = (worldPos) => ({
  x: worldPos.x * TILE_SIZE_CARTESIAN + TILES_OFFSET.x,
  y: worldPos.y * TILE_SIZE_CARTESIAN + TILES_OFFSET.y,
});

export const worldToIso = (worldPos) => (cartToIso(worldToCart(worldPos)));

export const isoToCart = (isoPos) => ({
  x: Math.round((2 * isoPos.y + isoPos.x) / 2),
  y: Math.round((2 * isoPos.y - isoPos.x) / 2),
});

export const cartToWorld = (cartPos) => ({
  x: Math.round((cartPos.x - TILES_OFFSET.x) / TILE_SIZE_CARTESIAN),
  y: Math.round((cartPos.y - TILES_OFFSET.y) / TILE_SIZE_CARTESIAN),
});

export const isoToWorld = (isoPos) => (cartToWorld(isoToCart(isoPos)));
