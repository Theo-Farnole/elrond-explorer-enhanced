import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out/apiNetworkProvider";
import { Token } from "./token";

main();

async function main() {
    console.log("Current NFT:", getNftFromUrl());

    const nft = getNftFromUrl();
    const attribute = await getAttribute(nft);

    setAttributeToHtml(attribute);
}

async function getAttribute(token: Token): Promise<Buffer> {
    const provider = new ApiNetworkProvider(getApiUrl());

    const nft = await provider.getNonFungibleToken(token.collection, token.nonce);
    return nft.attributes;
}

function getNftFromUrl(): Token {
    const splitted = window.location.href.split("/")
    const identifier = splitted[splitted.length - 1];

    return Token.fromIdentifier(identifier);
}

function getApiUrl(): string {
    return window.location.origin.replace("explorer.elrond.com", "api.elrond.com");
}

function setAttributeToHtml(attribute: Buffer) {
    addCard("Attribute", attribute.toString());
    addCard("Attribute (hex)", attribute.toString("hex"));
}

function addCard(name: string, value: string) {
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