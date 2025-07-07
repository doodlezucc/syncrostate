<script lang="ts">
	import hljs from 'highlight.js';
	import javascript from 'highlight.js/lib/languages/javascript';
	import 'highlight.js/styles/dark.css';

	import snippet from './Usage.snippet.svelte?raw';

	hljs.registerLanguage('javascript', javascript);

	const highlight = (node: HTMLElement) => {
		const code = node.textContent;
		const highlighted = hljs.highlight(code!, { language: 'javascript' }).value;
		node.innerHTML = highlighted;
	};
</script>

<section id="features" class="border-t border-white/10 pb-24 pt-12">
	<div class="container mx-auto px-6">
		<h2 class="mb-12 mt-0 text-center text-2xl font-bold">Usage</h2>

		<div class="mockup-code bg-primary text-primary-content text-xs">
			<pre use:highlight>{snippet}</pre>
		</div>
	</div>
</section>
