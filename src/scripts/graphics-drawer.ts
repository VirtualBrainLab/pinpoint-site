import type {ImageMetadata} from "astro";

/**
 * Drawer for scrolling graphics.
 */
export default class GraphicsDrawer {
    // Fields.
    private readonly canvas: HTMLCanvasElement;
    private readonly outputImage: HTMLImageElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly imageImports: (() => Promise<{ default: ImageMetadata }>)[];

    /**
     * Construct and gather components for drawing graphics.
     *
     * @param imageRecords Dynamically imported image records.
     * @param canvasId ID of the canvas element to draw on.
     */
    constructor(imageRecords: Record<string, () => Promise<{ default: ImageMetadata }>>, canvasId: string) {
        // Collect fields.
        this.imageImports = Object.values(imageRecords);
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement ?? (() => {
            throw new Error("Failed to get canvas element");
        });
        this.outputImage = new Image();
        this.context = this.canvas.getContext("2d") ?? (() => {
            throw new Error("Failed to get 2d context from canvas");
        })();

        // Collect components.
        const containerBounds = this.canvas.parentElement?.getBoundingClientRect() ?? (() => {
            throw new Error("Failed to get canvas containing element and bounds");
        })();
        const numberOfImages = this.imageImports.length;


        // Draw the first image.
        this.drawImage(0);

        // Bind scroll event to draw images.
        window.addEventListener("scroll", () => {
            const scrollFraction = (document.documentElement.scrollTop - containerBounds.top) / (containerBounds.bottom - containerBounds.top);
            const imageIndex = Math.min(numberOfImages - 1, Math.ceil(scrollFraction * numberOfImages));
            requestAnimationFrame(() => this.drawImage(imageIndex));
        })

        // Preload the other images.
        for (let i = 1; i < numberOfImages; i++) {
            this.loadImageThenExec(i, ({default: {src}}) => {
                const preloadImage = new Image();
                preloadImage.src = src;
            })
        }
    }

    /**
     * Load an image by index and then pass it to the callback.
     *
     * @param imageIndex Index of the image to load.
     * @param callback Callback to pass the loaded image to.
     * @private
     */
    private loadImageThenExec(imageIndex: number, callback: (value: { default: ImageMetadata }) => void): void {
        this.imageImports[imageIndex]().then(callback);
    }

    /**
     * Draw the image with the given index.
     *
     * @param imageIndex Index of the image to draw.
     * @private
     */
    private drawImage(imageIndex: number): void {
        this.loadImageThenExec(imageIndex, ({default: {src, width, height}}) => {
            // Set canvas size to match image.
            this.canvas.width = width;
            this.canvas.height = height;

            // Draw image.
            this.outputImage.src = src;
            this.outputImage.onload = () => {
                this.context.drawImage(this.outputImage, 0, 0);
            };
        })
    }
}