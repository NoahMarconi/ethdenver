import assertRevert from './helpers/assertRevert';

const BigNumber = web3.BigNumber;
const Seed = artifacts.require('Seed.sol');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Seed', accounts => {
    
    let token = null;
    let owner = accounts[0];
    const _firstTokenId = 1;
    const _secondTokenId = 2;

    beforeEach(async function () {
        token = await Seed.new({ from: owner });
        await token.mint(owner, _firstTokenId, { from: owner });
        await token.mint(owner, _secondTokenId, { from: owner });
    });

    describe('totalSupply', function () {
        it('has a total supply equivalent to the inital supply', async function () {
          const totalSupply = await token.totalSupply();
          totalSupply.should.be.bignumber.equal(2);
        });
      });
});