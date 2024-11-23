import * as THREE from "three";
import Ground from "./ground.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Wall from "./wall.js";
import { monitorRooms } from "../services/SurgeryRoomService.js";


/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        this.onLoad = async function (description) {
            // Store the maze's map and size
            this.map = description.map;
            this.size = description.size;

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.initialPosition);
            this.initialDirection = description.initialDirection;

            // Store the maze's exit location
            this.exitLocation = this.cellToCartesian(description.exitLocation);

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
            this.object.add(this.ground.object);

            // Create a wall
            this.wall = new Wall({ textureUrl: description.wallTextureUrl });

            // Create a door
            this.door = new Wall({ textureUrl: description.doorTextureUrl});
            
            // Load hospital bed model
            const bedLoader = new GLTFLoader();
        


            // Build the maze
            let wallObject, doorObject, bedObject;
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall | Door|
                     * --------------------+------------+-----------|------|
                     *          0          |     No     |     No |    No|
                     *          1          |     No     |    Yes|     No|
                     *          2          |    Yes     |     No|     No|
                     *          3          |    Yes     |    Yes|     No|
                     *         4          |     No     |     No|    Yes|
                     *  5         |     No     |    Yes|    Yes|
                     */
                    if (description.map[j][i] == 2 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 1 || description.map[j][i] == 3 || description.map[j][i] == 4 && i+1 < description.size.width && description.map[j][i+1] != 4) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }

                    if (description.map[j][i] == 4) {
                        doorObject = this.door.object.clone();
                        doorObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(doorObject);
                        
                    }
                    
                    if (description.map[j][i] == 5) {
                        doorObject = this.door.object.clone();
                        doorObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(doorObject);
                        
                    }

                    if (description.map[j][i] == 6) {
                        bedLoader.load('./models/gltf/bed.glb', (gltf) => {
                            bedObject = gltf.scene;
                            bedObject.position.set(
                                i - description.size.width / 2.0 + 0.5,
                                0.5,
                                j - description.size.height / 2.0
                            );
                            bedObject.scale.set(0.8, 0.8, 0.8); // Ajuste de escala, se necessário
                            this.object.add(bedObject);
                        });
                    }
                    
                    if (description.map[j][i] == 7) {
                        bedLoader.load('./models/gltf/bedWithBody.glb', (gltf) => {
                            bedObject = gltf.scene;
                            bedObject.position.set(
                                i - description.size.width / 2.0 + 0.5,
                                0.5,
                                j - description.size.height / 2.0
                            );
                            bedObject.scale.set(0.8, 0.8, 0.8); // Ajuste de escala, se necessário
                            this.object.add(bedObject);
                        });
                    }

                    if (description.map[j][i] == 8) {
                        bedLoader.load('./models/gltf/table.glb', (gltf) => {
                            bedObject = gltf.scene;
                            bedObject.position.set(
                                i - description.size.width / 2.0 + 0.3,
                                0.5,
                                j - description.size.height / 2.0 
                            );
                            bedObject.scale.set(0.5, 0.5, 0.5); // Ajuste de escala, se necessário
                            bedObject.rotation.y = Math.PI / 2; // Rotaciona 90 graus em torno do eixo Y
                            this.object.add(bedObject);
                        });
                    }
                    
                    if (description.map[j][i] == 9) {
                        bedLoader.load('./models/gltf/monitor.glb', (gltf) => {
                            bedObject = gltf.scene;
                            bedObject.position.set(
                                i - description.size.width / 2.0 + 1.1,
                                0.5,
                                j - description.size.height / 2.0 + 0.1 
                            );
                            bedObject.scale.set(0.3, 0.8, 0.5); // Ajuste de escala, se necessário
                            bedObject.rotation.y = - Math.PI /2; // Rotaciona 90 graus em torno do eixo Y
                            this.object.add(bedObject);
                        });
                    }

                }
            }

            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            monitorRooms(this.map);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );
    }

    updateRoomStatusAtPosition(row, col, status) {
        const map = this.map;
    
        // Map status to cell values
        const statusMapping = {
            Occupied: 7,  // Status "Occupied"
            Available: 6, // Status "Available"
        };
    
        // Validate position and update map
        if (row >= 0 && row < this.size.height && col >= 0 && col < this.size.width) {
            const currentCell = map[row][col];
    
            if (currentCell === 6 || currentCell === 7) {
                console.log(
                    `Updating position [${row}, ${col}] from ${currentCell} to ${statusMapping[status]}`
                );
                map[row][col] = statusMapping[status];
            } else {
                console.warn(
                    `Position [${row}, ${col}] not updated. Current cell value: ${currentCell}`
                );
            }
        } else {
            console.error(`Invalid position [${row}, ${col}] - Out of bounds.`);
        }
    }
    


    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };
}