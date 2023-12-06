import i18next from "i18next";

i18next
    .use({
        type: "postProcessor",
        name: "capitalize",
        /**
         * @param {string} value
         * @returns string
         */
        process (value) {
            return value.length
                ? value.charAt(0).toUpperCase() + value.slice(1)
                : value;
        },
    })
    .init({lng: "en", resources: {}, debug: true})
    .catch(err => console.log(err));