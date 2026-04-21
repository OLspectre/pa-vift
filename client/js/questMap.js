var map = L.map('map').fitWorld();

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '© Stadia Maps © OpenStreetMap',
    maxZoom: 19
}).addTo(map)

map.locate({ setView: true, maxZoom: 16 });

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);





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