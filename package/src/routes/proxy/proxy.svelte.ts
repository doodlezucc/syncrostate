import { untrack } from 'svelte';

export const createProxy = () => {
	return new Proxy(
		untrack(() => {
			return {};
		}) as any,
		{
			get() {
				return 'hello';
			}
		}
	);
};
