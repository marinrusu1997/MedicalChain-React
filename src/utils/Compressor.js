import * as LZString from "lz-string";

export class Compressor {
   static compressLZW = uncompressed => LZString.compress(uncompressed)

   static decompressLZW = compressed => LZString.decompress(compressed)

   static compressLZWURIEncoded = uncompressed => LZString.compressToEncodedURIComponent(uncompressed)

   static decompressLZWURIEncoded = compressed => LZString.decompressFromEncodedURIComponent(compressed)
}