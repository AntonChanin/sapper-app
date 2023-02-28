/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
*/

const clamp = (value: number, min: number, max?: number): number => Math.min(Math.max(value, min), max ?? value);

export default clamp;