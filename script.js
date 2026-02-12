// --- Contact Form JS ---
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!email || !subject || !message) {
    alert("Please fill all required fields.");
    return;
  }

  alert("Thanks! Your message has been sent.");
  this.reset();
});

// --- Globe JS ---
const tooltip = document.getElementById('tooltip');

// Initialize the globe
const myGlobe = Globe()(document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .backgroundColor('#0d0d0d')
    .showGlobe(true)
    .polygonsTransitionDuration(300);

// Load states polygons
fetch('states.geojson')
    .then(res => res.json())
    .then(data => {
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        myGlobe.polygonsData(data.features)
            .polygonCapColor(d => colorScale(d.properties.name))
            .polygonSideColor(() => 'rgba(0,0,0,0.2)')
            .polygonStrokeColor(() => '#ffffff')
            .onPolygonHover(d => {
                if (d) {
                    tooltip.style.display = 'block';
                    tooltip.innerHTML = d.properties.name;
                } else {
                    tooltip.style.display = 'none';
                }
            });
    });

// Tooltip position
document.addEventListener('mousemove', e => {
    tooltip.style.top = (e.clientY + 15) + 'px';
    tooltip.style.left = (e.clientX + 15) + 'px';
});
