import { toZonedTime, formatInTimeZone } from "date-fns-tz";

export function parseUtcToLimaDate(
  utcDateStr: string | null | undefined
): Date | null {
  if (!utcDateStr) return null;
  const utcDate = new Date(utcDateStr);
  return toZonedTime(utcDate, "America/Lima");
}

export function formatTimeInLima(
  utcDateStr: string | null | undefined
): string {
  const zonedDate = parseUtcToLimaDate(utcDateStr);
  if (!zonedDate) return "--";
  return formatInTimeZone(zonedDate, "America/Lima", "HH:mm");
}

export function formatDateInLima(
  utcDateStr: string | null | undefined
): string {
  const zonedDate = parseUtcToLimaDate(utcDateStr);
  if (!zonedDate) return "--";
  return formatInTimeZone(zonedDate, "America/Lima", "yyyy-MM-dd");
}
