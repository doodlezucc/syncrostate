<script>
	// Import your Yjs provider
	import { createClient } from '@liveblocks/client';
	import { LiveblocksYjsProvider } from '@liveblocks/yjs';
	// Import syncroState and y (the schema builder)
	import { syncroState, y } from 'syncrostate';

	// Declare the syncroState
	const document = syncroState({
		// Connect to a Yjs provider and then call the synced callback when the document is synced
		sync: async ({ doc, synced }) => {
			// Create a liveblocks client
			const client = createClient({
				publicApiKey: ''
			});
			const { room } = client.enterRoom('room');
			const yProvider = new LiveblocksYjsProvider(room, doc);
			yProvider.on('synced', () => {
				synced();
			});
		},
		// Define the schema of the state
		schema: {
			nodes: y.array(
				y.object({
					type: y.enum('rect', 'circle'),
					x: y.number(),
					y: y.number(),
					fill: y.string()
				})
			)
		}
	});
</script>

<button
	onclick={() => {
		// Mutate the state
		document.nodes.push({
			type: 'rect',
			x: 100,
			y: 100,
			fill: 'red'
		});
	}}>Add node</button
>
