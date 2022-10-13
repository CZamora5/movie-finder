export function formatRuntime(runtime)  {
  if (runtime < 60) return `${runtime} minutes`;
  if (runtime % 60  === 0) return `${runtime / 60} hours`;

  return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
}