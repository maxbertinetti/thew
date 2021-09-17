import { ethers } from 'hardhat'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Greeter__factory, Greeter } from '../types'

chai.use(chaiAsPromised)
const { expect } = chai

describe('Greeter', () => {
  let greeter: Greeter

  beforeEach(async () => {
    const signers = await ethers.getSigners()

    const greeterFactory = (await ethers.getContractFactory(
      'Greeter',
      signers[0]
    )) as Greeter__factory

    greeter = await greeterFactory.deploy('Hello, world!')
    await greeter.deployed()
  })

  it("Should return the new greeting once it's changed", async function () {
    expect(await greeter.greet()).to.equal('Hello, world!')

    const setGreetingTx = await greeter.setGreeting('Hola, mundo!')

    // wait until the transaction is mined
    await setGreetingTx.wait()

    expect(await greeter.greet()).to.equal('Hola, mundo!')
  })

  it('Should revert when passing an empty string', async () => {
    await expect(greeter.setGreeting('')).to.be.revertedWith(
      'Greeting should not be empty'
    )
  })
})
