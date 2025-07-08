import { beforeAll, beforeEach, describe, expect, it, test } from 'vitest';
import { syncroState, y } from '../../lib/index.js';

const createDocument = () =>
	syncroState({
		schema: {
			array: y.array(y.string()),
			nullableArray: y.array(y.string()).nullable(),
			optionalArray: y.array(y.string()).optional(),
			nullableOptionalArray: y.array(y.string()).nullable().optional(),
			arrayWithDefault: y.array(y.string()).default(['default']),
			arrayWithDefaultAndOptional: y.array(y.string()).default(['default']).optional(),
			arrayWithDefaultAndNullable: y.array(y.string()).default(['default']).nullable(),
			arrayWithDefaultAndNullableAndOptional: y
				.array(y.string())
				.default(['default'])
				.nullable()
				.optional()
		}
	});

const state = createDocument();

describe('ArrayProxy', () => {
	describe('Initial values', () => {
		it('should be an array', () => {
			expect(Array.isArray(state.array)).toBe(true);
			expect(state.array.length).toBe(0);
		});
		it('should have null as default value for nullable array', () => {
			expect(state.nullableArray).toBe(null);
		});
		it('should have undefined as default value for optional array', () => {
			expect(state.optionalArray).toBe(undefined);
		});
		it('should have undefined as default value for nullable optional array', () => {
			expect(state.nullableOptionalArray).toBe(undefined);
		});
		it('should have default value for array with default', () => {
			expect(state.arrayWithDefault).toEqual(['default']);
		});
		it('should have default value for optional array with default', () => {
			expect(state.arrayWithDefaultAndOptional).toEqual(['default']);
		});
		it('should have default value for nullable array with default', () => {
			expect(state.arrayWithDefaultAndNullable).toEqual(['default']);
		});
		it('should have default value for nullable optional array with default', () => {
			expect(state.arrayWithDefaultAndNullableAndOptional).toEqual(['default']);
		});
	});

	describe('Setters', () => {
		describe('Array', () => {
			beforeEach(() => {
				state.array = ['test'];
			});

			it('should set the value', () => {
				state.array = ['hello', 'world'];
				expect(state.array).toEqual(['hello', 'world']);
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.array = null;
				expect(state.array).toEqual(['test']);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.array = undefined;
				expect(state.array).toEqual(['test']);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.array = 'invalid';
				expect(state.array).toEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.array = 123;
				expect(state.array).toEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.array = [123, true, {}];
				expect(state.array).toEqual(['test']);
			});

			it('should support array methods', async () => {
				state.array.push('world');
				expect(state.array).toEqual(['test', 'world']);

				state.array.pop();
				expect(state.array).toEqual(['test']);

				state.array.unshift('hello');
				expect(state.array).toEqual(['hello', 'test']);

				state.array.shift();
				expect(state.array).toEqual(['test']);

				state.array = ['a', 'b', 'c'];
				expect(state.array.slice(1)).toEqual(['b', 'c']);
				expect(state.array.map((x: string) => x.toUpperCase())).toEqual(['A', 'B', 'C']);
				expect(state.array.filter((x: string) => x !== 'b')).toEqual(['a', 'c']);
			});
		});

		describe('Nullable Array', () => {
			beforeEach(async () => {
				state.nullableArray = ['test'];
			});

			it('should set the value', () => {
				state.nullableArray = ['hello', 'world'];
				expect(state.nullableArray).toEqual(['hello', 'world']);
			});

			it('should set the value to null', () => {
				state.nullableArray = null;
				expect(state.nullableArray).toBe(null);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.nullableArray = undefined;
				expect([...state.nullableArray]).toStrictEqual(['test']);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.nullableArray = 'invalid';
				expect([...state.nullableArray]).toStrictEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.nullableArray = 123;
				expect([...state.nullableArray]).toStrictEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.nullableArray = [123, true, {}];
				expect([...state.nullableArray]).toStrictEqual(['test']);
			});
		});

		describe('Optional Array', () => {
			beforeAll(() => {
				state.optionalArray = ['test'];
			});
			beforeEach(() => {
				state.optionalArray = ['test'];
			});

			test('should set the value', () => {
				state.optionalArray = ['hello', 'world'];
				expect(state.optionalArray).toEqual(['hello', 'world']);
			});

			test('should set the value to undefined', () => {
				state.optionalArray = undefined;
				expect(state.optionalArray).toBe(undefined);
			});

			test('should not set the value to null', () => {
				// @ts-expect-error
				state.optionalArray = null;
				expect(state.optionalArray).toEqual(['test']);
			});

			test('should not set the value to a string', () => {
				// @ts-expect-error
				state.optionalArray = 'invalid';
				expect(state.optionalArray).toEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.optionalArray = 123;
				expect(state.optionalArray).toEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.optionalArray = [123, true, {}];
				expect(state.optionalArray).toEqual(['test']);
			});
		});

		describe('Nullable Optional Array', () => {
			beforeEach(() => {
				state.nullableOptionalArray = ['test'];
			});

			it('should set the value', () => {
				state.nullableOptionalArray = ['hello', 'world'];
				expect(state.nullableOptionalArray).toEqual(['hello', 'world']);
			});

			it('should set the value to null', () => {
				state.nullableOptionalArray = null;
				expect(state.nullableOptionalArray).toBe(null);
			});

			it('should set the value to undefined', () => {
				state.nullableOptionalArray = undefined;
				expect(state.nullableOptionalArray).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.nullableOptionalArray = 'invalid';
				expect(state.nullableOptionalArray).toEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.nullableOptionalArray = 123;
				expect(state.nullableOptionalArray).toEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.nullableOptionalArray = [123, true, {}];
				expect(state.nullableOptionalArray).toEqual(['test']);
			});
		});

		describe('Array With Default', () => {
			beforeEach(() => {
				state.arrayWithDefault = ['test'];
			});

			it('should set the value', () => {
				state.arrayWithDefault = ['hello', 'world'];
				expect(state.arrayWithDefault).toEqual(['hello', 'world']);
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.arrayWithDefault = null;
				expect(state.arrayWithDefault).toEqual(['test']);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.arrayWithDefault = undefined;
				expect(state.arrayWithDefault).toEqual(['test']);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.arrayWithDefault = 'invalid';
				expect(state.arrayWithDefault).toEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.arrayWithDefault = 123;
				expect(state.arrayWithDefault).toEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.arrayWithDefault = [123, true, {}];
				expect(state.arrayWithDefault).toEqual(['test']);
			});
		});

		describe('Array With Default And Optional', () => {
			beforeEach(() => {
				state.arrayWithDefaultAndOptional = ['test'];
			});

			it('should set the value', () => {
				state.arrayWithDefaultAndOptional = ['hello', 'world'];
				expect(state.arrayWithDefaultAndOptional).toEqual(['hello', 'world']);
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndOptional = null;
				expect(state.arrayWithDefaultAndOptional).toEqual(['test']);
			});

			it('should set the value to undefined', () => {
				state.arrayWithDefaultAndOptional = undefined;
				expect(state.arrayWithDefaultAndOptional).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndOptional = 'invalid';
				expect(state.arrayWithDefaultAndOptional).toEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndOptional = 123;
				expect(state.arrayWithDefaultAndOptional).toEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndOptional = [123, true, {}];
				expect(state.arrayWithDefaultAndOptional).toEqual(['test']);
			});
		});

		describe('Array With Default And Nullable', () => {
			beforeEach(() => {
				state.arrayWithDefaultAndNullable = ['test'];
			});

			it('should set the value', () => {
				state.arrayWithDefaultAndNullable = ['hello', 'world'];
				expect(state.arrayWithDefaultAndNullable).toEqual(['hello', 'world']);
			});

			it('should set the value to null', () => {
				state.arrayWithDefaultAndNullable = null;
				expect(state.arrayWithDefaultAndNullable).toBe(null);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndNullable = undefined;
				expect([...state.arrayWithDefaultAndNullable]).toStrictEqual(['test']);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndNullable = 'invalid';
				expect([...state.arrayWithDefaultAndNullable]).toStrictEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndNullable = 123;
				expect([...state.arrayWithDefaultAndNullable]).toStrictEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndNullable = [123, true, {}];
				expect([...state.arrayWithDefaultAndNullable]).toStrictEqual(['test']);
			});
		});

		describe('Array With Default And Nullable And Optional', () => {
			beforeEach(() => {
				state.arrayWithDefaultAndNullableAndOptional = ['test'];
			});

			it('should set the value', () => {
				state.arrayWithDefaultAndNullableAndOptional = ['hello', 'world'];
				expect(state.arrayWithDefaultAndNullableAndOptional).toEqual(['hello', 'world']);
			});

			it('should set the value to null', () => {
				state.arrayWithDefaultAndNullableAndOptional = null;
				expect(state.arrayWithDefaultAndNullableAndOptional).toBe(null);
			});

			it('should set the value to undefined', () => {
				state.arrayWithDefaultAndNullableAndOptional = undefined;
				expect(state.arrayWithDefaultAndNullableAndOptional).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndNullableAndOptional = 'invalid';
				expect(state.arrayWithDefaultAndNullableAndOptional).toEqual(['test']);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndNullableAndOptional = 123;
				expect(state.arrayWithDefaultAndNullableAndOptional).toEqual(['test']);
			});

			it('should not set invalid array items', () => {
				// @ts-expect-error
				state.arrayWithDefaultAndNullableAndOptional = [123, true, {}];
				expect(state.arrayWithDefaultAndNullableAndOptional).toEqual(['test']);
			});
		});
	});
});
