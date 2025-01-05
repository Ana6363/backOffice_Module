import * as THREE from "three";
import Ground from "./ground.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Wall from "./wall.js";
import Camera from "./camera.js";
import Orientation from "./orientation.js";
import * as TWEEN from "three/addons/libs/tween.module.js";



/*
 * parameters = {
 *  url: String,
 *  credits: String,   
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters, camera) {


        this.onLoad = async function (description) {

           
            
            this.bedArray = [];
            let roomArray = ["R001", "R004", "R002", "R005", "R003", "R006"];
            this.roomArray = roomArray;



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
            
            this.setObjectPicking(camera);

           
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
                            this.bedArray.push(bedObject);
                            console.log("Cama adicionada ao array:", this.bedArray);
                            
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
                            this.bedArray.push(bedObject);

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
            this.loaded = true;
            console.log("Estado final do array de camas:", this.bedArray);


            this.createOverlay();

            // Atrasando a associação de camas após o carregamento do mapa
            setTimeout(() => {
                const associations = this.associateBedsWithRooms();
            }, 1000);

            // Adicionando um listener para a tecla 'i'
            window.addEventListener("keydown", (event) => {
                if (event.key === "i") {
                    this.toggleOverlay();
                }
            });
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

    setObjectPicking(camera) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    
        window.addEventListener("click", (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            this.raycaster.setFromCamera(this.mouse, camera.object);
    
            const intersects = this.raycaster.intersectObjects(this.bedArray, true);
    
            console.log("Intersects:", intersects);
    
            if (intersects.length > 0) {
                const selectedObject = intersects[0].object;
                console.log("Objeto selecionado:", selectedObject);
    
                // Encontrar o índice no array bedArray
                const index = this.bedArray.findIndex(bed => {
                    let found = false;
                    bed.traverse(child => {
                        if (child === selectedObject) {
                            found = true;
                        }
                    });
                    return found;
                });
    
                if (index !== -1) {
                    console.log(`Objeto selecionado está na posição ${index} do array bedArray`);
    
                    // Obter o valor correspondente no roomArray
                    const associatedRoom = this.roomArray[index];
                    console.log(`O quarto associado é: ${associatedRoom}`);
                    this.fetchRoomStatus(associatedRoom);
                } else {
                    console.warn("Objeto selecionado não foi encontrado no array bedArray");
                }
    
                this.moveToRoomCenter(selectedObject, camera);
            }
        });
    }
    

    
    

    moveToRoomCenter(selectedObject, camera) {
        if (!selectedObject) {
            console.warn("No object selected.");
            return;
        }
    
        // Determine the room center
        const roomCenter = this.getRoomCenter(selectedObject);
    
        if (!roomCenter) {
            console.warn("Room center could not be determined for the selected object.");
            return;
        }
    
        // Log the room center
        console.log("Moving camera to room center at:", roomCenter);
    
        // Coordinates for the target camera position (same height as the camera, but at the center of the room)
        const coordinates = new THREE.Vector3(roomCenter.x, camera.position.y, roomCenter.z);
    
        // Create a smooth transition to the new position
        const fromPosition = camera.position.clone(); // Current camera position
        const toPosition = coordinates.clone(); // Target camera position
    
        // Create a smooth transition for the camera's position
        new TWEEN.Tween(fromPosition)
            .to({
                x: toPosition.x,
                y: toPosition.y,
                z: toPosition.z
            }, 1500) // Animation duration (1.5 seconds)
            .easing(TWEEN.Easing.Quadratic.Out) // Easing function for smooth transition
            .onUpdate(() => {
                camera.position.set(fromPosition.x, fromPosition.y, fromPosition.z);
            })
            .start();
    
        // Animate the camera's target to look at the new room center
        const fromTarget = camera.target.clone(); // Current target position (camera's "lookAt" position)
        const toTarget = roomCenter.clone(); // Target position
    
        new TWEEN.Tween(fromTarget)
            .to({
                x: toTarget.x,
                y: toTarget.y,
                z: toTarget.z
            }, 1500) // Animation duration (same as position transition)
            .easing(TWEEN.Easing.Quadratic.Out) // Smooth easing for the target transition
            .onUpdate(() => {
                camera.setTarget(fromTarget); // Update the camera's target during the animation
            })
            .start();
    }
    
    setTarget(target) {
        this.target.copy(target);
        this.setViewingParameters();
    }
    setViewingParameters() {
            const orientation = new Orientation(this.orientation.h + this.playerDirection, this.orientation.v);
            const cosH = Math.cos(THREE.MathUtils.degToRad(orientation.h));
            const sinH = Math.sin(THREE.MathUtils.degToRad(orientation.h));
            const cosV = Math.cos(THREE.MathUtils.degToRad(orientation.v));
            const sinV = Math.sin(THREE.MathUtils.degToRad(orientation.v));
            // Position
            let positionX = this.target.x;
            let positionY = this.target.y;
            let positionZ = this.target.z;
            if (this.view != "first-person") {
                positionX -= this.distance * sinH * cosV;
                positionY -= this.distance * sinV;
                positionZ -= this.distance * cosH * cosV;
            }
            this.perspective.position.set(positionX, positionY, positionZ);
            this.orthographic.position.set(positionX, positionY, positionZ);
            // Up vector
            const upX = -sinH * sinV;
            const upY = cosV;
            const upZ = -cosH * sinV;
            this.perspective.up.set(upX, upY, upZ);
            this.orthographic.up.set(upX, upY, upZ);
            // Target
            const target = this.target.clone();
            if (this.view == "first-person") {
                target.x += sinH * cosV;
                target.y += sinV;
                target.z += cosH * cosV;
            }
            this.perspective.lookAt(target);
            this.orthographic.lookAt(target);
        }

    
    
    getRoomCenter(tableObject) {
        // Check if the table object has userData with room center information
        if (tableObject.userData && tableObject.userData.roomCenter) {
            return new THREE.Vector3(
                tableObject.userData.roomCenter.x,
                tableObject.userData.roomCenter.y,
                tableObject.userData.roomCenter.z
            );
        }
    
        // Fallback: Calculate the room center using bounding box
        const boundingBox = new THREE.Box3().setFromObject(tableObject);
    
        if (boundingBox.isEmpty()) {
            console.warn("Unable to calculate bounding box for the object:", tableObject);
            return null;
        }
    
        // Get the center of the bounding box
        const roomCenter = new THREE.Vector3();
        boundingBox.getCenter(roomCenter);
    
        console.log("Calculated Room Center from Bounding Box:", roomCenter);
    
        return roomCenter;
    }

    associateBedsWithRooms() {
        if (this.bedArray.length !== this.roomArray.length) {
            console.error("bedArray e roomArray têm tamanhos diferentes. Não é possível associar.");
            return null;
        }
    
        const associations = this.bedArray.map((bed, index) => {
            return {
                bed: bed,
                room: this.roomArray[index]
            };
        });
    
        console.log("Associações criadas:", associations);
        return associations;
    }
    
    fetchRoomStatus = async (roomNumber) => {
        // Ajuste a URL para corresponder ao que a API espera
        const url = `https://api-dotnet.hospitalz.site/api/v1/surgeryRoom/getByRoomId?roomNumber=${roomNumber}`; // Passando roomNumber corretamente na query string
        
        try {
            const response = await fetch(url, {
                method: 'GET', // Requisição GET
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            if (data != null) {
                console.log("Status do quarto:", data);
                this.updateOverlayContent(roomNumber, data);
                return data;
            }
    
            return null;  // Ou um valor adequado dependendo do retorno da API
        } catch (error) {
            console.error("Erro ao buscar o status do quarto:", error);
        }
    };

    toggleOverlay() {
        const overlay = document.getElementById("room-overlay");
    
        // Se o overlay estiver oculto, mostramos
        if (overlay.style.display === "none" || overlay.style.display === "") {
            overlay.style.display = "flex";  // Usando flex para centralizar o conteúdo
            console.log("Toggling overlay... Exibindo");
        } else {
            overlay.style.display = "none";  // Torna o overlay invisível
            console.log("Toggling overlay... Ocultando");
        }
    }
    
    

    // Atualizando o conteúdo do overlay
    updateOverlayContent(roomName, data) {
        const overlayContent = document.getElementById("room-overlay-content");
        overlayContent.innerHTML = `
            <h2>Room: ${roomName}</h2>
            <p>Type: ${data.type}</p>
            <p>Status: ${data.currentStatus}</p>
            <p>Capacity: ${data.capacity}</p>
        `;
    }

    // Criando a sobreposição diretamente no HTML
    createOverlay() {
        const overlay = document.createElement("div");
        overlay.id = "room-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.display = "none"; // Começa oculto
        overlay.style.zIndex = "9999";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.textAlign = "center";
        overlay.style.display = "none"; // Default é invisível
    
        const overlayContent = document.createElement("div");
        overlayContent.id = "room-overlay-content";
        overlayContent.style.backgroundColor = "#fff";
        overlayContent.style.padding = "20px";
        overlayContent.style.borderRadius = "8px";
        overlayContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        overlayContent.innerHTML = "<h2>...</h2>";  // Placeholder
    
        overlay.appendChild(overlayContent);
        document.body.appendChild(overlay);
    }
    

    
    
}