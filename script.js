async function fetchStations() {
    const url = "https://api.railway-stations.org/photoStationsByCountry/ch";
    const container = document.getElementById("stations");
    container.innerHTML = "Carregando...";

    try {
        const response = await fetch(url);
        const stations = await response.json();

        container.innerHTML = "";
        stations.forEach(station => {
            const div = document.createElement("div");
            div.className = "station";
            div.innerHTML = `<strong>${station.name}</strong> - ${station.countryCode}`;
            container.appendChild(div);
        });
    } catch (error) {
        container.innerHTML = "Erro ao carregar as estações.";
    }
}

async function fetchPhotos(stationName) {
    const url = "https://api.railway-stations.org/photoStationsByCountry/ch";
    const container = document.getElementById("photos");
    container.innerHTML = "Carregando...";

    try {
        const response = await fetch(url);
        const stations = await response.json();
        const station = stations.find(s => s.name.includes(stationName));

        container.innerHTML = "";
        if (station && station.photos) {
            station.photos.forEach(photo => {
                const div = document.createElement("div");
                div.className = "photo";
                div.innerHTML = `<img src="${photo.url}" alt="${stationName}">`;
                container.appendChild(div);
            });
        } else {
            container.innerHTML = "Nenhuma foto encontrada.";
        }
    } catch (error) {
        container.innerHTML = "Erro ao carregar as fotos.";
    }
}

async function fetchStats() {
    const url = "https://api.railway-stations.org/stats";
    const container = document.getElementById("stats");
    container.innerHTML = "Carregando...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        container.innerHTML = `
            <div class="stats">
                <p>Total de estações: ${data.totalStations}</p>
                <p>Estações com fotos: ${data.totalPhotoStations}</p>
                <p>Usuários ativos: ${data.totalUsers}</p>
            </div>
        `
    } catch (error) {
        container.innerHTML = "Erro ao carregar estatísticas.";
    }
}
