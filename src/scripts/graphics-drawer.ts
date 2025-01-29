/**
 * Drawer for scrolling graphics.
 */
export default class GraphicsDrawer {
	// Fields.
	private readonly outputImage: HTMLImageElement;
	private readonly imagesSrcs: string[];

	/**
	 * Construct and gather components for drawing graphics.
	 *
	 * @param outputImageId ID of the output image element.
	 * @param imagesSrcs Array of image source URLs.
	 */
	constructor(outputImageId: string, imagesSrcs: string[]) {
		// Collect fields.
		this.outputImage =
			(document.getElementById(outputImageId) as HTMLImageElement) ??
			(() => {
				throw new Error("Failed to get output image element");
			});
		this.imagesSrcs = imagesSrcs;

		// Collect components.
		const containerBounds =
			this.outputImage.parentElement?.getBoundingClientRect() ??
			(() => {
				throw new Error("Failed to get canvas containing element and bounds");
			})();
		const numberOfImages = this.imagesSrcs.length;

		// Bind scroll event to draw images.
		window.addEventListener("scroll", () => {
			const scrollFraction =
				(document.documentElement.scrollTop - containerBounds.top) /
				(containerBounds.bottom - containerBounds.top);
			const imageIndex = Math.min(
				numberOfImages - 1,
				Math.ceil(scrollFraction * numberOfImages),
			);
			requestAnimationFrame(() => this.drawImage(imageIndex));
		});
	}

	/**
	 * Set the output image to the image with the given index.
	 *
	 * @param imageIndex Index of the image to draw.
	 * @private
	 */
	private drawImage(imageIndex: number): void {
		this.outputImage.src = this.imagesSrcs[imageIndex];
	}
}
