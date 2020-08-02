let sable = new Sable();

sable.start(document.body.querySelector(".tests"), {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true,
});

window.addEventListener("sable-change", data => {
    data = data.detail;

    let change = `${data.index + 1}: `;
    if (data.change == "changed-attribute") {
        change += `Changed attribute: [${data.attribute}=${
            data.old || '""'
        }] to [${data.attribute}=${data.new || '""'}]`;
    } else if (data.change == "added-node") {
        change += `Added node ${data.children}`;
    } else {
        change += `Removed node ${data.children}`;
    }

    let row = buildElement("tr", "", {
        className: `sable-interface ${data.change}`,
    });

    let changeType = buildElement("td", `${change}`);
    row.appendChild(changeType);

    let target = buildElement(
        "td",
        `${data.target.tagName.toLocaleLowerCase()}.${data.uniqueId}`
    );
    row.appendChild(target);

    let revert = buildElement("input", "", {
        type: "button",
        value: "Revert",
        data_revert_id: data.index,
    });

    revert.addEventListener("click", () => {
        let snapshot = sable.revert(revert.dataset.revertId);

        let record = sable.events[revert.dataset.revertId];
        let snapshotContainer = document.querySelector(`.sable-data`);
        if (record.change == "removed-node") {
            if (snapshotContainer) {
                document
                    .querySelector(
                        `${record.children.split(".")[0]}[data-sable-id="${
                            record.children.split(".")[1]
                        }"]`
                    )
                    .remove();
            }
            return;
        }
        if (!snapshotContainer) {
            snapshotContainer = buildElement("div", "", {
                className: "sable-data",
            });
            document.body.appendChild(snapshotContainer);
        } else {
            Object.values(snapshotContainer.children).forEach(child =>
                child.remove()
            );
        }

        snapshot.forEach(item => {
            snapshotContainer.appendChild(item);
        });
    });

    row.appendChild(revert);

    document.body
        .querySelector(".stream tbody")
        .insertBefore(row, document.body.querySelector(".stream tbody tr"));
});
