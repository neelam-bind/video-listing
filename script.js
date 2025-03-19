const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
const search = document.getElementById('search_bar');
const search_button = document.getElementById('search_button');
const video_container = document.getElementById('video-container');


document.addEventListener("DOMContentLoaded", filterData);

// Fetch and filter videos
async function filterData() {
    const searchQuery = search.value.trim().toLowerCase() || "programming";
    const data = await searchVideos();
    search.value = "";

    const videos = data.data.data;
    const filteredVideos = videos.filter(video => {
        const title = video.items.snippet.title.toLowerCase();
        const tags = video.items.snippet.tags ? video.items.snippet.tags.join(" ").toLowerCase() : "";
        return title.includes(searchQuery) ||  tags.includes(searchQuery);
    });

    video_container.innerHTML = "";                             //purana udhane ke liye

    if (filteredVideos.length > 0) {
        filteredVideos.forEach(video => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const h3 = document.createElement('h3'); 
            const h5 = document.createElement('h5'); 

            const a = document.createElement('a');
            div.className = "video";
            img.src = video.items.snippet.thumbnails.default.url;
            img.alt = video.items.snippet.title;
            h5.textContent = video.items.snippet.channelTitle;
            a.href = `https://www.youtube.com/watch?v=${video.items.id}`;
            a.target = "_blank";
            
            h3.textContent = video.items.snippet.title;
            
            a.appendChild(img);                                                 //image me link dalne ke liye
            div.appendChild(a);                                               
            div.appendChild(h3);
            div.appendChild(h5);

            video_container.appendChild(div);
        });
    } else {
        console.log("No videos match your search criteria.");
    }
}
async function searchVideos() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
search_button.addEventListener('click', filterData);
