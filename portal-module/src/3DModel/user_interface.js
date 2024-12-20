import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export default class UserInteraction {
    constructor(scene, renderer, lights, fog, object, animations) {

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

        // Create the lights folder
        const lightsFolder = this.gui.addFolder("Lights");

        // Ambient light configuration
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        const ambientLight = lights.object.ambientLight;
        const ambientColor = { color: "#" + new THREE.Color(ambientLight.color).getHexString() };
        ambientLightFolder.addColor(ambientColor, "color").onChange(color => colorCallback(ambientLight, color));
        ambientLightFolder.add(lights.object.ambientLight, "intensity", 0.0, 1.0, 0.01);

        // Create a calendar folder
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

        // Append the container to the GUI
        calendarFolder.add({ update: () => {} }, 'update').name("Update Model State"); // Placeholder to anchor the folder
        calendarFolder.domElement.appendChild(calendarContainer);

        this.selectedDate = "";
        this.selectedTime = "";

        dateInput.addEventListener("change", (event) => {
            this.selectedDate = event.target.value;
        });

        timeInput.addEventListener("change", (event) => {
            this.selectedTime = event.target.value;
        });


        // Other GUI configurations (shadows, fog, character, etc.)
        // Create the shadows folder
        const shadowsFolder = this.gui.addFolder("Shadows");
        shadowsFolder.add(renderer.shadowMap, "enabled").onChange(enabled => shadowsCallback(enabled));

        // Create the fog folder
        const fogFolder = this.gui.addFolder("Fog");
        const fogColor = { color: "#" + new THREE.Color(fog.color).getHexString() };
        fogFolder.add(fog, "enabled").listen();
        fogFolder.addColor(fogColor, "color").onChange(color => colorCallback(fog.object, color));
        fogFolder.add(fog.object, "near", 0.01, 1.0, 0.01);
        fogFolder.add(fog.object, "far", 1.01, 20.0, 0.01);

        // Character and animation folders (as in original code)
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
