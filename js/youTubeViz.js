
const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .text("hey");

  // Define the div for the tooltip
  const div = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


/**const svg = d3.select("svg")
  margin = {
    top: 0,
    right: 50,
    bottom: 50,
    left: 50
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;**/

const svg = d3.select("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1500 500")
    .classed("svg-content-responsive", true)
    , MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 100 // change this to something larger like 100
  };

const width = +svg.attr('width')+1500,
    height = +svg.attr('height')+475;

const formatMil = d3.format(".2s");


const g = svg.append("g");
  //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const xScale = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .rangeRound([height, 0]);

d3.csv("/baldwin_youtube_videos_september.csv").then(function(data) {
  xScale.domain(data.map(function(d) {
    return d.Title;
  }));
  yScale.domain([0, d3.max(data, function(d) {
    return Number(d.viewCount);
  })]);

/*
  g.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom()
      .scale(xScale)); */


      // make chart title
            d3.select("p#title")
              .data(data)
              .text(d => `${d.Title} \n ${formatMil(d.viewCount)}`);

      //try to figure out how to add new lines
            d3.select("p#views")
            .data(data)
            .text(d => `${formatMil(d.viewCount)} views`);
//add Y axis
/**  g.append("g")
    .attr("class", "axis y")
    .call(d3.axisLeft(yScale)
    .ticks(5)
    .tickFormat(formatMil)
    .tickPadding(-25)); **/


  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return xScale(d.Title);
    })
    .attr("y", function(d) {
      return yScale(Number(d.viewCount));
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
      return height - yScale(Number(d.viewCount));
    })
    .on('mouseover', d => {
      div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      div
        .html('#' + d.Rank + ' ' + d.Title + '<br/>' + formatMil(d.viewCount) + 'views')
        .style('left', d3.event.pageX - 200 + 'px')
        .style('top', d3.event.pageY - 150  + 'px')
        ;
    });

    const title = g.append("text")
        .attr("x", (width / 2) + 20)
        .attr("y", ((height /2)) - 30)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .text("#1 James Baldwin Debates William F. Buckley (1965)");

    const subtitle = g.append("text")
        .attr("x", (width / 2))
        .attr("y", ((height / 2) + 20))
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .text("1.4M views");

  g.selectAll(".bar")
    .on("click", function(d) {
    d3.select("p#title")
        .text(`${d.Title} ${formatMil(d.viewCount)} views`)
      d3.select("p#views")
      .text(`${formatMil(d.viewCount)} views`)
      title
        .text(`#${d.Rank} ${d.Title}`)
        subtitle
        .text(`${formatMil(d.viewCount)} views`)
        player.loadVideoById(d.videoId);
      });
});
