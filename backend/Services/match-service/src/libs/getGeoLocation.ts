
export const getLocation = () => {
    let latitude;
    let longitude;

    if (!navigator.geolocation) {
        console.log("navigator does not exist");
        return;

    }

    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    })

    return { latitude, longitude };
}