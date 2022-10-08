export function addRow(name: string, value: string) {
    const container = getContainer();

    container.innerHTML = container.innerHTML + `
<div class="row detail-item  border-bottom py-3">
    <div class="col-lg-2 text-secondary text-lg-right pl-lg-spacer">
        ${name}
    </div>
    <div class="col-lg-10 pr-lg-spacer text-break">
        ${value}
    </div>
</div>`

}

function getContainer(): Element {
    const container = document.getElementsByClassName("page-content")[0]
        ?.children[0] // row
        ?.children[0] // col-12
        ?.children[0] // card
        ?.getElementsByClassName("card-body")[0]
        ?.children[0];

    if (container == null) {
        throw new Error("Could not find card body");
    }


    return container;
}