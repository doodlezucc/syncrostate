import { beforeEach, describe, expect, it } from 'vitest';
import { syncroState, y } from '../../lib/index.js';

const state = syncroState({
	schema: {
		object: y.object({
			name: y.string(),
			age: y.number()
		}),
		nullableObject: y
			.object({
				name: y.string(),
				age: y.number()
			})
			.nullable(),
		optionalObject: y
			.object({
				name: y.string(),
				age: y.number()
			})
			.optional(),
		nullableOptionalObject: y
			.object({
				name: y.string(),
				age: y.number()
			})
			.nullable()
			.optional(),
		objectWithDefault: y
			.object({
				name: y.string(),
				age: y.number()
			})
			.default({ name: 'default', age: 0 }),
		objectWithDefaultAndOptional: y
			.object({
				name: y.string(),
				age: y.number()
			})
			.default({ name: 'default', age: 0 })
			.optional(),
		objectWithDefaultAndNullable: y
			.object({
				name: y.string(),
				age: y.number()
			})
			.default({ name: 'default', age: 0 })
			.nullable(),
		objectWithDefaultAndNullableAndOptional: y
			.object({
				name: y.string(),
				age: y.number()
			})
			.default({ name: 'default', age: 0 })
			.nullable()
			.optional()
	}
});

describe('ObjectProxy', () => {
	describe('Initial values', () => {
		it('should be an object', () => {
			expect(state.object).toBeTypeOf('object');
			expect(state.object.name).toBeTypeOf('string');
			expect(state.object.age).toBeTypeOf('number');
		});

		it('should have null as default value for nullable object', () => {
			expect(state.nullableObject).toBe(null);
		});

		it('should have undefined as default value for optional object', () => {
			expect(state.optionalObject).toBe(undefined);
		});

		it('should have undefined as default value for nullable optional object', () => {
			expect(state.nullableOptionalObject).toBe(undefined);
		});

		it('should have default value for object with default', () => {
			expect(state.objectWithDefault).toEqual({ name: 'default', age: 0 });
		});

		it('should have default value for optional object with default', () => {
			expect(state.objectWithDefaultAndOptional).toEqual({ name: 'default', age: 0 });
		});

		it('should have default value for nullable object with default', () => {
			expect(state.objectWithDefaultAndNullable).toEqual({ name: 'default', age: 0 });
		});

		it('should have default value for nullable optional object with default', () => {
			expect(state.objectWithDefaultAndNullableAndOptional).toEqual({ name: 'default', age: 0 });
		});
	});

	describe('Setters', () => {
		describe('Object', () => {
			beforeEach(() => {
				state.object = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.object = { name: 'hello world', age: 30 };
				expect(state.object).toEqual({ name: 'hello world', age: 30 });
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.object = null;
				expect(state.object).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.object = undefined;
				expect(state.object).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.object = 'invalid';
				expect(state.object).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.object = 123;
				expect(state.object).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.object = { name: 123, age: 'invalid' };
				expect(state.object).toEqual({ name: 'test', age: 25 });
			});
		});

		describe('Nullable Object', () => {
			beforeEach(() => {
				state.nullableObject = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.nullableObject = { name: 'hello world', age: 30 };
				expect(state.nullableObject).toEqual({ name: 'hello world', age: 30 });
			});

			it('should set the value to null', () => {
				state.nullableObject = null;
				expect(state.nullableObject).toBe(null);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.nullableObject = undefined;
				expect(JSON.parse(JSON.stringify(state.nullableObject))).toStrictEqual({
					name: 'test',
					age: 25
				});
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.nullableObject = 'invalid';
				expect(state.nullableObject).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.nullableObject = 123;
				expect(state.nullableObject).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.nullableObject = { name: 123, age: 'invalid' };
				expect(state.nullableObject).toEqual({ name: 'test', age: 25 });
			});
		});

		describe('Optional Object', () => {
			beforeEach(() => {
				state.optionalObject = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.optionalObject = { name: 'hello world', age: 30 };
				expect(state.optionalObject).toEqual({ name: 'hello world', age: 30 });
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.optionalObject = null;
				expect(state.optionalObject).toEqual({ name: 'test', age: 25 });
			});

			it('should set the value to undefined', () => {
				state.optionalObject = undefined;
				expect(state.optionalObject).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.optionalObject = 'invalid';
				expect(state.optionalObject).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.optionalObject = 123;
				expect(state.optionalObject).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.optionalObject = { name: 123, age: 'invalid' };
				expect(state.optionalObject).toEqual({ name: 'test', age: 25 });
			});
		});

		describe('Nullable Optional Object', () => {
			beforeEach(() => {
				state.nullableOptionalObject = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.nullableOptionalObject = { name: 'hello world', age: 30 };
				expect(state.nullableOptionalObject).toEqual({ name: 'hello world', age: 30 });
			});

			it('should set the value to null', () => {
				state.nullableOptionalObject = null;
				expect(state.nullableOptionalObject).toBe(null);
			});

			it('should set the value to undefined', () => {
				state.nullableOptionalObject = undefined;
				expect(state.nullableOptionalObject).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.nullableOptionalObject = 'invalid';
				expect(state.nullableOptionalObject).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.nullableOptionalObject = 123;
				expect(state.nullableOptionalObject).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.nullableOptionalObject = { name: 123, age: 'invalid' };
				expect(state.nullableOptionalObject).toEqual({ name: 'test', age: 25 });
			});
		});

		describe('Object With Default', () => {
			beforeEach(() => {
				state.objectWithDefault = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.objectWithDefault = { name: 'hello world', age: 30 };
				expect(state.objectWithDefault).toEqual({ name: 'hello world', age: 30 });
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.objectWithDefault = null;
				expect(state.objectWithDefault).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.objectWithDefault = undefined;
				expect(state.objectWithDefault).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.objectWithDefault = 'invalid';
				expect(state.objectWithDefault).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.objectWithDefault = 123;
				expect(state.objectWithDefault).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.objectWithDefault = { name: 123, age: 'invalid' };
				expect(state.objectWithDefault).toEqual({ name: 'test', age: 25 });
			});
		});

		describe('Object With Default And Optional', () => {
			beforeEach(() => {
				state.objectWithDefaultAndOptional = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.objectWithDefaultAndOptional = { name: 'hello world', age: 30 };
				expect(state.objectWithDefaultAndOptional).toEqual({ name: 'hello world', age: 30 });
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.objectWithDefaultAndOptional = null;
				expect(state.objectWithDefaultAndOptional).toEqual({ name: 'test', age: 25 });
			});

			it('should set the value to undefined', () => {
				state.objectWithDefaultAndOptional = undefined;
				expect(state.objectWithDefaultAndOptional).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.objectWithDefaultAndOptional = 'invalid';
				expect(state.objectWithDefaultAndOptional).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.objectWithDefaultAndOptional = 123;
				expect(state.objectWithDefaultAndOptional).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.objectWithDefaultAndOptional = { name: 123, age: 'invalid' };
				expect(state.objectWithDefaultAndOptional).toEqual({ name: 'test', age: 25 });
			});
		});

		describe('Object With Default And Nullable', () => {
			beforeEach(() => {
				state.objectWithDefaultAndNullable = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.objectWithDefaultAndNullable = { name: 'hello world', age: 30 };
				expect(state.objectWithDefaultAndNullable).toEqual({ name: 'hello world', age: 30 });
			});

			it('should set the value to null', () => {
				state.objectWithDefaultAndNullable = null;
				expect(state.objectWithDefaultAndNullable).toBe(null);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.objectWithDefaultAndNullable = undefined;
				expect(state.objectWithDefaultAndNullable).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.objectWithDefaultAndNullable = 'invalid';
				expect(state.objectWithDefaultAndNullable).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.objectWithDefaultAndNullable = 123;
				expect(state.objectWithDefaultAndNullable).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.objectWithDefaultAndNullable = { name: 123, age: 'invalid' };
				expect(state.objectWithDefaultAndNullable).toEqual({ name: 'test', age: 25 });
			});
		});

		describe('Object With Default And Nullable And Optional', () => {
			beforeEach(() => {
				state.objectWithDefaultAndNullableAndOptional = { name: 'test', age: 25 };
			});

			it('should set the value', () => {
				state.objectWithDefaultAndNullableAndOptional = { name: 'hello world', age: 30 };
				expect(state.objectWithDefaultAndNullableAndOptional).toEqual({
					name: 'hello world',
					age: 30
				});
			});

			it('should set the value to null', () => {
				state.objectWithDefaultAndNullableAndOptional = null;
				expect(state.objectWithDefaultAndNullableAndOptional).toBe(null);
			});

			it('should set the value to undefined', () => {
				state.objectWithDefaultAndNullableAndOptional = undefined;
				expect(state.objectWithDefaultAndNullableAndOptional).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.objectWithDefaultAndNullableAndOptional = 'invalid';
				expect(state.objectWithDefaultAndNullableAndOptional).toEqual({ name: 'test', age: 25 });
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.objectWithDefaultAndNullableAndOptional = 123;
				expect(state.objectWithDefaultAndNullableAndOptional).toEqual({ name: 'test', age: 25 });
			});

			it('should not set invalid object properties', () => {
				// @ts-expect-error
				state.objectWithDefaultAndNullableAndOptional = { name: 123, age: 'invalid' };
				expect(state.objectWithDefaultAndNullableAndOptional).toEqual({ name: 'test', age: 25 });
			});
		});
	});
});
