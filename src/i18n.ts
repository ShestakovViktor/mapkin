import i18next from "i18next";

i18next
    .use({
        type: "postProcessor",
        name: "capitalize",
        process (value: string): string {
            return value.length
                ? value.charAt(0).toUpperCase() + value.slice(1)
                : value;
        },
    })
    .init({lng: "en", resources: {}, debug: false})
    .catch(err => console.log(err));