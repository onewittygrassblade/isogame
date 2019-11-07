export default function toIso(cartX, cartY) {
  return {
    x: cartX - cartY,
    y: (cartX + cartY) / 2
  };
}
