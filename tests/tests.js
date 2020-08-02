// Not tests right now, just visual testing to make sure functionality works

setTimeout(() => {
    let p = buildElement("p", "Generic Test");
    document.body.querySelector(".tests").appendChild(p);

    setTimeout(() => {
        p.id = "test";
    }, 1000);

    setTimeout(() => {
        p.dataset.test = "test-text";
    }, 1100);

    setTimeout(() => {
        p.id = "";
    }, 1500);

    setTimeout(() => {
        p.id = "test-2";
    }, 1750);

    setTimeout(() => {
        p.remove();
        setTimeout(() => sable.stop(), 100);
    }, 2000);
}, 2000);

// utils
const buildElement = (type, text, attributes) => {
    let element = document.createElement(type);
    element.innerText = text || "";
    if (attributes) {
        Object.keys(attributes).forEach(item => {
            if (item.includes("data_")) {
                element.setAttribute(
                    item.replace(new RegExp("_", "g"), "-"),
                    attributes[item]
                );
            } else {
                element[item] = attributes[item];
            }
        });
    }
    return element;
};
