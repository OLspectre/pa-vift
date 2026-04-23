import { STADIA_KEY } from "./config.js";

var map = L.map('map')

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=$STADIA_KEY', {
    attribution: '© Stadia Maps © OpenStreetMap',
    maxZoom: 25
}).addTo(map)


let circleMarker, circle, zoomed;

map.locate({ setView: true, maxZoom: 25 });

navigator.geolocation.watchPosition(success, error);

function success(pos) {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;


    if (circleMarker) {
        map.removeLayer(circleMarker);
        map.removeLayer(circle);
    }

    circleMarker = L.circleMarker([lat, lng]).addTo(map)
    circle = L.circle([lat, lng], {
        radius: accuracy,
        color: "#e46e27",
        fillColor: "#e46e27",
        fillOpacity: 0.2,
        weight: 2
    }).addTo(map);

    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }

    map.setView([lat, lng]);
}

function error(err) {

    if (err.code === 1) {
        alert("Snälla tillåt platstjänster under hela upplevelsen");
    } else {
        alert("Tekniskt fel: Kan inte hämta platsinformation");
    }
}





const sheet = document.getElementById('sheet')
const handle = document.getElementById('handle-area')

const MIN_H = 80
const MAX_H = 400

let dragging = false, startY = 0, startH = 0

handle.addEventListener('mousedown', (e) => {
    dragging = true
    startY = e.clientY
    startH = parseInt(sheet.style.height) || MIN_H
    e.preventDefault()
})

handle.addEventListener('touchstart', (e) => {
    dragging = true
    startY = e.touches[0].clientY
    startH = parseInt(sheet.style.height) || MIN_H
    e.preventDefault()
}, { passive: false })

document.addEventListener('mousemove', (e) => {
    if (!dragging) return
    sheet.style.height = Math.min(MAX_H, Math.max(MIN_H, startH + (startY - e.clientY))) + 'px'
})

document.addEventListener('touchmove', (e) => {
    if (!dragging) return
    sheet.style.height = Math.min(MAX_H, Math.max(MIN_H, startH + (startY - e.touches[0].clientY))) + 'px'
}, { passive: false })

document.addEventListener('mouseup', () => { dragging = false })
document.addEventListener('touchend', () => { dragging = false })