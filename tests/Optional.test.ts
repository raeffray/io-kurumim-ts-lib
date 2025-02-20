
import { describe, expect, test, vi } from "vitest";

import { Optional } from '../src/utils/optional'; // Adjust the import path

describe('Optional<T>', () => {
    test('ofNullable creates an Optional wrapping a non-null value', () => {
        const optional = Optional.ofNullable('Hello');
        expect(optional.get()).toBe('Hello');
    });

    test('ofNullable creates an empty Optional for null or undefined', () => {
        const nullOptional = Optional.ofNullable(null);
        const undefinedOptional = Optional.ofNullable(undefined);

        expect(() => nullOptional.get()).toThrow('No value present');
        expect(() => undefinedOptional.get()).toThrow('No value present');
    });
    test('map transforms a value if present', () => {
        const optional = Optional.ofNullable(5);
        const transformed = optional.map(value => value * 2);
    
        expect(transformed.get()).toBe(10);
    });

    test('map skips transformation if value is null or undefined', () => {
        const optional = Optional.ofNullable<number | null>(null);
        const transformed = optional.map(value => value * 2);

        expect(() => transformed.get()).toThrow('No value present');
    });

    test('filter retains the value if predicate is true', () => {
        const optional = Optional.ofNullable(5);
        const filtered = optional.filter(value => value > 3);

        expect(filtered.get()).toBe(5);
    });

    test('filter removes the value if predicate is false', () => {
        const optional = Optional.ofNullable(5);
        const filtered = optional.filter(value => value < 3);

        expect(() => filtered.get()).toThrow('No value present');
    });

    test('orElse returns the value if present', () => {
        const optional = Optional.ofNullable('Hello');
        const value = optional.orElse('Default');

        expect(value).toBe('Hello');
    });

    test('orElse returns the default value if Optional is empty', () => {
        const optional = Optional.ofNullable<string | null>(null);
        const value = optional.orElse('Default');

        expect(value).toBe('Default');
    });

    test('ifPresent executes the consumer if value is present', () => {
        const optional = Optional.ofNullable(5);
        const mockConsumer = vi.fn();

        optional.ifPresent(mockConsumer);

        expect(mockConsumer).toHaveBeenCalledWith(5);
        expect(mockConsumer).toHaveBeenCalledTimes(1);
    });

    test('ifPresent does not execute the consumer if value is empty', () => {
        const optional = Optional.ofNullable<number | null>(null);
        const mockConsumer = vi.fn();

        optional.ifPresent(mockConsumer);

        expect(mockConsumer).not.toHaveBeenCalled();
    });

    test('get throws an error if the value is empty', () => {
        const optional = Optional.ofNullable<number | null>(null);

        expect(() => optional.get()).toThrow('No value present');
    });

    test('get returns the value if present', () => {
        const optional = Optional.ofNullable('Hello');

        expect(optional.get()).toBe('Hello');
    });

    test('orElseThrow returns the value if present', () => {
        const optional = Optional.ofNullable(42);
        expect(optional.orElseThrow(() => new Error('Should not be thrown'))).toBe(42);
    });

    test('orElseThrow throws the provided exception if empty', () => {
        const optional = Optional.ofNullable<number | null>(null);
        
        expect(() => optional.orElseThrow(() => new Error('Custom error')))
            .toThrow('Custom error');
    });

    test('orElse calls function supplier when Optional is empty', () => {
        const optional = Optional.ofNullable<number | null>(null);
        const defaultSupplier = vi.fn(() => 100);
    
        expect(optional.orElse(defaultSupplier)).toBe(100);
        expect(defaultSupplier).toHaveBeenCalledTimes(1);
    });

    test('map should handle null return values correctly', () => {
        const optional = Optional.ofNullable(5);
        const transformed = optional.map(() => null);
    
        expect(() => transformed.get()).toThrow('No value present');
    });
    
    test('map should handle undefined return values correctly', () => {
        const optional = Optional.ofNullable(5);
        const transformed = optional.map(() => undefined);
    
        expect(() => transformed.get()).toThrow('No value present');
    });
    
    test('isPresent returns true when value is present', () => {
        const optional = Optional.ofNullable('Hello');
        expect(optional.isPresent()).toBe(true);
    });

    test('isPresent returns false when value is null', () => {
        const optional = Optional.ofNullable(null);
        expect(optional.isPresent()).toBe(false);
    });

    test('isPresent returns false when value is undefined', () => {
        const optional = Optional.ofNullable(undefined);
        expect(optional.isPresent()).toBe(false);
    });
    
});
