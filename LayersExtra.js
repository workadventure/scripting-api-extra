export function findLayerBoundaries(layer) {
    let left = Infinity;
    let top = Infinity;
    let bottom = 0;
    let right = 0;
    const data = layer.data;
    if (typeof data === "string") {
        throw new Error("Unsupported tile layer data stored as string instead of CSV");
    }
    for (let j = 0; j < layer.height; j++) {
        for (let i = 0; i < layer.width; i++) {
            if (data[i + j * layer.width] !== 0) {
                left = Math.min(left, i);
                right = Math.max(right, i);
                top = Math.min(top, j);
                bottom = Math.max(bottom, j);
            }
        }
    }
    return {
        top,
        left,
        right: right + 1,
        bottom: bottom + 1,
    };
}
export function findLayersBoundaries(layers) {
    let left = Infinity;
    let top = Infinity;
    let bottom = 0;
    let right = 0;
    for (const layer of layers) {
        const boundaries = findLayerBoundaries(layer);
        if (boundaries.left < left) {
            left = boundaries.left;
        }
        if (boundaries.top < top) {
            top = boundaries.top;
        }
        if (boundaries.right > right) {
            right = boundaries.right;
        }
        if (boundaries.bottom > bottom) {
            bottom = boundaries.bottom;
        }
    }
    return {
        top,
        left,
        right,
        bottom,
    };
}
//# sourceMappingURL=LayersExtra.js.map