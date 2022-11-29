/** Patch for bigint support on prisma */
BigInt.prototype.toJSON = function () {
    return this.toString()
} 