import type {DefaultImageMetadata} from "./types.ts";

/**
 * Imports graphics from source folder and provides their resolved URLs.
 */
export default class GraphicsImporter {
	// Fields.
	private readonly imageMetadatas: Promise<DefaultImageMetadata>[];

	/**
	 * Extract image metadata from dynamic import.
	 * @param imageDynamicImport Dynamic import of images.
	 */
	constructor(
		imageDynamicImport: Record<string, () => Promise<DefaultImageMetadata>>,
	) {
		this.imageMetadatas = Object.values(imageDynamicImport).map((imageImport) =>
			imageImport(),
		);
	}

	/**
	 * Resolve all image metadata.
	 */
	async getImageMetadatas(): Promise<DefaultImageMetadata[]> {
		return Promise.all(this.imageMetadatas);
	}

	/**
	 * Get the source URLs of all images.
	 */
	async getImageSrcs(): Promise<string[]> {
		return Promise.all(
			this.imageMetadatas.map((imageMetadataPromise) =>
				imageMetadataPromise.then(({ default: { src } }) => src),
			),
		);
	}
}
