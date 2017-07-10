import csv
import json
import os 
import sys

nodes = []
edges = []

with open(os.path.dirname(os.path.realpath(__file__))+'\\'+'graph.csv', 'r') as file:
    reader = csv.reader(file)
    next(reader)
    for row in reader:
        if row[0].strip() not in nodes:
            nodes.append(row[0].strip())
        if row[1].strip() not in nodes:
            nodes.append(row[1].strip())
        edges.append(row)

        
nodes = [{'data': {'id': node}} for node in nodes]
edges = [{'data': {'id': edge[0]+'_'+edge[1], 'source': edge[0], 'target': edge[1], 'appearframe': edge[2], 'disappearframe': edge[3], 'arrowheadframe': edge[4], 'boldframe': edge[5]}} for edge in edges] 
    
for edge in edges:
    if not edge['data']['appearframe'].isdigit():
        del edge['data']['appearframe']
    if not edge['data']['disappearframe'].isdigit():
        del edge['data']['disappearframe']
    if not edge['data']['arrowheadframe'].isdigit():
        del edge['data']['arrowheadframe']
    if not edge['data']['boldframe'].isdigit():
        del edge['data']['boldframe']
        
        
with open(os.path.dirname(os.path.realpath(__file__))+'\\'+'data.json', 'w') as output:
    print(os.path.dirname(os.path.realpath(__file__))+'\\'+'data.json')

    output.write('data = ' + json.dumps(nodes + edges, indent=4, sort_keys = True))
