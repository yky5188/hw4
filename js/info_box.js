/** Data structure for the data associated with an individual country. */
class InfoBoxData {
    /**
     *
     * @param country name of the active country
     * @param region region of the active country
     * @param indicator_name the label name from the data category
     * @param value the number value from the active year
     */
    constructor(country, region, indicator_name, value) {
        this.country = country;
        this.region = region;
        this.indicator_name = indicator_name;
        this.value = value;
    }
}

/** Class representing the highlighting and selection interactivity. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {
        this.data = data
        this.div = d3.select('#country-detail')
        this.div.selectAll('*').remove()
        this.div.append('div').attr('class', 'country-name')
    }

    /**
     * Renders the country description
     * @param activeCountry the IDs for the active country
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeCountry, activeYear) {
        // ******* TODO: PART 4 *******
        // Update the text elements in the infoBox to reflect:
        // Selected country, region, population and stats associated with the country.
        /*
         * You will need to get an array of the values for each category in your data object
         * hint: you can do this by using Object.values(this.data)
         * you will then need to filter just the activeCountry data from each array
         * you will then pass the data as paramters to make an InfoBoxData object for each category
         *
         */

        //TODO - Your code goes here - 
        console.log(activeCountry, activeYear)
        let map = {}
        let name = ''
        Object.keys(this.data).forEach((k) => {
            let data = this.data[k]
            data.forEach((_d) => {
                if (_d.geo.toUpperCase() === activeCountry) {
                    // console.log(_d)
                    map[k] = _d[activeYear + '']
                    name = _d['country']
                }
            })
        })
        let items = []
        Object.keys(map).forEach((f) => {
            items.push({
                name: f,
                value: map[f]
            })
        })
        this.div.append('div').attr('class', 'country-name')
        this.div.select('.country-name').text(name)
        this.div.selectAll('.fields').remove()
        this.div.selectAll('.fields').data(items)
            .enter()
            .append('div')
            .attr('class', 'fields')
            .text((d) => {
                return d.name + ' : ' + d.value
            })
        console.log(map)
    }

    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {

        //TODO - Your code goes here - 
        this.div.selectAll('*').remove()
    }

}