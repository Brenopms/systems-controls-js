import { describe, expect, it } from '@jest/globals';
import { complex, Complex } from 'mathjs';

import { closeTo } from '../../../../test/helpers/closeTo';

import { DurandKerner } from './durandKerner';

const PRECISION = 6;
const MAX_ITERATIONS = 50;

// Root order is not relevant, so the expected result and the actual result are sorted
const sortRoots = (num1: Partial<Complex>, num2: Partial<Complex>) => {
  if (num1.re === undefined || num2.re === undefined || num1.im === undefined || num2.im === undefined) {
    return 0;
  }

  if (num1.re < num2.re) {
    return -1;
  }
  if (num1.re > num2.re) {
    return 1;
  }

  if (num1.im < num2.im) {
    return -1;
  }

  if (num1.im > num2.im) {
    return 1;
  }

  return 0;
};

describe('Testing DurandKerner class to find roots of a polynomial', () => {
  it('Should throw an error if no coefficients are passed', () => {
    const coefficients = null;
    expect(() => {
      return new DurandKerner(coefficients as unknown as []);
    }).toThrow();
  });

  it('Should return an empty array if the coefficients are empty', () => {
    const coefficients: Complex[] = [];
    const durandKerner = new DurandKerner(coefficients);
    const roots = durandKerner.findRoots();

    expect(roots).toMatchObject([]);
  });

  it('Should return the correct roots for the equation: x² - 3x + 2', () => {
    const coefficients = [complex('1'), complex('-3'), complex('2')];
    const durandKerner = new DurandKerner(coefficients);

    const roots = durandKerner.findRoots(MAX_ITERATIONS, PRECISION);

    expect(roots).toMatchObject([
      { re: 1, im: 0 },
      { re: 2, im: 0 },
    ]);
  });

  it('Should return the correct roots for the equation: x² - 2x + 1', () => {
    const expectedResults = [
      { re: 1, im: 0 },
      { re: 1, im: 0 },
    ].sort(sortRoots);

    const coefficients = [complex('1'), complex('-2'), complex('1')];
    const durandKerner = new DurandKerner(coefficients);

    const roots = durandKerner.findRoots(MAX_ITERATIONS, PRECISION).sort(sortRoots);

    for (const [index, result] of roots.entries()) {
      expect(result).toMatchObject({
        re: closeTo(expectedResults[index].re, PRECISION),
        im: closeTo(expectedResults[index].im, PRECISION),
      });
    }
  });

  it('Should return the correct roots for the equation: x⁵ - 13x³ + 36x', () => {
    const expectedResults = [
      { re: -3, im: 0 },
      { re: -2, im: 0 },
      { re: 0, im: 0 },
      { re: 2, im: 0 },
      { re: 3, im: 0 },
    ].sort(sortRoots);

    const coefficients = [complex('1'), complex('0'), complex('-13'), complex('0'), complex('36'), complex('0')];
    const durandKerner = new DurandKerner(coefficients);

    const roots = durandKerner.findRoots(MAX_ITERATIONS, PRECISION).sort(sortRoots);

    for (const [index, result] of roots.entries()) {
      expect(result).toMatchObject({
        re: closeTo(expectedResults[index].re, PRECISION),
        im: closeTo(expectedResults[index].im, PRECISION),
      });
    }
  });

  it('Should return the correct roots for the equation: x³ + x² + x + 1', () => {
    const expectedResults = [
      { re: -1, im: 0 },
      { re: 0, im: 1 },
      { re: 0, im: -1 },
    ].sort(sortRoots);

    const coefficients = [complex('1'), complex('1'), complex('1'), complex('1')];
    const durandKerner = new DurandKerner(coefficients);

    const roots = durandKerner.findRoots(MAX_ITERATIONS, PRECISION).sort(sortRoots);

    for (const [index, result] of roots.entries()) {
      expect(result).toMatchObject({
        re: closeTo(expectedResults[index].re, PRECISION),
        im: closeTo(expectedResults[index].im, PRECISION),
      });
    }
  });

  it('Should return the correct roots for the equation: (1 + 3i)x² + (2 + 2i)x + (3 + i)', () => {
    const expectedResults = [
      { re: -8e-1, im: -6e-1 },
      { re: 0, im: 1 },
    ].sort(sortRoots);

    const coefficients = [complex('1 + 3i'), complex('2 + 2i'), complex('3 + i')];
    const durandKerner = new DurandKerner(coefficients);

    const roots = durandKerner.findRoots(MAX_ITERATIONS, PRECISION).sort(sortRoots);

    for (const [index, result] of roots.entries()) {
      expect(result).toMatchObject({
        re: closeTo(expectedResults[index].re, PRECISION),
        im: closeTo(expectedResults[index].im, PRECISION),
      });
    }
  });

  it('Should return the correct roots for the equation: (1 + i)x³ + (2 + 2i)x² + (3 + 3i)x + (4 + 4i)', () => {
    const expectedResults = [
      { re: -1.650629, im: 0 },
      { re: -1.74685e-1, im: 1.5468688872 },
      { re: -1.74685e-1, im: -1.5468688872 },
    ].sort(sortRoots);

    const coefficients = [complex('1 + i'), complex('2 + 2i'), complex('3 + 3i'), complex('4 + 4i')];
    const durandKerner = new DurandKerner(coefficients);

    const roots = durandKerner.findRoots(MAX_ITERATIONS, PRECISION).sort(sortRoots);

    for (const [index, result] of roots.entries()) {
      expect(result).toMatchObject({
        re: closeTo(expectedResults[index].re, PRECISION),
        im: closeTo(expectedResults[index].im, PRECISION),
      });
    }
  });
});
