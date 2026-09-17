import sharp from "sharp";

export const vehicleImageSettings = Object.freeze({
  maximumInputBytes: 10 * 1024 * 1024,
  maximumInputPixels: 100_000_000,
  maximumWidth: 2400,
  maximumHeight: 1800,
  webpQuality: 82,
});

export async function optimizeVehicleImage(input) {
  const source = sharp(input, {
    failOn: "error",
    limitInputPixels: vehicleImageSettings.maximumInputPixels,
  });
  const metadata = await source.metadata();

  if (!metadata.width || !metadata.height || !["jpeg", "png", "webp", "avif"].includes(metadata.format)) {
    throw new Error("Het bestand is geen geldige JPEG-, PNG-, WebP- of AVIF-afbeelding.");
  }

  const data = await source
    .rotate()
    .resize({
      width: vehicleImageSettings.maximumWidth,
      height: vehicleImageSettings.maximumHeight,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: vehicleImageSettings.webpQuality, effort: 4, smartSubsample: true })
    .toBuffer();

  return {
    data,
    originalBytes: input.length,
    optimizedBytes: data.length,
    originalFormat: metadata.format,
  };
}
