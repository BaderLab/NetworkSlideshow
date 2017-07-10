var frame = document.getElementById('frame');
var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: data,
  layout: { name: 'cose' },
  style: [
      {
        selector: 'node',
        style: {
          shape: 'hexagon',
          'background-color': 'red',
          label: 'data(id)'
        }
      },
       {
        selector: 'edge',
        style: {
          'label' : 'data(appear)',
          'width': 2,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'source-arrow-color': '#ccc',
          'target-arrow-shape': 'none',
          'curve-style': 'bezier'
        }
      }
  ]
})



var frameNav = (function(){
  var currFrame = 0;
  var numFrames = 0;
  cy.edges().forEach(function( ele ){
    var max = Math.max(ele.data('appearframe') || 0, ele.data('disappearframe') || 0, ele.data('arrowheadframe') || 0, ele.data('boldframe') || 0);
    if (max > numFrames){
      numFrames =  max
    }
  })
  cy.style()
  .selector('edge[appearframe > 1]')
    .style({
      'visibility': 'hidden'
    })
  .update();

  frame.textContent = "Frame: " + currFrame + "/" + numFrames;

  return {
    nextFrame: function(){
      if (currFrame < numFrames){
        currFrame += 1;
        frame.textContent = "Frame: " + currFrame + "/" + numFrames;

        //Add edges
        cy.style()
        .selector('edge[appearframe <= ' + currFrame + ']')
          .style({
            'visibility': 'visible'
          })
        .update();

        //Remove edges
        cy.style()
        .selector('edge[disappearframe <= ' + currFrame + ']')
          .style({
            'visibility': 'hidden'
          })
        .update();

        //Style edges
        cy.style()
        .selector('edge[arrowheadframe <= ' + currFrame + ']')
          .style({
            'target-arrow-shape': 'triangle',
            'source-arrow-shape': 'none'
          })
        .update();

        cy.style()
        .selector('edge[boldframe <= ' + currFrame + ']')
          .style({
            'line-color': '#000',
            'target-arrow-color': '#000',
          })
        .update();
      }
    },
    prevFrame: function(){
      if (currFrame != 1){
        
        //Reverse removing edges
        cy.style()
        .selector('edge[disappearframe >= ' + currFrame + ']')
          .style({
            'visibility': 'visible'
          })
        .update();

        //Reverse adding edges
        cy.style()
        .selector('edge[appearframe >= ' + currFrame + ']')
          .style({
            'visibility': 'hidden'
          })
        .update();

        //Style Edges
        cy.style()
        .selector('edge[arrowheadframe >= ' + currFrame + ']')
          .style({
            'target-arrow-shape': 'none',
            'source-arrow-shape': 'none'
          })
        .update();

        cy.style()
        .selector('edge[boldframe >= ' + currFrame + ']')
          .style({
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
          })
        .update();

        currFrame -= 1;
      }
      frame.textContent = "Frame: " + currFrame + "/" + numFrames;

      

    }
  }
})();

frameNav.nextFrame();

window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;

  if (code === 39) { 
    frameNav.nextFrame();
  } else if (code === 37){
    frameNav.prevFrame();
  } 
}

