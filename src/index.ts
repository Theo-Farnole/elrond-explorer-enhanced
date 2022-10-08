import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out/apiNetworkProvider";
import { addRow } from "./html-edition";
import { Token } from "./token";

main();

async function main() {
    console.log("Current NFT:", getNftFromUrl());

    const nft = getNftFromUrl();
    const attribute = await getAttribute(nft);

    setAttributeToHtml(attribute);
}

function getNftFromUrl(): Token {
    const splitted = window.location.href.split("/")
    const identifier = splitted[splitted.length - 1];

    return Token.fromIdentifier(identifier);
}

async function getAttribute(token: Token): Promise<Buffer> {
    const provider = new ApiNetworkProvider(getApiUrl());

    const nft = await provider.getNonFungibleToken(token.collection, token.nonce);
    return nft.attributes;
}

function getApiUrl(): string {
    return window.location.origin.replace("explorer.elrond.com", "api.elrond.com");
}

function setAttributeToHtml(attribute: Buffer) {
    addRow("Attribute", attribute.toString());
    addRow("Attribute (hex)", attribute.toString("hex"));
}