import { SuperClusterAlgorithm } from "@googlemaps/markerclusterer";

export default class BoundingSuperClusterAlgorithm extends SuperClusterAlgorithm {
  cluster({ map }:{map:any}) {
    const bounds = map.getBounds().toJSON();
    const boundingBox = [bounds.west, bounds.south, bounds.east, bounds.north];

    return this.superCluster
      .getClusters(boundingBox, Math.round(map.getZoom()))
      .map(this.transformCluster.bind(this));
  }
}