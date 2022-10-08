
function main() {
    console.log("Current NFT:", getNft());

    const nft = getNft();
    const attribute = getAttribute(nft);

    console.log(`Attribute for ${nft}:`, attribute);
}

async function getAttribute(nft: string): Promise<Buffer> {
    throw new Error("Not implemented");
}

function getNft(): string {
    const splitted = window.location.href.split("/")

    return splitted[splitted.length - 1];
}