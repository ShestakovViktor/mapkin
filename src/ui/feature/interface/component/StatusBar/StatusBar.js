import styles from "./Menu.module.scss";
import i18next from "i18next";


import en from "./string/en.json";

i18next.addResourceBundle("en", "menu", {StartScreen: en}, true, true);


export function StartScreen() {
    const startScreen = document.createElement("div");
    startScreen.classList.add(styles.StartScreen);
    startScreen.innerHTML = "Hello menu";


    const newProjectButton = document.createElement("button");
    newProjectButton.classList.add(styles.NewProjectButton);
    newProjectButton.innerText = "";
    startScreen.appendChild(newProjectButton);


    return startScreen;
}