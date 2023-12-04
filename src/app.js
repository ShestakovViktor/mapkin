import "@src/i18n";
import {initCore} from "@core";
import {initUI} from "@ui";

/**
 * @typedef {Object} Context
 * @property {number} width
 * @property {number} hasCourage
 */
const context = {
    width: 0,
};


initCore(context);
initUI(context);
