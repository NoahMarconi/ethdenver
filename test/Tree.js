import assertRevert from './helpers/assertRevert';

const BigNumber = web3.BigNumber;
const Tree = artifacts.require('Tree.sol');


require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Tree', accounts => {
    
    let token = null;
    let lot = null;
    let owner = accounts[0];
    let sourcing = accounts[1];
    let transportation = accounts[2];
    const _firstTokenId = 1;
    const _secondTokenId = 2;
    const _lotId1 = 3;

    beforeEach(async function () {
        token = await Tree.new({ from: owner });
        await token.setRole(sourcing, 1, { from: owner });

        await token.mint(owner, _firstTokenId, { from: sourcing });
        await token.mint(owner, _secondTokenId, { from: sourcing });
    });

    describe('totalSupply', function () {
      it('has a total supply equivalent to the inital supply', async function () {
        const totalSupply = await token.totalSupply();
        totalSupply.should.be.bignumber.equal(2);
      });
    });

    describe('add to lot', function () {
      it('should create a lot add trees to it', async () => {
        await token.batchAddToLot([_firstTokenId, _secondTokenId], _lotId1, { from: sourcing });

        const token1Lot = await token.tokenLot.call(1);
        const token2Lot = await token.tokenLot.call(2);

        token1Lot.should.be.bignumber.equal(_lotId1);
        token2Lot.should.be.bignumber.equal(_lotId1);
      });
    });

    describe('transfer a lot', function () {
      it('should transfer ownership of the lot', async () => {
        await token.batchAddToLot([_firstTokenId, _secondTokenId], _lotId1, { from: sourcing });
        await token.transfer(transportation, _lotId1, { from: sourcing });

        const lotOwner = await token.ownerOf(_lotId1);
        lotOwner.should.be.equal(transportation);
      });
    });

    describe('remove from a lot', function () {
      it('should remove tokens from thier current lot', async () => {
        await token.batchAddToLot([_firstTokenId, _secondTokenId], _lotId1, { from: sourcing });
        await token.transfer(transportation, _lotId1, { from: sourcing});

        await token.batchRemoveFromLot([_firstTokenId, _secondTokenId], _lotId1, { from: transportation });

        const token1Lot = await token.tokenLot.call(1);
        const token2Lot = await token.tokenLot.call(2);

        token1Lot.should.be.bignumber.equal(0);
        token2Lot.should.be.bignumber.equal(0);
      });
    });
});