export type BaseSchema<T> = {
	kind:
		| 'array'
		| 'object'
		| 'string'
		| 'boolean'
		| 'number'
		| 'enum'
		| 'date'
		| 'richText'
		| 'set'
		| 'map';
	optional: boolean;
	nullable: boolean;
	default?: T;
};

export function isValidNullOrUndefined(this: { $schema: BaseSchema<any> }, value: any) {
	const isOptionnal = this.$schema.optional;
	const isNullable = this.$schema.nullable;
	const isOkNullable = value === null && isNullable;
	const isOkUndefined = value === undefined && isOptionnal;
	if (isOkNullable || isOkUndefined) {
		return true;
	}

	return true;
}

// TODO: This could probably be made abstract?
export class BaseValidator<
	S extends BaseSchema<any>,
	O extends boolean = false,
	N extends boolean = false
> {
	$schema: S;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isValid = (value: any) => {
		//
	};

	isValidNullOrUndefined = isValidNullOrUndefined.bind(this);

	// Convert data to string format for display/storage
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	stringify = (value: any) => {
		return '';
	};

	//  Convert a string to the correct type.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	coerce(value: any): S extends BaseSchema<infer T> ? T | null : any {
		// @ts-expect-error Default implementation
		return null;
	}

	constructor(schema: S) {
		this.$schema = schema;
	}

	optional() {
		this.$schema.optional = true;
		return this as BaseValidator<S, true, N>;
	}

	nullable() {
		this.$schema.nullable = true;
		return this as BaseValidator<S, O, true>;
	}

	default(value: S extends BaseSchema<infer T> ? T : never) {
		this.$schema.default = value;
		return this as BaseValidator<S, O, N>;
	}
}
