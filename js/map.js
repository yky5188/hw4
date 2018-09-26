/**
 * Data structure for the data associated with an individual country.
 * the CountryData class will be used to keep the data for drawing your map.
 * You will use the region to assign a class to color the map!
 */
class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, id, properties, geometry, region) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;
    }
}

/** Class representing the map view. */
class Map {

    /**
     * Creates a Map Object
     *
     * @param data the full dataset
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     */
    constructor(data, updateCountry) {
        // ******* TODO: PART I *******
        this.projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        this.nameArray = data.population.map(d => d.geo.toUpperCase());
        this.populationData = data.population;

    }

    /**
     * Renders the map
     * @param world the topojson data with the shape of all countries and a string for the activeYear
     */
    drawMap(world) {
        //note that projection is global!
        
        // ******* TODO: PART I *******
        //world is a topojson file. you will have to convert this to geojson (hint: you should have learned this in class!)
        let geoJson = topojson.feature(world,world.objects.countries);
        //console.log(geoJson.features);
        let countryData = geoJson.features.map(country =>{
           // console.log(country.id);
            let index   = this.nameArray.indexOf(country.id);
            //console.log(index);
            let region = "countries"
            if(index > -1){
              //  console.log(country.id);
                region = this.populationData[index].region;
            }else{
                //console.log("not found")
            }
            return new CountryData(country.type,country.id,country.properties,country.geometry,region);
        })
        //console.log(countryData);
        // Draw the background (country outlines; hint: use #map-chart)
        // Make sure to add a graticule (gridlines) and an outline to the map
        let path = d3.geoPath().projection(this.projection);
        //let json = await d3.json(geoJson);
        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's id field to set the id
        let map = d3.select("#map-chart").append('svg');
        let that = this
        map.selectAll("path")
            .data(countryData)
            .enter()
            .append('path')
            .classed("countries",true)
            .attr("d",path)
            .attr("class",function(d){
                return d.region + ' geo';
            }).on('click', function (d) {
                that.updateHighlightClick(d.id)
            })

/*            .attr("opacity",0.8)
            .on("mouseover",function(){
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity",1)
            })
            .on("mouseout",function(){
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity",0.8)
            });
*/        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)
        let graticule = d3.geoGraticule(); 
        map.append('path')
            .datum(graticule)
            .attr('class', "graticule")
            .attr('d', path);
        // You need to match the country with the region. This can be done using .map()
        // We have provided a class structure for the data called CountryData that you should assign the paramters to in your mapping

        //TODO - Your code goes here - 
        map.append("path")
            .datum(graticule.outline)
            .attr("class", "stroke")
            .attr("d", path);

        map.insert("path","graticule")
            .datum(topojson.mesh(world,world.objects.countries,function(a,b){return a !==b;}))
            .attr("class","boundary")
            .attr("d",path);
    }

    /**
     * Highlights the selected conutry and region on mouse click
     * @param activeCountry the country ID of the country to be rendered as selected/highlighted
     */
    updateHighlightClick(activeCountry, flag = true) {
        // ******* TODO: PART 3*******
        // Assign selected class to the target country and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        //

        //TODO - Your code goes here - 
        // this.clearHighlight()
        if (flag) {
            window.gapPlot.updateHighlightClick(activeCountry, false)
        }
        let that = this
        d3.select("#map-chart").selectAll('path.geo').each(function (d) {
            if (d.id === activeCountry) {
                d3.select(this).classed('selected-country', true)
            } else {
                d3.select(this).classed('selected-country', false)
            }
        })
    }

    /**
     * Clears all highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //TODO - Your code goes here - 
        d3.select("#map-chart").selectAll('path.geo').classed('selected-country', false)
    }
}