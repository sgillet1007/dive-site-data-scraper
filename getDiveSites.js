const fs = require('fs');
const fetch = require('node-fetch');

let url = "http://api.divesites.com/?mode=sites&lat=20.4230&lng=-86.9223&dist=50000"

let settings = { method: "Get"};

fetch(url, settings)
    .then(res => res.json())
    .then(json => {
        const processed = json.sites.map(site=>{
            return {
                siteName: site.name,
                lat: site.lat,
                lng: site.lng
            }
        })
        const diveSitesJson = JSON.stringify(processed, null, 2);

        fs.writeFile('diveSites.json', diveSitesJson, err => {
            if(err) throw err;
            console.log(`JSON data for ${processed.length} sites saved!`)
        })
    });