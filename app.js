let form=document.querySelector('#searchForm');
let ytmusic=document.querySelector('#ytresults');
var API_KEY="AIzaSyBZRMwtW2H0QeI2xhIJ6bVu_8ySfymXXoM";


form.addEventListener('submit',(e)=>{
    window.location.href="#results-section"
    e.preventDefault();
    let inputValue=document.querySelector('#searchInput').value;
    youtubeResults(inputValue);
    spotifyResults(inputValue);
    soundcloudResults(inputValue);
})


let youtubeResults=(inputValue)=>{
    while(ytmusic.lastChild)
    {
        ytmusic.removeChild(ytmusic.lastChild)
    }
    let link=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${inputValue}&maxResults=6&type=video&key=AIzaSyDrakPogPsEqtniLjK4MPkimLRUGsObAXQ`
    fetch(link)
    .then(res=>{
       res.json().then((data)=>{
           for (let item of data.items)
           {
               let ytvid=document.createElement('iframe');
               ytvid.style.width="420";
               ytvid.style.height="315";
               ytvid.style.borderRadius="10px"
               ytvid.src=`https://www.youtube.com/embed/${item.id.videoId}`
               ytvid.style.frameborder="0";
               ytvid.allowFullscreen=true;
               ytmusic.append(ytvid)
           }
       })
    })
    .catch((e)=>{
       console.log(e);
    })

}



let spotifymusic=document.querySelector('#spotifyresults');
let clientID="114fc440cf3d4923873deac30dc50747";
let clientSecret="f0124445e282402ca423b42ad91ec0bb";
let access_token='';

let access=async ()=>{
    let res=await fetch("https://accounts.spotify.com/api/token",{

        method:"POST",

        body:`grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,

        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
    access_token=await res.json();
    access_token=access_token.access_token;
}
let spotifyResults=async (value)=>{
    while(spotifymusic.lastChild)
    {
        spotifymusic.removeChild(spotifymusic.lastChild)
    }
    try{
    let res=await fetch(`https://api.spotify.com/v1/search?q=${value}&type=track&market=IN&limit=7&offset=1`, {
        headers:{
            "Authorization": `Bearer ${access_token}`
        }
    })
    let data=await res.json();
    for (let item of data.tracks.items)
    {
        let songId=((""+item.uri).substring(14));
        let song=document.createElement('iframe');
        song.src="https://open.spotify.com/embed/track/"+songId;
        song.style.width="315";
        song.style.height="395";
        song.style.frameBorder="0"
        song.allowFullscreen="";
        song.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
        song.loading="lazy"
        spotifymusic.append(song);
    }
}
catch(e){
    access();
    alert('Access token refreshed. Try Again')
}
}


let soundcloudresults=document.querySelector('#soundcloudresults');
let soundcloudResults=async (value)=>{

    while(soundcloudresults.lastChild){
        soundcloudresults.removeChild(soundcloudresults.lastChild)
    }
    let res=await fetch(`https://soundcloud-scraper.p.rapidapi.com/v1/search/tracks?term=${value}&limit=6`,{

    headers:{
        "X-RapidAPI-Key":"605f24bd7fmshdf81bc20da8d50ep171456jsn63f75bd3db92",
        "X-RapidAPI-Host":"soundcloud-scraper.p.rapidapi.com"
    }
})
    let data=await res.json();
    for (let item of data.tracks.items)
    {
        let song=document.createElement('iframe');
        song.src=`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${item.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
        song.style.width="315";
        song.style.height="352";
        song.style.scrolling="no"
        song.allow="autoplay";
        soundcloudresults.append(song);
    }
}