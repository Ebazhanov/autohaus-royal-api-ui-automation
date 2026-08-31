export function vehicleCandidates(origin: string, vehicleId: string): string[] {
  // Minimal set of candidates: observed canonical path and a lowercase fallback
  return [
    `${origin}/detail/data/vehicle.php?Id=${vehicleId}`,
    `${origin}/detail/data/vehicle.php?id=${vehicleId}`,
  ];
}
