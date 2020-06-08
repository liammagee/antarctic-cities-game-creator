#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
// Augment d3 and topojson libraries
let d3 = Object.assign({}, require('d3'), require('d3-geo'), require('d3-geo-projection'));
let topojson = Object.assign({}, require('topojson-client'), require('topojson-simplify'));

program
    .version(require("./package.json").version)
    .usage("[options]")
    .description("Generate XML and images files for the countries to be rendered in the game.")
    .option("-c, --city", "include cities and other populated places")
    .option("-x, --xml", "generate just the tmx file of countries")
    .option("-j, --json <file>", "specify the JSON file to use as input (must be in TopoJSON format)")
    .option("-g, --greyscale", "use greyscale rather than colour scheme")
    .option("-p, --projection <projectionType>", "specify the type of projection; one of stereographic|mercator|equirectangular|peirce|patterson|guyou")
    .option("-m, --population <populationLevel>", "in conjunction with --city, specifies the minimum place population to include")
    .parse(process.argv);


// Fits to the size of the game.
let width = 1334, height = 640;
let xmlOnly = (program.xml !== undefined);
let jsonFile = (program.json !== undefined) ? program.json : 'data/110m-topo.json';
let greyscale = (program.greyscale !== undefined);
let scheme = (greyscale ? 'greyscale' : 'colour');
let projectionName = (program.projection !== undefined) ? program.projection : 'equal';
let city = (program.city !== undefined);
let minPopulation = (program.population !== undefined) ? parseInt(program.population) : 0;

// Common variables
const COUNTRY_GREY = '#D8E1E3';
const ATA_GREY = '#E8F1F3';
const BORDER_GREY = '#59616B';
const scaleFactor = 1.0;
const decimalFactor = 10;
const precisionLevel = 0.1;
const coordCutoff = 4;
const mainlandCoordCutoff = 6;


//  Extract data from the topology file
// Taken from: https://github.com/topojson/world-atlas
// https://unpkg.com/world-atlas@1/
let data = JSON.parse(fs.readFileSync("./" + jsonFile, 'utf8'));
let dataCity = JSON.parse(fs.readFileSync("./data/10m-pop-places-topo.json", 'utf8'));
// Extract features
let tracts = topojson.feature(data, data.objects.tracts);
let tractsCity = topojson.feature(dataCity, dataCity.objects.tracts);
// Simplify the data
let data_sim = topojson.simplify(topojson.presimplify(data), precisionLevel);
let tracts_sim = topojson.feature(data_sim, data_sim.objects.tracts);


/**
 * Make a projection
 */
const makeProjection = function() {
  let projection = null;
  if (projectionName === 'equal') {
    projection = d3
        .geoEqualEarth()
        .precision(0.1).rotate([300,90,0])
        .fitExtent([[0, 0], [width, height]], tracts)
        // .translate([-width/10, -height / 10]);
  }
  else if (projectionName === 'mercator') {
    projection = d3.geoMercator()
        .translate([width  / 2, height / 2])
        // .scale(width / 2 / Math.PI)
        .rotate([0, 90]);
  }
  else if (projectionName === 'equirectangular') {
    projection = d3.geoEquirectangular()
        .translate([width  / 2, height / 2])
        .rotate([0, 90])
        // .scale(340);  
  }
  else if (projectionName === 'peirce') {
    projection = d3
        .geoPeirceQuincuncial()
        .precision(.01)
        // // .clipAngle(90 - 1e-3)
        .translate([width  / 2, height / 2])
        // .scale(150)
        // // .rotate([100,90,-190])
        .rotate([240,90,0]);  
  }
  else if (projectionName === 'patterson') {
    projection = d3.geoPatterson()
        .translate([width / 2, height / 2])
        .precision(0.1)
        .rotate([0,90,0]);
  }
  else if (projectionName === 'equal') {
    projection = d3.geoStereographic()
        .precision(0.1).rotate([0,90,0])
        .fitExtent([[0, 0], [width, height]], tracts)
        // .translate([-width/10, -height / 10]);
  }
  else if (projectionName === 'guyou') {
    projection = d3.geoGuyou()
        .translate([width / 2, height / 2])
        .precision(0.1)
        .rotate([0,90,0]);
  }

  return projection;
}; 

/**
 * Makes a graphics context with correct scale and tralsation for the desired projection.
 * @param {*} canvas 
 * @param {*} proj 
 */
const makeContext = function(canvas, proj) {
  
  let context = canvas.getContext('2d');
  let path = d3.geoPath(proj, context);

  let bounds = path.bounds(topojson.mesh(data)),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        scalex = width / dx, 
        scaley = height  / dy,
        translatex = -bounds[0][0], 
        translatey = -bounds[0][1],
        translate = [-bounds[0][0], -bounds[0][1]];
        translate = [width / 2 - scale * x, height / 2 - scale * y];

  context.scale(scalex, scaley);
  context.translate(translate[0], translate[1]);
  return { path: path, context: context };
}

/**
 * Writes out a complete projection to a tilemap
 * @param {} proj 
 * @param {*} projectionName 
 */
var writeProj = function(proj) {  

  // File names
  let background = 'background-' + projectionName +'-' + scheme + '.png';
  let foreground = 'foreground-' + projectionName +'-' + scheme + '.png';

  let canvas = createCanvas(width, height);
  let context = canvas.getContext('2d');
  context.clearRect();

  // if (greyscale) {
  //   context.fillStyle = '#fff';
  //   context.fillRect(0, 0, width, height);
  // }

  let path = d3.geoPath(proj, context);
  let bounds = path.bounds(topojson.mesh(data)),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = dx / 2,
        y = dy / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        scalex = scaleFactor * width / dx, 
        scaley = scaleFactor * height  / dy,
        translatex = -bounds[0][0], 
        translatey = -bounds[0][1],
      translate = [-bounds[0][0], -bounds[0][1]];
  
  context.scale(scalex, scaley);
  context.translate(width/2 * (1/ scalex)-width/2, height/2 * (1/ scaley)- height/2);

  let graticule = d3.geoGraticule();
  let sphere = new Object({type: "Sphere"});
  context.beginPath();
  if (greyscale) {
    context.fillStyle = "rgb(255,255,255)";
  }
  else {
    context.fillStyle = "rgba(69,168,226, 0.5)";
  }
  path(sphere);
  context.fill();
  context.closePath();
  
  for (let i = 0; i < tracts.features.length; i++) {
    let index = i;
    var props = tracts.features[index].properties;
    var col = (100 + parseInt(props.MAPCOLOR7) * 20);
    if (col > 255)
      col = 255;
    if (greyscale) {
      context.strokeStyle = BORDER_GREY;
      context.lineWidth = 1.0;
      context.fillStyle = COUNTRY_GREY;
      if (props.ISO_A3 == "ATA") {
        context.fillStyle = ATA_GREY;
      }
    }
    else {
      context.fillStyle = '#' + col.toString(16)  + 'AA00';
      if (props.ISO_A3 == "ATA") {
        context.fillStyle = "#FFFFFF";
      }
    }
    context.beginPath();
    path(tracts.features[index]);
    context.fill();
    if (greyscale)
      context.stroke();
    context.closePath();
  }

  if (city) {
    for (let i = 0; i < tractsCity.features.length; i++) {
      let index = i;
      var featPop = tractsCity.features[index];
      var propsPop = featPop.properties;
      context.fillStyle = BORDER_GREY;
      if (propsPop.POP_MAX > minPopulation) {
        // console.log(propsPop);
        // Divide pop by 100,000, add one, and divide log by log of 500 (i.e. 50 mill should equal 1.0)
        let popScale = Math.log(1 + propsPop.POP_MAX / 100000) / Math.log(500);
        // context.fillStyle = "#000";
        context.beginPath();
        // context.arc(featPop.geometry.coordinates[0], featPop.geometry.coordinates[1], popScale * 5, 0, Math.PI * 2);
        path.pointRadius(popScale * 5);
        path(featPop.geometry);
        context.fill();
        if (greyscale)
          context.stroke();
        context.closePath();
      }
    }
  }

  // Graticule
  context.beginPath();
  context.lineWidth = 0.5;
  context.strokeStyle = '#ccc';
  path(graticule());
  context.stroke();
  context.fillStyle = "#00f", 
  context.closePath();


  var out = fs.createWriteStream('./res/' + background);
  var stream = canvas.pngStream();
  stream.on('data', function(chunk){
    out.write(chunk);
  });

  stream.on('end', function(){
    console.log('saved png: ' + background);
  });

  // Add countries
  var countries = {}, countryFiles = [], 
    frags = [], fragPlaces = [], 
    fragsJson = [], fragPlacesJson = [], iso_a3s = [];
  

  var featureGenerator = function(i, gid) {

    var props = tracts.features[i].properties;
    country = {};
    country.iso_a3 = props['ISO_A3'];
    if (country.iso_a3 == "-99")
      country.iso_a3 = props['ADM0_A3_IS'];
    country.name = props.NAME;
    country.economy = props.ECONOMY;
    country.income_grp = props.INCOME_GRP;
    country.iso_a2 = props.ISO_A2;
    country.pop_est = props.POP_EST;
    country.subregion = props.SUBREGION;
    country.gdp_md_est = props.GDP_MD_EST;
    country.mapcolor7 = props.MAPCOLOR7;
    country.mapcolor8 = props.MAPCOLOR8;
    country.mapcolor9 = props.MAPCOLOR9;
    country.mapcolor13 = props.MAPCOLOR13;
    country.points = [];
    country.places = [];

    countryFile = country.iso_a3 + '_' + projectionName + '.png';
    if (iso_a3s.indexOf(country.iso_a3) !== -1)
      return gid;

    if (!xmlOnly) {
      canvas = createCanvas(width, height);
      var context = canvas.getContext('2d');
      path = d3.geoPath(proj, context);

      var bounds_world = path.bounds(topojson.mesh(data)),
            dx = bounds_world[1][0] - bounds_world[0][0],
            dy = bounds_world[1][1] - bounds_world[0][1],
            x = (bounds_world[0][0] + bounds_world[1][0]) / 2,
            y = (bounds_world[0][1] + bounds_world[1][1]) / 2,
            scale = .9 / Math.max(dx / width, dy / height),
            scalex = width / dx, 
            scaley = height  / dy,
            translate = [-bounds_world[0][0], -bounds_world[0][1]];

      var bounds_country = path.bounds(tracts.features[i]),
            dx_country = bounds_country[1][0] - bounds_country[0][0],
            dy_country = bounds_country[1][1] - bounds_country[0][1],
            scale = .9 / Math.max(dy_country / width, dy_country / height),
            scalex_country = 1.0,
            scaley_country = height / width,
            translate_country = [-bounds_country[0][0], -bounds_country[0][1]];

      let index = i;
      var props = tracts.features[index].properties;
      var col = (100 + parseInt(props.MAPCOLOR7) * 20);
      if (col > 255)
        col = 255;
      
      if (greyscale) {
        context.fillStyle = COUNTRY_GREY;
        if (props.ISO_A3 == "ATA") {
          context.fillStyle = ATA_GREY;
        }
      }
      else {
        context.fillStyle = '#' + col.toString(16)  + 'AA00';
        if (props.ISO_A3 == "ATA") {
          context.fillStyle = "#FFFFFF";
        }
      }

      var canvasCountry = createCanvas(parseInt(dx_country * scalex), parseInt(dy_country * scaley));
      // var canvasCountry = createCanvas(width / 2, height / 2);
      var contextCountry = canvasCountry.getContext('2d');
      var pathCountry = d3.geoPath(proj, contextCountry);
      // contextCountry.clearRect();
      // contextCountry.fillStyle = '#000';
      // contextCountry.fillRect(0, 0, width, height);
            
      contextCountry.scale(scalex, scaley);
      contextCountry.translate(translate_country[0], translate_country[1]);

      //  Draw smaller images
      // canvas = createCanvas(dx, dy);
      // context = canvas.getContext('2d');
      contextCountry.strokeStyle = '#f00';
      contextCountry.lineWidth = 3.0;
      
      // contextCountry.fillStyle = '#F00';
      if (greyscale)
        contextCountry.fillStyle = BORDER_GREY;
      else
        contextCountry.fillStyle = '#' + col.toString(16)  + 'AA00';
      if (props.ISO_A3 == "ATA") {
        contextCountry.fillStyle = "#FFFFFF";
      }

      contextCountry.beginPath();
      pathCountry(tracts.features[i]);
      contextCountry.fill();
      contextCountry.closePath();

      if (city) {
        for (let j = 0; j < tractsCity.features.length; j++) {
          let index = j;
          var featPop = tractsCity.features[index];
          var propsPop = featPop.properties;
          if (propsPop.ISO_A2 == props.ISO_A2 && propsPop.POP_MAX > minPopulation) {
            contextCountry.fillStyle = "#FFFFFF";
    
            // Divide pop by 100,000, add one, and divide log by log of 500 (i.e. 50 mill should equal 1.0)
            let countryPopScale = Math.log(1 + propsPop.POP_MAX / 100000) / Math.log(500);
            contextCountry.beginPath();
            pathCountry.pointRadius(countryPopScale * 5);
            pathCountry(featPop.geometry);
            contextCountry.fill();
            if (greyscale)
              context.stroke();
            contextCountry.closePath();
          }
        }
      }

      var out2 = fs.createWriteStream('./res/countries/' + countryFile);
      var stream2 = canvasCountry.pngStream();
      stream2.on('data', function(chunk){
        out2.write(chunk);
      });

      stream2.on('end', function(){
        console.log('saved png: ' + countryFile);
      });
    }

    path = d3.geoPath(proj);
    bounds = path.bounds(topojson.mesh(data)),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = .9 / Math.max(dx / width, dy / height),
          scalex = width / dx, 
          scaley = height  / dy,
          translatex = -bounds[0][0], 
          translatey = -bounds[0][1],
          translate = [-bounds[0][0], -bounds[0][1]];
    
    svg_text = path(tracts_sim.features[i]);
    if (svg_text == null)
      return gid;

    // MULTIPOLYGON VERSION
    zones = svg_text.split(/[Z]/);
    tmx_frag = "";
    tmxFragPlace = "";
    jsonFrag = "";
    jsonFragPlace = "";
    var internalCounter = 0;
  
    // Parses the SVG comma-delimited pairs to builds an array of arrays of coordinate pairs
    // console.log(translatex, scalex, translatey, scaley);
    var coords = zones.map(z => {
      s = z.split(/[ML]/). 
        map((p) => { p = p.split(','); return [Math.round((parseFloat(p[0]) + translatex) * scalex * decimalFactor) / decimalFactor, Math.round((parseFloat(p[1]) + translatey) * scaley * decimalFactor) / decimalFactor].join(',') }).
        filter((p) => { return p != "NaN,NaN"; });

      // Remove non-unique points 
      s = [...new Set(s)];
      // s = s.sort((a, b) => { return a.length - b.length; });
      return s;
    }).filter(s => { return s.length > 0; }).sort((a, b) => { return b.length - a.length; });
    // Filter is useful, but creates problems determining min/max coords
    //.filter(s => { return s.length > 3; });

    // Calculate the approximate distance of the country's largest land mass from the equator
    var orig_coords = tracts_sim.features[i].geometry.coordinates.sort((a, b) => { return b[0].length - a[0].length;})
    var mainland_coords = orig_coords[0];
    // When there are multiple polygons, i.e. land masses
    if (coords.length > 1 && orig_coords[0][0].length > 2)
      mainland_coords = orig_coords[0][0];
    var sumOfLongitudes = mainland_coords.map(c => { return c[1]; }).reduce((accumulator, c) => { return accumulator + c; }, 0 );
    var meanLongitudes = sumOfLongitudes / mainland_coords.length;
    var minX = 0, maxY = 0;
    coords.forEach(s => {
      s.forEach(s2 => {
        var s3 = s2.split(',');
        var testX = parseFloat(s3[0]);
        var testY = parseFloat(s3[1]);
        if (testX < minX || minX == 0) {
          minX = testX;
        }
        if (testY > maxY || maxY == 0) {
          maxY = testY;
        }
      })
    });
    // coords.forEach(s => {
      // s = s.join(' ');
    for (let j = 0; j < coords.length; j++) {
      coord = coords[j];
      if (coord.length < coordCutoff) {
        continue;
      }
  // coords.forEach(s => {
      s = coord.join(' ');
      let coordsSplit = coord.map((c) => {
        let cx = parseFloat(c.split(',')[0]);
        let cy = parseFloat(c.split(',')[1]);
        return {x: cx, y: cy};
      });

      /*
      s_simp = path.bounds(tracts_sim.features[i]).map(function(p){ return [parseInt((parseFloat(p[0]) + translatex) * scalex),parseInt((parseFloat(p[1]) + translatey) * scaley)];});
      s_simp = [s_simp[0], [s_simp[0][0],s_simp[1][1]], s_simp[1],[s_simp[1][0],s_simp[0][1]]]
      s_simp = s_simp.join(' ');
      */

      tmx_frag += '\t<object id="' + (228 + i + internalCounter++) + '" name="' + country.iso_a3 + '" x="0" y="0" visible="0">\n'
      tmx_frag += "\t\t<polygon points=\"" + s + "\"/>\n";
      jsonFrag += "{\"country\":\"" + country.iso_a3 +"\",";
      tmx_frag += "\t\t<properties>\n";
      if (internalCounter == 1) {
        tmx_frag += "\t\t\t<property name=\"GID\" value=\"" + (gid + 3) + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"NAME\" value=\"" + country.NAME + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"ECONOMY\" value=\"" + country.ECONOMY + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"INCOME_GRP\" value=\"" + country.INCOME_GRP + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"ISO_A2\" value=\"" + country.ISO_A2 + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"POP_EST\" value=\"" + country.POP_EST + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"SUBREGION\" value=\"" + country.SUBREGION + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"GDP_MD_EST\" value=\"" + country.GDP_MD_EST + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"ISO_A3\" value=\"" + country.iso_a3 + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"EQUATOR_DIST\" value=\"" + meanLongitudes + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"OFFSET_X\" value=\"" + minX + "\"/>\n";
        tmx_frag += "\t\t\t<property name=\"OFFSET_Y\" value=\"" + maxY + "\"/>\n";
        jsonFrag += "\"NAME\": \"" + country.NAME +"\",";
        jsonFrag += "\"ECONOMY\": \"" + country.ECONOMY +"\",";
        jsonFrag += "\"INCOME_GRP\": \"" + country.INCOME_GRP +"\",";
        jsonFrag += "\"ISO_A2\": \"" + country.ISO_A2 +"\",";
        jsonFrag += "\"POP_EST\": \"" + country.POP_EST +"\",";
        jsonFrag += "\"SUBREGION\": \"" + country.SUBREGION +"\",";
        jsonFrag += "\"GDP_MD_EST\": \"" + country.GDP_MD_EST +"\",";
        jsonFrag += "\"ISO_A3\": \"" + country.iso_a3 +"\",";
        jsonFrag += "\"EQUATOR_DIST\": \"" + meanLongitudes +"\",";
        jsonFrag += "\"OFFSET_X\": \"" + minX +"\",";
        jsonFrag += "\"OFFSET_Y\": \"" + maxY +"\",";
        country.equatorDist = meanLongitudes;
        country.offsetX = minX;
        country.offsetY = maxY;
      }
      tmx_frag += "\t\t</properties>\n";
      tmx_frag += '\t</object>\n';
      jsonFrag += "\"points\":\"" + s +"\"";
      jsonFrag += "}";
      country.points.push(coordsSplit);
    };

    if (mainland_coords.length > mainlandCoordCutoff) {
      countries[country.iso_a3] = country;
      iso_a3s.push(country.iso_a3);
      countryFiles.push(countryFile);
      frags.push(tmx_frag);
      fragPlaces.push(tmxFragPlace);
      fragsJson.push(jsonFrag);
      fragPlacesJson.push(jsonFragPlace);

      return gid + 1;
    }
    else  {
      return gid;
    }
  };

  var counter = 0;
  tracts.features.forEach((feature, index) => { 
      counter = featureGenerator(index, counter);
  } );

  obj_id = 1;
  let jsonOutput = "";
  xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<map version="1.0" tiledversion="1.1.2" orientation="orthogonal" renderorder="right-down" width="1" height="1" tilewidth="' + width + '" tileheight="' + height + '" infinite="0" nextobjectid="16">\n'
  xml += '   <tileset firstgid="' + (obj_id++) + '" name="background" tilewidth="' + width + '" tileheight="' + height + '" tilecount="1" columns="1">\n'
  xml += '    <image source="' + background + '" trans="ff00ff" width="' + width + '" height="' + height + '"/>\n'
  xml += '   </tileset>\n'
  xml += '   <tileset firstgid="' + (obj_id++) + '" name="foreground" tilewidth="' + width + '" tileheight="' + height + '" tilecount="1" columns="1">\n'
  xml += '    <image source="' + foreground + '" trans="ff00ff" width="' + width + '" height="' + height + '"/>\n'
  xml += '   </tileset>\n'

  for (var i = 0; i < countryFiles.length; i++) {
    let countryFile = countryFiles[i]
    let iso_a3 = iso_a3s[i];
    xml += '   <tileset firstgid="' + (obj_id++) + '" name="' + iso_a3 + '" tilewidth="' + width + '" tileheight="' + height + '" tilecount="1" columns="1">\n'
    xml += '    <image source="countries/' + countryFile + '" trans="ff00ff" width="' + width + '" height="' + height + '"/>\n'
    xml += '   </tileset>\n'
  }

  xml += '   <layer name="Tile Layer 1" width="1" height="1">\n'
  xml += '    <data encoding="csv">\n'
  xml += '      1\n'
  xml += '    </data>\n'
  xml += '   </layer>\n'
  xml += '   <layer name="Tile Layer 2" width="1" height="1">\n'
  xml += '    <data encoding="csv">\n'
  xml += '      2\n'
  xml += '    </data>\n'
  xml += '   </layer>\n'

  for (var i = 0; i < countryFiles.length; i++) {
    xml += '   <layer name="Tile Layer ' + (i + 3) + '" width="1" height="1">\n'
    xml += '    <data encoding="csv">\n'
    xml += '      ' + (i + 3) + '\n'
    xml += '    </data>\n'
    xml += '   </layer>\n'
  }
  
  xml += '  <objectgroup name="Object Layer 1">\n'
  jsonOutput += "{\"countries\":[{},"
  for (var i = 0; i < countryFiles.length; i++) {
    tmx_frag = frags[i];
    jsonFrag = fragsJson[i];
    // xml += '    <object id="' + (obj_id++) + '" name="' + country.iso_a3 + '" x="0" y="0" visible="0">'
    xml += tmx_frag + '\n';
    jsonOutput += jsonFrag + '\n';
    if (i < countryFiles.length - 1)
      jsonOutput += ',';
    jsonOutput += '\n';
    // xml += '    </object>\n'
  }
  xml += '  </objectgroup>\n'
  jsonOutput += "]"
  
  if (city) {
    xml += '  <objectgroup name="Object Layer 2">\n'
    jsonOutput += "\n,\"cities\":["
    for (let i = 0; i < tractsCity.features.length; i++) {
      let index = i;
      var featPop = tractsCity.features[index];
      var propsPop = featPop.properties;
      if (propsPop.ADM0_A3 == 'AUS') {
        console.log(propsPop.NAME +": "+ propsPop.POP_MAX)
      }
      if (propsPop.POP_MAX > minPopulation) {
        var coordsPlace = path(featPop).split(',').slice(0, 2).map(item => { return item.replace(/[A-Za-z]/, '') });
        let popScale = Math.log(1 + propsPop.POP_MAX / 100000) / Math.log(500);
        let px = Math.round((parseFloat(coordsPlace[0]) + translatex) * scalex * decimalFactor) / decimalFactor;
        let py = Math.round((parseFloat(coordsPlace[1]) + translatey) * scaley * decimalFactor) / decimalFactor;
        
        xml += '\t<object id="' + (obj_id++) + '" name="' + propsPop.NAME + '" x="0" y="0" visible="0">\n'
        xml += "\t\t<polygon points=\"" + px + "," + py + "\"/>\n";
        xml += "\t\t<properties>\n";
        xml += "\t\t\t<property name=\"NAME\" value=\"" + propsPop.NAME + "\"/>\n";
        xml += "\t\t\t<property name=\"ISO_A2\" value=\"" + propsPop.ISO_A2 + "\"/>\n";
        xml += "\t\t\t<property name=\"ADM0_A3\" value=\"" + propsPop.ADM0_A3 + "\"/>\n";
        xml += "\t\t\t<property name=\"LATITUDE\" value=\"" + propsPop.LATITUDE + "\"/>\n";
        xml += "\t\t\t<property name=\"LONGITUDE\" value=\"" + propsPop.LONGITUDE + "\"/>\n";
        xml += "\t\t\t<property name=\"POP_MAX\" value=\"" + propsPop.POP_MAX + "\"/>\n";
        xml += "\t\t\t<property name=\"POP_MIN\" value=\"" + propsPop.POP_MIN + "\"/>\n";
        xml += "\t\t\t<property name=\"POP_SCALE\" value=\"" + popScale + "\"/>\n";
        xml += "\t\t</properties>\n";
        xml += '\t</object>\n';
        jsonOutput += "{";
        jsonOutput += "\"points\":[" + px + "," + py +"],";
        jsonOutput += "\"NAME\":\"" + propsPop.NAME +"\",";
        jsonOutput += "\"ISO_A2\":\"" + propsPop.ISO_A2 +"\",";
        jsonOutput += "\"ADM0_A3\":\"" + propsPop.ADM0_A3 +"\",";
        jsonOutput += "\"LATITUDE\":\"" + propsPop.LATITUDE +"\",";
        jsonOutput += "\"LONGITUDE\":\"" + propsPop.LONGITUDE +"\",";
        jsonOutput += "\"POP_MAX\":\"" + propsPop.POP_MAX +"\",";
        jsonOutput += "\"POP_MIN\":\"" + propsPop.POP_MIN +"\",";
        jsonOutput += "\"POP_SCALE\":\"" + propsPop.POP_SCALE +"\"";
        jsonOutput += "}";
        if (i < tractsCity.features.length - 1)
          jsonOutput += ",";
        jsonOutput += "\n";
        let iso_a3 = propsPop.ADM0_A3;
        let place = {};
        place["points"] = [px, py];
        place["NAME"] = propsPop.NAME;
        place["ISO_A2"] = propsPop.ISO_A2;
        place["ADM0_A3"] = propsPop.ADM0_A3;
        place["LATITUDE"] = propsPop.LATITUDE;
        place["LONGITUDE"] = propsPop.LONGITUDE;
        place["POP_MAX"] = propsPop.POP_MAX;
        place["POP_MIN"] = propsPop.POP_MIN;
        place["POP_SCALE"] = propsPop.POP_SCALE;
        // console.log(iso_a3);
        if (countries[iso_a3] !== undefined)
          countries[iso_a3].places.push(place);
        else
          console.log("No country for " + iso_a3 +":" +propsPop.NAME);
      }
    }
    xml += '  </objectgroup>\n'
    jsonOutput += "]"
  }

  xml += '</map>\n'
  jsonOutput += "}"

  let tmxFile = "./res/tmx-" + projectionName + "-" + scheme + ".tmx"
  fs.writeFile(tmxFile, xml, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file '" + tmxFile + "' was saved!");
  });

  jsonOutput = JSON.stringify(countries);
  // console.log(jsonOutput);
  let jsonOutputFile = "./res/json-" + projectionName + "-" + scheme + ".json"
  fs.writeFile(jsonOutputFile, jsonOutput, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file '" + jsonOutputFile + "' was saved!");
  });
  
  let resourceJavaScript = `
  var res = {
    world_tilemap_tmx : "res/tmx-${projectionName}-${scheme}.tmx",
    world_tilemap_background : "res/background-${projectionName}-${scheme}.png",
    world_tilemap_foreground : "res/foreground-${projectionName}-${scheme}.png",
    dot_png : "res/images/dot.png",
    fire_texture: "res/images/fire.png",
    policy_dot_off_png : "res/images/BUTTONS/DOT_OFF.png",
    policy_dot_on_png : "res/images/niab/DOT_ON.png",
    quit_off_png : "res/images/niab/BUTTON_QUIT.png",
    quit_on_png : "res/images/niab/BUTTON_QUIT.png",
    pause_off_png : "res/images/niab/BUTTON_PAUSE_NORMAL.png",
    pause_on_png : "res/images/niab/BUTTON_PAUSE_ON.png",
    play_off_png : "res/images/niab/BUTTON_PLAY_NORMAL.png",
    play_on_png : "res/images/niab/BUTTON_PLAY_ON.png",
    playfast_off_png : "res/images/niab/BUTTON_PLAYFAST_NORMAL.png",
    playfast_on_png : "res/images/niab/BUTTON_PLAYFAST_ON.png",
    antarctica_small_png : "res/images/NEW_ICONS/ANTARCTICA_SMALL.png",
    antarctica_large_png : "res/images/NEW_ICONS/ANTARCTICA_LARGE.png",
    resource_icon: "res/images/NEW_ICONS/ICON_RESOURCE.png",
    resource_economy_1: "res/images/niab/ICON_RESOURCE_ECONOMY_1.png",
    resource_economy_2: "res/images/niab/ICON_RESOURCE_ECONOMY_2.png",
    resource_economy_3: "res/images/niab/ICON_RESOURCE_ECONOMY_3.png",
    resource_economy_4: "res/images/niab/ICON_RESOURCE_ECONOMY_4.png",
    resource_politics_1: "res/images/niab/ICON_RESOURCE_POLITICS_1.png",
    resource_politics_2: "res/images/niab/ICON_RESOURCE_POLITICS_2.png",
    resource_politics_3: "res/images/niab/ICON_RESOURCE_POLITICS_3.png",
    resource_politics_4: "res/images/niab/ICON_RESOURCE_POLITICS_4.png",
    resource_culture_1: "res/images/niab/ICON_RESOURCE_CULTURE_1.png",
    resource_culture_2: "res/images/niab/ICON_RESOURCE_CULTURE_2.png",
    resource_culture_3: "res/images/niab/ICON_RESOURCE_CULTURE_3.png",
    resource_culture_4: "res/images/niab/ICON_RESOURCE_CULTURE_4.png",
    resource_ecology_1: "res/images/niab/ICON_RESOURCE_ECOLOGY_1.png",
    resource_ecology_2: "res/images/niab/ICON_RESOURCE_ECOLOGY_2.png",
    resource_ecology_3: "res/images/niab/ICON_RESOURCE_ECOLOGY_3.png",
    resource_ecology_4: "res/images/niab/ICON_RESOURCE_ECOLOGY_4.png",
    button_white: "res/images/BUTTONS/BUTTON_WHITE.png",
    button_grey: "res/images/BUTTONS/BUTTON_GREY.png",
    progress_bar: "res/images/progress-bar.png",
    ctrls_background: "res/images/ctrls-background.png",
    status_button: "res/images/status-button.png",
    shader_outline_vertex: "res/shaders/mask_country.vsh",
    shader_outline_fragment: "res/shaders/mask_country.fsh",
    ArvoFont : {
      type:"font",
      name:"ArvoFont",
      srcs:["res/fonts/Arvo-Regular.ttf", "res/fonts/Arvo-Regular.ttf"]
    },
    JosefinSansFont : {
      type:"font",
      name:"JosefinSansFont",
      srcs:["res/fonts/JosefinSans-Regular.ttf", "res/fonts/JosefinSans-Regular.ttf"]
    },
  `;

  for (var i = 0; i < countries.length; i++) {
    country = countries[i];
    countryFile = countryFiles[i];
    if (country.iso_a3 == "-99")
      continue;
    resourceJavaScript = resourceJavaScript + country.iso_a3 + '_png:\"res/countries/'+countryFile+'\",\n'
  }
  resourceJavaScript += `
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
`; 
  let resourceFile = "./res/resource.js"
  fs.writeFile(resourceFile, resourceJavaScript, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file '" + resourceFile + "' was saved!");
  });

  // GRATICULE
  canvas = createCanvas(width, height);
  context = canvas.getContext('2d');
  
  path = d3.geoPath(proj,
        context);

  bounds = path.bounds(topojson.mesh(data)),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        scalex = width / dx, 
        scaley = height  / dy,
        translate = [-bounds[0][0], -bounds[0][1]];
        // translate = [width / 2 - scale * x, height / 2 - scale * y];

  context.scale(scalex, scaley);
  context.translate(translate[0], translate[1]);

  // Graticule
  context.beginPath();
  context.lineWidth = 0.5;
  context.strokeStyle = '#ccc';
  path(graticule());
  context.stroke();

  var out3 = fs.createWriteStream('./res/' + foreground);
  var stream3 = canvas.pngStream();
  stream3.on('data', function(chunk){
    out3.write(chunk);
  });

  stream3.on('end', function(){
    console.log('saved png: ' + foreground);
  });

}

writeProj(makeProjection());
