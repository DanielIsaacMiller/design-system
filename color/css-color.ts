import * as THREE from "three";

/**
 * A CSS colour — in any notation the browser understands, including the
 * oklch() the tokens use — resolved to a THREE.Color.
 *
 * three's own parser only handles rgb/hsl/hex/named, and getComputedStyle
 * hands back `lab(...)` for an oklch token, which three reads as an unknown
 * colour and leaves at white. Painting a pixel and reading the bytes back
 * sidesteps the notation entirely: whatever the browser can render, this
 * gets the right value, so a piece can drive its background from its own
 * token and change it whenever it likes.
 *
 * Deliberately not re-exported from the package root: it pulls in three,
 * and the pieces that only want the logo or the cursor shouldn't have to
 * carry a renderer. Import it as `@design-system/color`.
 */

let probe: CanvasRenderingContext2D | null | undefined;

function probeContext(): CanvasRenderingContext2D | null {
  if (probe === undefined) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    probe = canvas.getContext("2d", { willReadFrequently: true });
  }
  return probe;
}

export function resolveCssColor(value: string, fallback: string): THREE.Color {
  const color = new THREE.Color();
  const context = value ? probeContext() : null;
  const usable =
    context !== null &&
    typeof CSS !== "undefined" &&
    CSS.supports("color", value);

  if (context && usable) {
    // A sentinel first: an unparseable assignment leaves the previous value
    // in place, so anything that slips past CSS.supports lands on black
    // rather than whatever was there before.
    context.fillStyle = "#000";
    context.fillStyle = value;
    context.clearRect(0, 0, 1, 1);
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    // The probe canvas is sRGB, so the bytes come back as authored.
    return color.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
  }

  return color.setStyle(fallback);
}
