import { beforeEach, describe, expect, it } from 'vitest';
import { syncroState, y } from '../../lib/index.js';

const defaultDate = new Date('2024-01-01');

const state = syncroState({
	schema: {
		date: y.date(),
		nullableDate: y.date().nullable(),
		optionnalDate: y.date().optional(),
		nullableOptionnalDate: y.date().nullable().optional(),
		dateWithDefault: y.date().default(defaultDate),
		dateWithDefaultAndOptional: y.date().default(defaultDate).optional(),
		dateWithDefaultAndNullable: y.date().default(defaultDate).nullable(),
		dateWithDefaultAndNullableAndOptional: y.date().default(defaultDate).nullable().optional()
	}
});

describe('DateProxy', () => {
	describe('Initial values', () => {
		it('should be a date', () => {
			expect(state.date).toBeInstanceOf(Date);
		});

		it('should have null as default value for nullable date', () => {
			expect(state.nullableDate).toBe(null);
		});

		it('should have undefined as default value for optional date', () => {
			expect(state.optionnalDate).toBe(undefined);
		});

		it('should have undefined as default value for nullable optional date', () => {
			expect(state.nullableOptionnalDate).toBe(undefined);
		});

		it('should have default value for date with default', () => {
			expect(state.dateWithDefault.toISOString()).toEqual(defaultDate.toISOString());
		});

		it('should have default value for optional date with default', () => {
			expect(state.dateWithDefaultAndOptional?.toISOString()).toEqual(defaultDate.toISOString());
		});

		it('should have default value for nullable date with default', () => {
			expect(state.dateWithDefaultAndNullable?.toISOString()).toEqual(defaultDate.toISOString());
		});

		it('should have default value for nullable optional date with default', () => {
			expect(state.dateWithDefaultAndNullableAndOptional?.toISOString()).toEqual(
				defaultDate.toISOString()
			);
		});
	});

	describe('Setters', () => {
		const testDate = new Date('2024-02-01');

		describe('Date', () => {
			beforeEach(() => {
				state.date = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.date = newDate;
				expect(state.date.toISOString()).toEqual(newDate.toISOString());
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.date = null;
				expect(state.date.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.date = undefined;
				expect(state.date.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.date = '2024-03-01';
				expect(state.date.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.date = 123;
				expect(state.date.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.date = {};
				expect(state.date.toISOString()).toEqual(testDate.toISOString());
			});
		});

		describe('Date operations', () => {
			beforeEach(() => {
				state.date = new Date('2024-03-15T12:00:00.000Z');
			});

			it('should handle setFullYear operation', () => {
				state.date.setFullYear(2025);
				expect(state.date.getFullYear()).toBe(2025);
			});

			it('should handle setMonth operation', () => {
				state.date.setMonth(5); // June (0-based)
				expect(state.date.getMonth()).toBe(5);
			});

			it('should handle setDate operation', () => {
				state.date.setDate(20);
				expect(state.date.getDate()).toBe(20);
			});

			it('should handle setHours operation', () => {
				state.date.setHours(15);
				expect(state.date.getHours()).toBe(15);
			});

			it('should handle setMinutes operation', () => {
				state.date.setMinutes(30);
				expect(state.date.getMinutes()).toBe(30);
			});

			it('should handle setSeconds operation', () => {
				state.date.setSeconds(45);
				expect(state.date.getSeconds()).toBe(45);
			});

			it('should handle setMilliseconds operation', () => {
				state.date.setMilliseconds(500);
				expect(state.date.getMilliseconds()).toBe(500);
			});

			it('should handle multiple operations in sequence', () => {
				state.date.setFullYear(2025);
				state.date.setMonth(6);
				state.date.setDate(25);
				state.date.setUTCHours(14);
				state.date.setUTCMinutes(30);
				state.date.setUTCSeconds(15);
				state.date.setUTCMilliseconds(250);

				expect(state.date.toISOString()).toBe('2025-07-25T14:30:15.250Z');
			});

			it('should handle setTime operation', () => {
				const timestamp = new Date('2025-12-25T00:00:00.000Z').getTime();
				state.date.setTime(timestamp);
				expect(state.date.toISOString()).toBe('2025-12-25T00:00:00.000Z');
			});

			it('should handle UTC operations', () => {
				state.date.setUTCFullYear(2025);
				state.date.setUTCMonth(11); // December (0-based)
				state.date.setUTCDate(25);

				expect(state.date.getUTCFullYear()).toBe(2025);
				expect(state.date.getUTCMonth()).toBe(11);
				expect(state.date.getUTCDate()).toBe(25);
			});
		});
		describe('Nullable Date', () => {
			beforeEach(() => {
				state.nullableDate = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.nullableDate = newDate;
				expect(state.nullableDate.toISOString()).toEqual(newDate.toISOString());
			});

			it('should set the value to null', () => {
				state.nullableDate = null;
				expect(state.nullableDate).toBe(null);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.nullableDate = undefined;
				expect(state.nullableDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.nullableDate = '2024-03-01';
				expect(state.nullableDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.nullableDate = 123;
				expect(state.nullableDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.nullableDate = {};
				expect(state.nullableDate?.toISOString()).toEqual(testDate.toISOString());
			});
		});

		describe('Optional Date', () => {
			beforeEach(() => {
				state.optionnalDate = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.optionnalDate = newDate;
				expect(state.optionnalDate?.toISOString()).toEqual(newDate.toISOString());
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.optionnalDate = null;
				expect(state.optionnalDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should set the value to undefined', () => {
				state.optionnalDate = undefined;
				expect(state.optionnalDate).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.optionnalDate = '2024-03-01';
				expect(state.optionnalDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.optionnalDate = 123;
				expect(state.optionnalDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.optionnalDate = {};
				expect(state.optionnalDate?.toISOString()).toEqual(testDate.toISOString());
			});
		});

		describe('Nullable Optional Date', () => {
			beforeEach(() => {
				state.nullableOptionnalDate = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.nullableOptionnalDate = newDate;
				expect(state.nullableOptionnalDate?.toISOString()).toEqual(newDate.toISOString());
			});

			it('should set the value to null', () => {
				state.nullableOptionnalDate = null;
				expect(state.nullableOptionnalDate).toBe(null);
			});

			it('should set the value to undefined', () => {
				state.nullableOptionnalDate = undefined;
				expect(state.nullableOptionnalDate).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.nullableOptionnalDate = '2024-03-01';
				expect(state.nullableOptionnalDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.nullableOptionnalDate = 123;
				expect(state.nullableOptionnalDate?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.nullableOptionnalDate = {};
				expect(state.nullableOptionnalDate?.toISOString()).toEqual(testDate.toISOString());
			});
		});

		describe('Date With Default', () => {
			beforeEach(() => {
				state.dateWithDefault = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.dateWithDefault = newDate;
				expect(state.dateWithDefault?.toISOString()).toEqual(newDate.toISOString());
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.dateWithDefault = null;
				expect(state.dateWithDefault?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.dateWithDefault = undefined;
				expect(state.dateWithDefault?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.dateWithDefault = '2024-03-01';
				expect(state.dateWithDefault.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.dateWithDefault = 123;
				expect(state.dateWithDefault.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.dateWithDefault = {};
				expect(state.dateWithDefault.toISOString()).toEqual(testDate.toISOString());
			});
		});

		describe('Date With Default And Optional', () => {
			beforeEach(() => {
				state.dateWithDefaultAndOptional = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.dateWithDefaultAndOptional = newDate;
				expect(state.dateWithDefaultAndOptional?.toISOString()).toEqual(newDate.toISOString());
			});

			it('should not set the value to null', () => {
				// @ts-expect-error
				state.dateWithDefaultAndOptional = null;
				expect(state.dateWithDefaultAndOptional?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should set the value to undefined', () => {
				state.dateWithDefaultAndOptional = undefined;
				expect(state.dateWithDefaultAndOptional).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.dateWithDefaultAndOptional = '2024-03-01';
				expect(state.dateWithDefaultAndOptional?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.dateWithDefaultAndOptional = 123;
				expect(state.dateWithDefaultAndOptional?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.dateWithDefaultAndOptional = {};
				expect(state.dateWithDefaultAndOptional?.toISOString()).toEqual(testDate.toISOString());
			});
		});

		describe('Date With Default And Nullable', () => {
			beforeEach(() => {
				state.dateWithDefaultAndNullable = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.dateWithDefaultAndNullable = newDate;
				expect(state.dateWithDefaultAndNullable?.toISOString()).toEqual(newDate.toISOString());
			});

			it('should set the value to null', () => {
				state.dateWithDefaultAndNullable = null;
				expect(state.dateWithDefaultAndNullable).toBe(null);
			});

			it('should not set the value to undefined', () => {
				// @ts-expect-error
				state.dateWithDefaultAndNullable = undefined;
				expect(state.dateWithDefaultAndNullable?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.dateWithDefaultAndNullable = '2024-03-01';
				expect(state.dateWithDefaultAndNullable?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.dateWithDefaultAndNullable = 123;
				expect(state.dateWithDefaultAndNullable?.toISOString()).toEqual(testDate.toISOString());
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.dateWithDefaultAndNullable = {};
				expect(state.dateWithDefaultAndNullable?.toISOString()).toEqual(testDate.toISOString());
			});
		});

		describe('Date With Default And Nullable And Optional', () => {
			beforeEach(() => {
				state.dateWithDefaultAndNullableAndOptional = testDate;
			});

			it('should set the value', () => {
				const newDate = new Date('2024-03-01');
				state.dateWithDefaultAndNullableAndOptional = newDate;
				expect(state.dateWithDefaultAndNullableAndOptional?.toISOString()).toEqual(
					newDate.toISOString()
				);
			});

			it('should set the value to null', () => {
				state.dateWithDefaultAndNullableAndOptional = null;
				expect(state.dateWithDefaultAndNullableAndOptional).toBe(null);
			});

			it('should set the value to undefined', () => {
				state.dateWithDefaultAndNullableAndOptional = undefined;
				expect(state.dateWithDefaultAndNullableAndOptional).toBe(undefined);
			});

			it('should not set the value to a string', () => {
				// @ts-expect-error
				state.dateWithDefaultAndNullableAndOptional = '2024-03-01';
				expect(state.dateWithDefaultAndNullableAndOptional?.toISOString()).toEqual(
					testDate.toISOString()
				);
			});

			it('should not set the value to a number', () => {
				// @ts-expect-error
				state.dateWithDefaultAndNullableAndOptional = 123;
				expect(state.dateWithDefaultAndNullableAndOptional?.toISOString()).toEqual(
					testDate.toISOString()
				);
			});

			it('should not set the value to an object', () => {
				// @ts-expect-error
				state.dateWithDefaultAndNullableAndOptional = {};
				expect(state.dateWithDefaultAndNullableAndOptional?.toISOString()).toEqual(
					testDate.toISOString()
				);
			});
		});
	});
});
