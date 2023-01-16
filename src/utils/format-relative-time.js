const LOCALE = "de";

export function formatRelativeTime(fromDate) {

  return new Date(fromDate).toLocaleDateString(LOCALE);
}
