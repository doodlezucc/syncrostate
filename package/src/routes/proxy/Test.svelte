<script lang="ts">
	let {
		name
	}: {
		name: string;
	} = $props();

	$inspect({ name });
	let div = $state<HTMLDivElement>();

	$effect(() => {
		// Trigger $effect whenever "name" changes
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		name;

		if (div) {
			div.classList.add('outline', 'outline-red-500', 'outline-dashed');
			setTimeout(() => {
				div!.classList.remove('outline', 'outline-red-500', 'outline-dashed');
			}, 300);
		}
	});
</script>

<div class="w-fit mx-auto my-10" bind:this={div}>{name}</div>
