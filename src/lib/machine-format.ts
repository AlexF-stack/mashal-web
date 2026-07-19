export function formatMass(value: number | string | null | undefined) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  if (numericValue < 1000) {
    return `${numericValue.toLocaleString("fr-FR")} t`;
  }

  return `${numericValue.toLocaleString("fr-FR")} kg`;
}

export function formatMassRange(
  min: number | string | null | undefined,
  max: number | string | null | undefined,
) {
  const minValue = Number(min);
  const maxValue = Number(max);

  if (!Number.isFinite(minValue)) {
    return null;
  }

  if (!Number.isFinite(maxValue) || minValue === maxValue) {
    return formatMass(minValue);
  }

  if (minValue < 1000 && maxValue < 1000) {
    return `${minValue.toLocaleString("fr-FR")} - ${maxValue.toLocaleString("fr-FR")} t`;
  }

  return `${minValue.toLocaleString("fr-FR")} - ${maxValue.toLocaleString("fr-FR")} kg`;
}

export function formatLengthMmOrMeters(value: number | string | null | undefined) {
  const numericValue = Number(String(value).replace(",", "."));

  if (!Number.isFinite(numericValue)) {
    return null;
  }

  if (numericValue < 100) {
    return `${numericValue.toLocaleString("fr-FR")} m`;
  }

  return `${numericValue.toLocaleString("fr-FR")} mm`;
}
