import "@src/i18n";
import {initCore} from "@core";
import {initUI} from "@ui";

/**
 * @typedef {Object} Context
 * @property {number} width
 */
const context = {
    width: 0,
};



initCore();
initUI(context);
