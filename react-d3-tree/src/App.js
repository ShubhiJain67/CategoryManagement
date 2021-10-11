import './App.css';
import react, {useRef, useEffect, useState} from 'react'
import {select} from 'd3'
import React from 'react';


function App() {
  const [data, setData] = useState([25, 30, 32, 54, 34, 78])
  // const [data, setData] = useState([25, 78])

  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle') //selects all circle tags
      .data(data) // Syncronizes wthe data elements with the tags being selected
      .join(
        enter => enter
                  .append("circle")
                  .attr('class', 'new-circle')
                  .attr('stroke', 'red'),
        update => update
                  .attr('class', 'updated-circle'),
        exit => exit.remove() // d3 default
      ).attr('r', value => value)
      .attr('cx', value => value * 2)
      .attr('cy', value => value * 2); // attriutes appended here will work on all enter update and exit
    console.log(svg)
  }, [data])
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br/>
      <button onClick={() => setData(data.map(value => value < 20 ? value + 5 : value))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter(value => value < 100))}>
        Filter Data
      </button>
    </React.Fragment>
  );
}

export default App;
