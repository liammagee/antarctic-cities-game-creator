# World Atlas

*world.js* generates a tile map XML file, and associatedimages from world maps for the game.

It takes a JSON file that lists countries and their coordinates, generates a canvas image of the world and, optionally, each country, which is then saved.

After processing, these files can be copied to the *./res* folder, where they can used in the game.

The steps below are adapted from a series of posts by creator of [D3](https://d3js.org/) and [ObservableHQ](https://observablehq.com/), [Mike Bostock](https://medium.com/@mbostock):

- [Command-Line Cartography, Part 1](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c)
- [Command-Line Cartography, Part 2](https://medium.com/@mbostock/command-line-cartography-part-2-c3a82c5c0f3)
- [Command-Line Cartography, Part 3](https://medium.com/@mbostock/command-line-cartography-part-3-1158e4c55a1e)
- [Command-Line Cartography, Part 4](https://medium.com/@mbostock/command-line-cartography-part-4-82d0d26df0cf)


## Generate tile map and images

To generate the tile map, first download one of three shape files, available from [Natural Earth](http://www.naturalearthdata.com/):

- [10m resolution](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/)
- [50m resolution](http://www.naturalearthdata.com/downloads/50m-cultural-vectors/)
- [110m resolution](http://www.naturalearthdata.com/downloads/110m-cultural-vectors/)

In each case, click the 'Download Countries' link. 

Next, unzip the file to the 'world-atlas/data' folder, and convert the shape files from  to GeoJSON format.

Change to the world-atlas directory:

    cd world-atlas/data

Then run the following commands, depending on the desired resolution. *ogr2ogr* depends on [GDAL](https://gdal.org/ogr2ogr.html) being available on your machine first.

High resolution:

    ogr2ogr -f GeoJSON -t_srs crs:84 10m.json ne_10m_admin_0_countries.shp

Medium resolution:

    ogr2ogr -f GeoJSON -t_srs crs:84 50m.json ne_50m_admin_0_countries.shp

Low resolution:

    ogr2ogr -f GeoJSON -t_srs crs:84 110m.json ne_110m_admin_0_countries.shp

For cities:

    ogr2ogr -f GeoJSON -t_srs crs:84 10m-pop-places.json ne_10m_populated_places.shp


Then, run one of the following to extract just the features:

    ndjson-cat 10m.json | ndjson-split 'd.features' > 10m-cat.ndjson
    ndjson-cat 50m.json | ndjson-split 'd.features' > 50m-cat.ndjson
    ndjson-cat 110m.json | ndjson-split 'd.features' > 110m-cat.ndjson

And for cities:

    ndjson-cat 10m-pop-places.json | ndjson-split 'd.features' > 10m-pop-places-cat.ndjson

For the final preparation step, convert the list of features to [TopoJSON](https://github.com/topojson/topojson) format:

    geo2topo -n tracts=10m-cat.ndjson > 10m-topo.json
    geo2topo -n tracts=50m-cat.ndjson > 50m-topo.json
    geo2topo -n tracts=110m-cat.ndjson > 110m-topo.json
    geo2topo -n tracts=10m-pop-places-cat.ndjson > 10m-pop-places-topo.json

Then to generate the tile map, background, foreground and individual country images:

    cd ..
    ./world.js -j [one of: data/10m-topo.json, data/50m-topo.json, data/110m-topo.json]

To generate *just* the xml and background and foreground images:

    ./world.js -x

To produce the images in greyscale:

    ./world.js -g

To specify a projection other than stereographic:

    ./world.js -p <>

Or with the full set of images:

    ./world.js -j [one of: data/10m-topo.json, data/50m-topo.json, data/110m-topo.json]

Copy the generated tile map and other files to the resources folder:

    cp cp background-stereographic-greyscale.png ../res/
    cp tmx-test-stereographic.tmx ../res/

