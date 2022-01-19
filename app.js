// *******************************************************************************************
// * GLOBAL VARIABLE (default: water map tile)
// *******************************************************************************************
let currentTile = document.querySelector(".selected");


// *******************************************************************************************
// * CRATE NEW MAP & SELECT A MAP TILE AFTER CREATION
// *******************************************************************************************
const createNewMap = () => {
    const activateYourMap = document.querySelector("#your-map")
    if (activateYourMap.classList.contains("hidden") === true) {
        activateYourMap.classList.remove("hidden")
    }
    else {
        // when the existing map, tap button CREATE NEW MAP
        // then, clear the map and show an empty map
        // - erase all map squares occupied
        const mapSquares = document.querySelectorAll(".map-square")
        const numOfMapSquares = mapSquares.length;
        for (let i = 0; i < numOfMapSquares; i++){
            mapSquares[i].innerHTML = ""
        }
    }
    const selectMapTile = (event) => {
        // when click the map tile, change the border color
        // remove .selected and add it
        if(event.target.classList.contains("tile") === true) {
            currentTile.classList.remove("selected")
            event.target.classList.add("selected")
            currentTile = event.target
        }
    }
    // select a map tile after creating a new map
    document.querySelector("#library-container").addEventListener("click", selectMapTile)
    }


    // *******************************************************************************************
    // * ADD A MAP TILE BY CLICKING
    // *******************************************************************************************
    const MouseDownYourMap = (event) => {
        // if map square is empty, fill with the current tile
        // - if the current tile is the remove tile, then do nothing
        // else map square is occupied, replace with the current tile
        // - if the current tile is the remove tile, erase     
        if (event.target.classList.contains("map-square") === true){
            // IF MAP SQUARE IS EMPTY
            if (currentTile.id === "removeTile") {
                // CLICKED: MAP SQUARE EMPTY
            }
            else {
                // CLICKED: MAP SQUARE EMPTY & VALID TILES
                event.target.innerHTML = `
                    <img src="${currentTile.src}" alt="${currentTile.alt}">
                `
            }    
        }
        else {
            // map square is already occupied
            // - if the current tile is the remove tile, remove -- mouse up
            // - otherwise, replace a tile with the current tile
            if (currentTile.id === "removeTile") {
                // no action: event type is mouse down
            }
            else {
                event.target.src = `${currentTile.src}`
                event.target.alt = `${currentTile.alt}`
            }
        }     
    }
    const MouseUpYourMap = (event) => {
        if (event.target.tagName.toLowerCase() === "img" && currentTile.id === "removeTile") {   
            event.target.remove()
        }
    }


    // *******************************************************************************************
    // * ADD A MAP TILE BY DRAGGING 
    // *******************************************************************************************
    // dragStart: occurs when user is dragging the tile 
    const dragStart = (event) => {
        event.target.style.opacity = (0.8)
    }
    // dragOver: WHEN MAP DETECTS MOUSEOVER (drop target event)
    const dragOver = (event) => {
        event.preventDefault()
        if (event.target.classList.contains("map-square") === true) {
            // -OVER THE EMPTY MAP SQUARE
            // -if valid tile is over the map square, replace
            // -if remove tile is over the map square, no action
            if (currentTile.id === "removeTile") {
                // No need to erase because map tile is empty
            }
            else {
                event.target.innerHTML = `<img src="${currentTile.src}" alt="${currentTile.alt}">`
            }
        }            
        else {
            // OVER THE OCCUPIED MAP SQUARE
            if (event.target.src === currentTile.src) {
                // do nothing
            }
            else {
                // -if remove tile, remove it
                // -otherwise, replace
                if (currentTile.id === "removeTile") {    
                    event.target.remove()
                }
                else {
                    // - replace the current tile by dragging over
                    event.target.src = `${currentTile.src}`
                    event.target.alt = `${currentTile.alt}`
                }
            }
        }
    }
    // dragEnd: when user ends dragging (tile event)
    const dragEnd = (event) => {
        event.target.style.opacity = (1)
    }

    
// *******************************************************************************************
// * EVENT HANDLERS
// *******************************************************************************************    
// create a new map
document.querySelector("#btn-new").addEventListener("click", createNewMap)
// fill your map by mouse down
document.querySelector(".map-container").addEventListener("mousedown",MouseDownYourMap) 
// fill your map by mouse up
document.querySelector(".map-container").addEventListener("mouseup",MouseUpYourMap) 
// dragStart is for a draggable target (image map tile) when user starts dragging it
document.querySelector(".map-container").addEventListener("dragstart", dragStart)  
// when draggable image enters the drop target (.map-square)
document.querySelector(".map-container").addEventListener("dragover", dragOver)
// dragEnd is to update opacity of tile when drag is end
document.querySelector(".map-container").addEventListener("dragend", dragEnd)   


