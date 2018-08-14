---
layout: page
title:
subtitle:
bigimg:
  - "/img/big-imgs/Baldwin-Title-YouTube.png"
#  - "/img/big-imgs/Birmingham.png"
#  - "/img/big-imgs/Race.png"
#  - "/img/big-imgs/Negro.png"
---
<style>.intro-header.big-img .page-heading,
.intro-header.big-img .post-heading {
  padding: 100px 0;
  color: #000000;
  text-shadow: 1px 1px 3px #ffffff;
}
h1 {
  text-align: center;
}
</style>


# The Most Watched James Baldwin Videos on YouTube


Below is an interact chart of the most watched YouTube videos that feature James Baldwin. Click on a bar to watch the video.


<style>
  .bar {
    fill: steelblue;
  }

  .bar:hover {
    fill: red;

  }
  tooltip {
    position: absolute;

  }
  p#views,
  p#title
  {
    text-align: center;

  }

  text{

  }

  #player{
    display: block;
    margin: 0 auto;
  }


</style>

<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<div id="player" ></div>

<script>
  // 2. This code loads the IFrame Player API code asynchronously.
  const tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";

  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
let player = null

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '300',
      width: '500',
      videoId: 'oFeoS41xe7w',
      playerVars: {
        start: 25
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // player;

/*  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: d.videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
*/

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    //event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  //var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      //setTimeout(stopVideo, 6000);
    //  done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
</script>

<p id='title' style="margin-bottom: -10;"></p>
<p id='views' style="margin-bottom: -10;"></p>

<svg width="700" height="240"></svg>
<div id='tooltip'></div>

<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="//d3js.org/d3.v5.min.js"></script>

<script>

const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("hey");


  const svg = d3.select("svg"),
    margin = {
      top: 0,
      right: 50,
      bottom: 50,
      left: 50
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;


  const formatMil = d3.format(".2s");

  const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .rangeRound([height, 0]);

  d3.csv("/baldwin_youtube_videos.csv").then(function(data) {
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
    g.append("g")
      .attr("class", "axis y")
      .call(d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(formatMil));


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
      .on('mouseover', function (d) {
        //fake tooltip that's just text
        d3.select("div#tooltip")
        .style("left", d3.event.pageX  + "px")
        .style("top", d3.event.pageY + "px")
        .style("font", "15px")
        .text(`\u25B2 \n ${d.Title} ${formatMil(d.viewCount)} views`)
        .transition()
        //trying to add a real tooltip but not working
        d3.select("tooltip")
        .style("visibility", "visible")
        .style("left", d3.event.pageX  + "px")
        //.style("left", (d3.event.pageX ) + "px")
        .style("top", d3.event.pageY + "px")
        .text(function() {
          return "\u25B2" + "<br/>" + d.Title + "\n" + formatMil(d.viewCount) + " views";
        })
        //d3.select("p#practice")
        //.text("hey")
        //console.log("hey")
    })
      .on('mouseout', function(d){
        d3.select("tooltip")
        .style("visibility", "hidden")
      });

    g.selectAll(".bar")
      .on("click", function(d) {
      d3.select("p#title")
          .text(`${d.Title} ${formatMil(d.viewCount)} views`)
        d3.select("p#views")
        .text(`${formatMil(d.viewCount)} views`)
          player.loadVideoById(d.videoId);
        });
  });
</script>


<p id="practice"></p>
