export function getInputValue(event: HTMLInputElement): number {
  return parseInt(event['target'].value, 10);
};
