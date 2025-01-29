import type { DefaultImageMetadata } from "./types.ts";

/**
 * Imports graphics from source folder and provides their resolved URLs.
 */
export default class GraphicsImporter {
	// Fields.
	private readonly imageMetadatas: Promise<DefaultImageMetadata>[];

	/**
	 * Compute image source URLs promises from the given directory.
	 * @param imageDynamicImport Dynamic import of images.
	 */
	constructor(
		imageDynamicImport: Record<string, () => Promise<DefaultImageMetadata>>,
	) {
		this.imageMetadatas = Object.values(imageDynamicImport).map((imageImport) =>
			imageImport(),
		);
	}

	async getImageSrcs(): Promise<string[]> {
		return Promise.all(
			this.imageMetadatas.map((imageMetadataPromise) =>
				imageMetadataPromise.then(({ default: { src } }) => src),
			),
		);
	}

	async getFirstImageMetadata(): Promise<DefaultImageMetadata> {
		return await this.imageMetadatas[0];
	}
}
