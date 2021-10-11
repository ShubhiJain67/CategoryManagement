import React, {useRef, useState, useEffect} from 'react'
import {select, hierarchy, tree} from 'd3'
import useResizeObserver from "./useResizeObserver";

const TreeChart = () => {
    let data = {
        name : "1",
        children : [
            {
                name : "1.1",
                children : [
                    {
                        name : "1.1.1"
                    },
                    {
                        name : "1.1.2"
                    }
                ]
            },
            {
                name : "1.2"
            },
            {
                name : "1.3",
                children : [
                    {
                        name : "1.3.1"
                    }
                ]
            }
        ]
    }
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    console.log(dimensions)
    useEffect(() => {
        const svg = select(svgRef.current)
        console.log(svg)

        const root = hierarchy(data);
        console.log(root)

        const treeLayout = tree()
        // .size([dimensions.width, dimensions.height])
        treeLayout(root)

        // Immediate Children (list of target and source) used to render lines btw the nodes
        console.log(root.children)
        console.log(root.links())
        //Gets all the elemets which are a child at any level
        console.log(root.descendants())
    
        // Nodes
        svg.selectAll(".node")
        .data(root.descendants())
        .join("circle")
        .attr("class", "node")
        .attr("r", 10)
        .attr("fill", "black")
        .attr("cx", node => node.x + 100)
        .attr("cy", node => node.y + 100)

        console.log(svg)
        
    }, [data, dimensions])

    return (
        <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}></svg>            
        </div>
    )
}

export default TreeChart
