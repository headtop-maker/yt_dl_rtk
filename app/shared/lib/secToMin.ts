export function secToMin(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedSecs = secs < 10 ? `0${secs}` : secs;
  return `${mins}:${paddedSecs}`;
}
