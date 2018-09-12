---
layout: page
title: '#BlackLivesMatter-Baldwin'
subtitle:
---



<script src="https://public.tableau.com/javascripts/api/tableau-2.2.2.min.js"></script>
<script>
        function initViz() {
            var containerDiv = document.getElementById("vizContainer"),
                url = "https://public.tableau.com/views/BlackLivesMatter-Baldwin-Top-Tweets/TypeofTweet",
                options = {
                    hideTabs: true,
                    onFirstInteractive: function () {
                          console.log('loaded!');
                          workbook = viz.getWorkbook();
                          activeSheet = workbook.getActiveSheet();
                    }
                };

            // Create a viz object and embed it in the container div.
            var viz = new tableau.Viz(containerDiv, url, options);
        }

</script>

<body onload="initViz();">
  <div id="vizContainer"></div>
</body>
