import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export default class UserInteraction {
    constructor(scene, renderer, lights, fog, animations) {
        this.onUpdateMaze = null;

        function colorCallback(object, color) {
            object.color.set(color);
        }

        function shadowsCallback(enabled) {
            scene.traverseVisible(function (child) {
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            });
        }

        function createEmoteCallback(animations, name) {
            callbacks[name] = function () {
                animations.fadeToAction(name, 0.2);
            };
            emotesFolder.add(callbacks, name);
        }

        // Create the graphical user interface
        this.gui = new GUI({ hideable: false });

        // Lights configuration
        const lightsFolder = this.gui.addFolder("Lights");

        // Ambient light configuration
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        const ambientLight = lights.object.ambientLight;
        const ambientColor = { color: "#" + new THREE.Color(ambientLight.color).getHexString() };
        ambientLightFolder.addColor(ambientColor, "color").onChange(color => colorCallback(ambientLight, color));
        ambientLightFolder.add(lights.object.ambientLight, "intensity", 0.0, 1.0, 0.01);

        // Shadows configuration
        const shadowsFolder = this.gui.addFolder("Shadows");
        shadowsFolder.add(renderer.shadowMap, "enabled").onChange(enabled => shadowsCallback(enabled));

        // Fog configuration
        const fogFolder = this.gui.addFolder("Fog");
        const fogColor = { color: "#" + new THREE.Color(fog.color).getHexString() };
        fogFolder.add(fog, "enabled").listen();
        fogFolder.addColor(fogColor, "color").onChange(color => colorCallback(fog.object, color));
        fogFolder.add(fog.object, "near", 0.01, 1.0, 0.01);
        fogFolder.add(fog.object, "far", 1.01, 20.0, 0.01);

        // Calendar configuration
        const calendarFolder = this.gui.addFolder("Calendar");

        // HTML container for calendar
        const calendarContainer = document.createElement("div");
        calendarContainer.style.marginTop = "10px";
        calendarContainer.style.padding = "10px";
        calendarContainer.style.backgroundColor = "#fff";

        // Create input fields for date and time
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.placeholder = "Select Date";
        calendarContainer.appendChild(dateInput);

        const timeInput = document.createElement("input");
        timeInput.type = "time";
        timeInput.placeholder = "Select Time";
        calendarContainer.appendChild(timeInput);

        calendarFolder.add({ update: async () => {
            const { date, time } = this.getDateTime();
            if (date && time) {
                try {
                    // Construct the full datetime string
                    const datetime = `${date}T${time}`;

                    // Call the new endpoint with the datetime as a query parameter
                    const response = await fetch(`https://api-dotnet.hospitalz.site/api/v1/surgeryRoom/getRoomStatusesByDateTime?dateTime=${encodeURIComponent(datetime)}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    // Check if the response is successful
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    // Parse the response
                    const result = await response.json();

                    console.log("Endpoint Response:", result);

                    if (this.onUpdateMaze) {
                        const roomStatuses = result.roomStatuses;
                        if (roomStatuses) {
                            this.onUpdateMaze(roomStatuses);
                        } else {
                            console.warn("roomStatuses property is missing in the response.");
                        }
                    } else {
                        console.warn("onUpdateMaze callback is not set.");
                    }
                } catch (error) {
                    console.error("Error calling endpoint:", error);
                }
            } else {
                alert("Please select both date and time before updating the model state.");
            }
        } }, 'update').name("Update Model State");

        calendarFolder.domElement.appendChild(calendarContainer);

        this.selectedDate = "";
        this.selectedTime = "";

        dateInput.addEventListener("change", (event) => {
            this.selectedDate = event.target.value;
        });

        timeInput.addEventListener("change", (event) => {
            this.selectedTime = event.target.value;
        });

        // Animations configuration
        const emotesFolder = this.gui.addFolder("Animations");
        const callbacks = {};
        if (animations && animations.availableActions) {
            animations.availableActions.forEach(name => createEmoteCallback(animations, name));
        } else {
            console.warn("animations.availableActions is undefined or empty.");
        }
    }

    setUpdateMazeCallback(callback) {
        this.onUpdateMaze = callback;
    }

    setVisibility(visible) {
        if (visible) {
            this.gui.show();
        } else {
            this.gui.hide();
        }
    }

    getDateTime() {
        return { date: this.selectedDate, time: this.selectedTime };
    }
}
