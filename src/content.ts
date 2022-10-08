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

}

function getContainer(): Element {
    const cardBody = document.getElementsByClassName("card-body")[0];

    if (!cardBody) {
        throw new Error("Could not find card-body");
    }

    const containerFluid = cardBody.getElementsByClassName("container-fluid")[0];

    if (!containerFluid) {
        throw new Error("Could not find container-fluid");
    }

    return containerFluid;
}