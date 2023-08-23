interface Locate {
    id: number | string;
    lat: number;
    lng: number;
    placeName: string;
    placeInfo: string;
    marker: string;
  }
  
  interface LocationState {
    locations: Locate[];
  }

  type LatLngLiteral = google.maps.LatLngLiteral

  interface IEditLocation {
    searchParams:Locate
  }

  type ILocations={
    location:Locate
  }

  type IMarkerInfo = {
    location: Locate;
    userLocation: GeolocationPosition | any;
    setTextDistance: React.Dispatch<React.SetStateAction<string>>;
    setTextDuration: React.Dispatch<React.SetStateAction<string>>;
  };

  type Fnc = (lat1: number, lng1: number, lat2: number, lng2: number) => any;