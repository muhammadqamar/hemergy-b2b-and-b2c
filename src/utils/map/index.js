import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={1.9}
    draggable={false}
    zoomControl= {false}
    scrollwheel={false}
    disableDoubleClickZoom={true}
    defaultCenter={{ lat: 39.00, lng: 34.00 }}
    mapTypeId="hybrid"
    backgroundColor= '#FFFFFF'
  >
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
))
export default MyMapComponent