# NetworkSlideshow
An app allowing for edges in a Cytoscape.js network to appear, disappear, and change with different frames.

1. Make sure you have a file called graph.csv in this folder with the information needed to define your graph. The first row is just the column titles. The columns in order from left to right are: 
  Source: The name of the source node 
	Target: The name of the target node
	Appearframe: The frame you want the connection to appear (leave blank or set to zero to always appear)
	Disappearframe: The frame you want the connection to disappear (leave blank to never disappear)
  Arrowheadframe: The frame you want the arrow for the connection to appear (set to zero to always appear, leave blank or set to NA to never appear)
	Boldframe: The frame you want the connection to become bolded (set to zero to always be bolded, leave blank or set to NA to never become bolded)

2. Run jsonupdate.py to update the data.json file that is used to create the cytoscapejs network.

3. Click index.html to open your graph. Click the arrows or use your arrow keys to navigate back and forth between frames.
